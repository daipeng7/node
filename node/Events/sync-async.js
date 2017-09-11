/**
 * evnets事件监听器是根据注册顺序同步执行
 * 但是可以通过setImmediate和process.nextTick()方法进行异步处理.等改队列中都做完了才做这事
 */
const EventEmitter = require('events');

let myEvent = new EventEmitter();
myEvent.on('test', (a, b) => {
    
    setImmediate(() => {
        console.log('异步执行！');
    });
    console.log(a,b);

    // 1 2
    // 异步执行！
});

myEvent.emit('test', 1, 2);
 