/**
 * master和worker之间的通信简化
*/
const http = require('http');

const worker = http.createServer((req, res) => {
    console.log('我是worker');
});

worker.on('message', (message) => {
    // console.log(worker);
    console.log(message);
});

setTimeout(() => {
    const master = http.createServer((req, res) => {
        console.log('我是master'); // 请求会直接到接管的server中
        // cluster用于隔离开process的message的关键就是，对message中含有cmd字段且字段包含NODE_开头的不触发precess的message事件。
        // 而是定义了一个内部message事件internalMessage来捕获message
        const message = {
            cmd: 'NODE_CLUSTER',
            act: 'queryServer'
        };
        worker.emit('message', message);
    }).listen(worker);
    worker.listen(8000, '127.0.0.1');
}, 2000);
