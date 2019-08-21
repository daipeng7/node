/*
 * @Author: daipeng
 * @Date: 2019-08-21 02:45:51
 * @LastEditors: VSCode
 * @LastEditTime: 2019-08-21 03:35:00
 * @Description: 
 */
const http = require('http');

const server = http.createServer();

console.log('worker 线程数量', process.env.UV_THREADPOOL_SIZE)

process.on('message', function() {
    console.log('worker message', arguments)
})

server.on('listening', function() {
    console.log('worker listening', server.address());
    process.send('server', server);
});

server.listen(8090, '127.0.0.1')