/**
 * 服务器端：http.Server,响应后得到的都是http.IncommingMessage类，他传给了requset，response 
 */

/**
 * http.Agent 代理类，就是用于维护一个连接池，创建连接池的原因：
 *      创建一个TCP连接需要三次握手、分配资源等，这个是很费资源的，如果高并发的大量连接关闭，不合理，所以创建一个连接池对象，保存创建过的连接对象，如果没有就推入连接池空闲对象
 * 连接池原理：
 *      一开始就创建默认个数的socket连接，并放入连接池中备用，当有连接来时就使用。当高并发空闲连接数快不够用时就在开连接。如果太多空闲连接是就释放连接。相当于就是构建了一个前置的连接缓冲池。
 * 大致步骤：
 *      1.连接预热 （启动时自动打开n个连接以供使用）
 *      2.使用 例如 轮转法 均匀分发 连接请求
 *      3.当池中的连接即将耗尽得时候动态产生新的连接
 *      4.当池中的连接一段时间没有被调用的时候，自动释放连接
 *      5.自动丢弃 已经坏掉的 连接
 *      6.系统关闭的时自动释放所有连接
 * 用node创建一个http服务器，默认http.globelAgent();默认keeyAlive为false，就是要访问时才创建，就是没有连接池
 */
const { getParams } = require( './getParams' );
const http = require( 'http' );

const keepAliveAgent = new http.Agent({
    keepAlive : false,
    keeyAliveMsece : 1000,//当keepAlivew为true，简历TCP后数据包的初始化延迟
    // maxSockets : ,//每台主机允许最大socket数量，默认无限制
    maxFreeSokets : 256 //当创建线程池后允许打开的最大的空闲socket数量，默认256。

})
let proxy = http.createServer( ( req,res )=>{
    /**
     * http.ServerRquest
     * 事件：
     *      data : 开始接受数据时触发
     *      chunk : 与data相同，只不过监听次数很多
     *      end : 数据接收完成
     *      close : 请求结束
     */ 
    
    getParams( req,(params)=>{
        console.log( '数据接收完毕' );
        console.log( params );
        res.writeHead( 200, { 'Content-Type' : 'text/plain'} );
        res.end( '你的数据我已经收到了哈' );
    } );
    
});


/**
 * 各种事件：
 */

/**
 * 请求头中带有 Expect:100-continue：
 *      当客户端发送POST请求的数据较大,http1.1协议为了提高效率，客户端会携带改字段，如果服务器应答100 continue，才继续传送正文，否则应答417.
 */ 

// 接收到一个请求头带有Expect: 100-continue时触发，checkContinue事件如果不注册，则服务器会自动响应100 continue
proxy.on( 'checkContinue', (re,res)=>{
    console.log( 'I am CheckContinue Event' );
} );
// 接收到一个请求头带有Expect的值不为100-continue触发（checkContinue相反）,如果该事件未被注册，则服务器自动响应417 Expectation Failed.
proxy.on( 'checkExpectation', ()=>{
    console.log( 'I am CheckExpectation Event' );
} );
// 每次接受到一个请求时触发。主意，每链接可能有多个请求（在http keep-alive链接的情况下）
// proxy.on( 'request', (req,res)=>{
//     console.log( 'I am Request Event' );
// } );
// 该事件是客户端触发了一个'error',则服务器该事件触发，用于关闭或者销毁底层的socket，默认情况下，请求异常是会立即销毁socket
proxy.on( 'clientError', (exception,socket)=>{
    socket.end( 'HTTP/1.1 400 Bad Request\r\n\r\n' );
} );
// 当服务器关闭时触发
proxy.on( 'close', ()=>{

} );
// 当客户端发送HTTP CONNECT 请求是触发。如果该事件未被监听，则发送CONNECT请求的客户端会关闭连接。如果触发后需要用net.socket的事件交互
proxy.on( 'connect', (req,socket,head)=>{
    socket.on( 'data', (data)=>{
        console.log( '你触发的是CONNECT事件' );
    } );
} );
// 当客户端发送HTTP upgrade请求时触发。
proxy.on( 'upgrade', (req,socket,head)=>{
    socket.on( 'data', (data)=>{
        console.log( '你触发的是upgrade事件' );
    } );
} );
proxy.listen( 8089, 'localhost', ()=>{
    console.log('服务器启动');
});