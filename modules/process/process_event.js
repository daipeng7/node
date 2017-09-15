/**
 * process 事件
 * process也是EventEmitter实例，其实就是一个观察者模式（或者叫发布-订阅模式）
 */

// 1.不是显示原因导致的进程退出会触发该事件
process.on( 'beforeExit', (exitCode)=>{
    console.log( `beforeExit: ${exitCode}` );
} );

// 2.disconnet ： 如果该进程是由IPC 通道创建的进程（child_process），退出时触发该事件
process.on( 'diconnet',()=>{
    console.log( '我是一个IPC进程，已经退出' );
} );

// 3.exit : 触发方式有两种 1.process.exit()触发；2.Node.js事件循环数组中无监听器，导致进程退出。
process.on( 'exit', ()=>{
    console.log( '我是主动退出或者无事可做才退出的' );
} );

// 4.message : 在父子进程间通信
process.on( 'message', (msg,socket)=>{
    console.log( '我是在父子进程间通信的' );
} );

// 5.warning : Node.js进程发出警告时触发;name默认Warning,stack警告的堆栈信息
process.on( 'warning', (name,message,stack)=>{
    console.log( '进程出现警告了，看看是不是有什么需要优化的哦！' );
} );


/**
 * Signal Event : 信号事件，在进程中特定的信号触发的事件，遵循POSIX信号列表。具体的查看API文档
 */ 

//  在终端运行时，CTRL+C触发
process.on( 'SIGINT', ()=>{
    console.log( '在终端运行' );
} );

setTimeout( ()=>{

}, 3000 );






