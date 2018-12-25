/**
 * 工作进程
*/
const cluster = require('cluster');
const http = require('http');

console.log(`工作进程:${cluster.isWorker}`);
const worker = function() {
    http.createServer((req, res) => {
        cluster.worker.send('我来自worker进程');
        res.writeHead(200);
        res.end('你好世界\n', 'utf8');
    }).listen(8000, '0.0.0.0');

    console.log(`工作进程 ${process.pid} 已启动`);
};

/**
 * 工作进程断开连接
*/
cluster.worker.on('disconnect', () => {
    console.log(`工作进程 ${worker.id} 已经断开与主进程的连接,工作进程事件：disconnect`);
});

/**
 * 工作错误，等同process.on('error')
*/
cluster.worker.on('error', () => {
    console.log(`工作进程 ${worker.id} 出错,工作进程事件：error`);
});

/**
 * 工作进程退出
 * @param code {number}  正常退出下是退出码
 * @param signal {string}  导致进程被kill的信号名称 (例如 'SIGHUP')
*/
cluster.worker.on('ecxit', () => {
    console.log(`工作进程 ${worker.id} 已经退出,工作进程事件：ecxit`);
});

/**
 * 和cluster.on('listening')事件类似，但针对特定的工作进程
 * @param address {Object}  监听对象
*/
cluster.worker.on('listening', () => {
    console.log(`工作进程 ${worker.id} 创建了一个端口监听，监听地址：${address.address} 监听端口：${address.port},工作进程事件：listening`);
});

/**
 * 和cluster.on('message')事件类似，但针对特定的工作进程, 在工作进程内，可以使用process.on('message')
 * @param message {Object}  消息对象
 * @param handle {undefined| Object}    
*/
cluster.worker.on('message', () => {
    console.log(`工作进程 ${worker.id} 消息,工作进程事件：message`);
});

/**
 * 和cluster.on('online')事件类似，但针对特定的工作进程。
*/
cluster.worker.on('online', () => {
    console.log(`工作进程 ${worker.id} 开始运行,工作进程事件：online`);
});

module.exports =  worker;