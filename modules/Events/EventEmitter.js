/**
 * EventEmitter 是event模块现阶段开放的唯一对象
 * newListener 和 removeListener是EventEmitter对象自带的两个事件，任何该对象实例在添加和删除事件时都会触发这两个事件。
 */ 

// EventEmitter.listenerCount(emitter, 'event');获取某一个时间对象的事件个数

const EventEmitter = require('events');

let MyEvent = new EventEmitter();

MyEvent.on('test', () => {});
MyEvent.on('test', () => {});
let _count = EventEmitter.listenerCount(MyEvent, 'test');

console.log(_count);//output:2

// EventEmitter.defaultMaxListeners(n) / emitter.setMaxListeners(n):前者改变所有实例的最大事件注册数，后者改变特定实例的最大事件注册数; 默认10个。
// emitter.getMaxListeners()获取某个事件实例的最大事件注册数
console.log(MyEvent.getMaxListeners()); //output : 10

// emitter.eventNames() 获取该触发器上注册的事件名数组
console.log(MyEvent.eventNames()); //output : ['test']

/**
 * 注册事件监听器： 
 *      emitter.on() 注册
 *      emitter.once() 注册一次，执行时先注销再执行事件句柄函数
 *      emitter.addListener() on的别名方法
 *      emitter.prependListener( evetnName, listener ) 将该事件的事件句柄函数前置注册
 *      emitter.prependOnceListener( eventName, listener ) 将该事件的事件句柄函数前置注册一次
 * 移除事件监听器： emitter.removeListener( eventName, listner )一次只移除一个该事件的监听器 、 emitter.removeAllListeners( [eventName] )移除某个或者多个事件的所有事件监听器
 * 前置事件监听器： 
 */ 