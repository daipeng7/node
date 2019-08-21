/*
 * @Author: daipeng
 * @Date: 2019-08-21 02:45:12
 * @LastEditors: VSCode
 * @LastEditTime: 2019-08-21 03:39:32
 * @Description: 
 */
const fork = require('child_process').fork;
const path = require('path');
const http = require('http');
console.log('master 线程数量', process.platform)
const masterServer = http.createServer(function(req, res) {
    res.end('ok');
});

const subProcess = fork(path.resolve(__dirname, './worker.js'));
subProcess.on('message', function(message, handler) {
    if(message === 'server') {
        masterServer.listen(handler);
    }
});
subProcess.send('woker is created');
