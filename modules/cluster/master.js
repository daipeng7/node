/*
 * 集群	架设在child_process模块之上的模块，分别为两部分
 *      cluster 主进程持有，
 *      woker 主进程产生的工作进程，一般数量为内核数量
 * 原理：工作进程是由child_process.fok()创建，因此它们可以使用IPC和父进程通信，从而使各进程交替处理连接服务
 * 集群方式：
 *      1、多个node实例+多个端口（类似nginx一样的反响代理）：
 *          集群内的node实例，各自监听不同的端口，再由反向代理实现请求到多个端口的分发。
 *              优点：实现简单，各实例相对独立，这对服务稳定性有好处，可以跨网络负载均衡良好。
 *              缺点：增加端口占用，进程之间通信比较麻烦。
 *      2、主进程向子进程转发请求：
 *          集群内，创建一个主进程(master)，以及若干个子进程(worker)。由master监听客户端连接请求，并根据特定的策略，转发给worker。
 *              优点：通常只占用一个端口，通信相对简单，转发策略更灵活。
 *              缺点：实现相对复杂，对主进程的稳定性要求较高。
 * 
 * NodeJS的cluster运行过程及原理(3个问题)：
 * 
 * 问题1：master、woker如何通信
 *  因为cluster.fork()内部是通过child_process.fork()创建子进程的。
 *      1、master进程、worker进程是父子进程关系
 *      2、master进程、worker进程可以通过IPC通道通信
 * 
 * 问题2：如何实现端口共享
 *  多个woker中创建的server监听了同个端口3000。通常来说，多个进程监听同个端口，系统会报错。master进程监听特定端口，并将客户请求转发给worker进程。但是nodejs不会的原因：
 *      master进程：在该端口上正常监听请求。（没做特殊处理）
 *      worker进程：创建server实例。然后通过IPC通道，向master进程发送消息，让master进程也创建 server 实例，并在该端口上监听请求。当请求进来时，master进程将请求转发给worker进程的server实例。
 * 
 * 问题3：如何将请求分发到多个worker
 *  每当worker进程创建server实例来监听请求，都会通过IPC通道，在master上进行注册,这里的注册就是在master上启动一个服务器来接管已经绑定端口的工作进程server（可以查看./repeatListen.js）。使用的是net的server.listen(handle[, backlog][, callback])
 *      handle为句柄对象
 *          句柄对象可以是服务器、套接字（任何具有底层 _handle 成员的东西），也可以是具有 fd 成员的对象，该成员是一个有效的文件描述符。
 *  当客户端请求到达，master会负责将请求转发给对应的worker。
 *  具体转发给哪个worker？这是由转发策略决定的。可以通过环境变量NODE_CLUSTER_SCHED_POLICY设置，也可以在cluster.setupMaster(options)时传入。
 *  默认的转发策略是轮询（SCHED_RR）。
 *  当有客户请求到达，master会轮询一遍worker列表，找到第一个空闲的worker，然后将该请求转发给该worker。
 * 
 * master、worker内部通信小技巧
 *      在开发过程中，我们会通过 process.on('message', fn) 来实现进程间通信。
 *      前面提到，master进程、worker进程在server实例的创建过程中，也是通过IPC通道进行通信的。那会不会对我们的开发造成干扰呢？比如，收到一堆其实并不需要关心的消息？
 *      答案肯定是不会？那么是怎么做到的呢？
 *      当发送的消息包含cmd字段，且改字段以NODE_作为前缀，则该消息会被视为内部保留的消息，不会通过message事件抛出，但可以通过监听'internalMessage'捕获。
 *      以worker进程通知master进程创建server实例为例子。worker伪代码如下：
 * 
 *      // woker进程
 *      const message = {
            cmd: 'NODE_CLUSTER',
            act: 'queryServer'
        };
        process.send(message);

        master伪代码如下：
        worker.process.on('internalMessage', internal(worker, onmessage));
 *
 * master、worker的创建都是在一个启动文件来区分，原理：
 *      cluster.for() ===> child_process.for(master) 所以创建多少个worker（也就是执行多少次cluster.fok()）就会执行多少次master所在启动文件。用来区分的关键就是cluster.isMaster
 *      因为cluster.isMaster默认为true，所以第一次为主进程后面的都是worker进程
 *      重点：因为master的listening监听了worker进程的lisent方法的执行，在net模块中对listen的执行会去判断当前进程是否是cluster的master进程，如果是就将worker传进来的server直接拿来创建监听，如果是worker进程就不创建监听，
 *      而是通知master进程（如果已经创建了就加入轮询，如果没有创建监听就创建，并且保留了worker进程的NODE_UNIQUE_ID，当请求来的时候就直接将socket信息交给选中的worker进程的server（没有绑定端口）去处理）的listening事件然后去加入轮询监控
 *      所以关键就是：net模块对listen函数做了场景区分来实现的cluster
 * 
 */
