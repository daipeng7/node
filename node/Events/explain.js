/**
 * Event ：  require('events')
 * 1、this   监听器内的this指向的是event实例，使用ES6方法就不再指向event实例
 * 2、.once   注册一次事件监听器,触发是先注销监听器再执行回调方法。
 * 3、'error' 每一个事件监听器出现错误都会触发一个error事件监听器
 */ 
// 得到Event对象
const EventEmitter = require('events');

// 继承Event对象
class MyEventEmitter extends EventEmitter {};

// 实例化Event对象
const myEvent = new MyEventEmitter();

myEvent.on('test', function(){
    console.log(this);
    // MyEventEmitter {
    //     domain: null,
    //     _events: { test: [Function] },
    //     _eventsCount: 1,
    //     _maxListeners: undefined }
    
});
myEvent.on('test', () => {
    console.log(this);
    // {}
})

myEvent.emit('test');

exports.myEvent = myEvent;