const os = require('os');
const cluster = require('cluster');
const cpuNum = os.cpus().length;

console.log('1====>', cluster.isMaster, '次数');
if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);

    // 衍生工作进程。
    for (let i = 0; i < 2; i++) {
        cluster.fork();
    }

    /**
     * 当任何一个工作进程被关闭时都会触发
     * @param woker {cluster.Woker} 退出的工作进程
     * @param code {number}  正常退出下是退出码
     * @param signal {string}  导致进程被kill的信号名称 (例如 'SIGHUP')
    */
    cluster.on('exit', (worker, code, signal) => {
        console.log(`工作进程 ${worker.process.pid} 已退出, 退出码：${code}, 退出信号名称：${signal},主进程事件：exit`);
    });

    /**
     * 在工作进程的IPC管道被断开后触发本事件。可能导致事件触发的原因包括：工作进程优雅地退出、被kill或手动断开连接（如调用worker.disconnect()）
     * 'disconnect' 和 'exit'事件之间可能存在延迟。这些事件可以用来检测进程是否在清理过程中被卡住，或是否存在长时间运行的连接
     * @param woker {cluster.Woker} 断开连接的工作进程
    */
    cluster.on('disconnect', (worker) => {
        console.log(`工作进程 ${worker.id} 已经断开与主进程的连接,主进程事件：disconnect`);
    });

    /**
     * 每当 .setupMaster() 被调用的时候触发,settings 对象是 setupMaster() 被调用时的 cluster.settings 对象，并且只能查询，因为在一个 tick 内 .setupMaster() 可以被调用多次。如果精确度十分重要，请使用 cluster.settings。
     * @param settings {Object} 退出的工作进程
    */
    cluster.on('setup', (settings) => {
        console.log(`工作进程 ${process.pid} 开始设置settings,主进程事件：setup`);
    });

    /**
     * 当新的工作进程被fork时，cluster模块将触发'fork'事件。 可以被用来记录工作进程活动，产生一个自定义的timeout
     * @param woker {cluster.Woker} 创建的工作进程
    */
    cluster.on('fork', (woker) => {
        console.log(`工作进程 ${process.pid} 已启动,主进程事件：fork`);
    });

    /**
     * 当新建一个工作进程后，工作进程应当响应一个online消息给主进程。当主进程收到online消息后触发这个事件。 'fork' 事件和 'online'事件的不同之处在于，前者是在主进程新建工作进程后触发，而后者是在工作进程运行的时候触发
     * @param woker {cluster.Woker} 运行的工作进程
    */
    cluster.on('online', (woker) => {
        console.log(`工作进程 ${process.pid} 开始运行,主进程事件：online`);
    });

    /**
     * 当一个工作进程调用listen()后，工作进程上的server会触发'listening' 事件，同时主进程上的 cluster 也会被触发'listening'事件。
     * 事件处理器使用两个参数来执行，其中worker包含了工作进程对象，address 包含了以下连接属性： address、port 和 addressType。当工作进程同时监听多个地址时，这些参数非常有用。
     * @param woker {cluster.Woker} 启动监听的工作进程
     * @param address {Object} 监听地址信息
     *    addressType
     *      4 (TCPv4)
            6 (TCPv6)
            -1 (unix domain socket)
            "udp4" or "udp6" (UDP v4 or v6)
    */
    cluster.on('listening', (woker, address) => {
        console.log(`工作进程 ${woker.process.pid} 创建了一个端口监听，监听地址：${address.address} 监听端口：${address.port},主进程事件：listening`);
    });

    /**
     * 当cluster主进程接收任意工作进程发送的消息后被触发。
     * @param woker {cluster.Woker} 启动监听的工作进程
     * @param message {Object} 工作进程发送的信息对象
     * @param handle {undefined | Object} 工作进程传过来的方法
    */
    cluster.on('message', (woker, message, handle) => {
        console.log(`工作进程 ${woker.process.pid}发送过来的消息：${message} ,主进程事件：message`);
    });
    
} else {
    // 工作进程可以共享任何 TCP 连接。
    // 在本例子中，共享的是一个 HTTP 服务器。
    require('./woker')();
}

