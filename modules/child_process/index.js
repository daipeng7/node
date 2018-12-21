/**
 * child_process是Node.js的一个十分重要的模块，通过它可以实现创建多进程，以利用单机的多核计算资源。虽然，Nodejs天生是单线程单进程的，但是有了child_process模块，可以在程序中直接创建子进程，
 * 并使用主进程和子进程之间实现通信，等到子进程运行结束以后，主进程再用回调函数读取子进程的运行结果。
 */ 

/**
 * 创建进程的方法:
 * 1、shell ： child_process.exec() 、 child_process.execSync() 先衍生一个shell（命令行解释器）并在上面运行命令（windows下必须使用）
 * 2、no shell : child_process.execFile() 、 child_process.execFileSync() 不用衍生一个shell,就可以运行命令（Linux下性能好，因为自带shell，windows下不行，因为.cmd .bat没有执行终端）
 * 3、核心方法 : child_process.spawn()
 * 4、child_process.exec()是对spawn方法的封装
 */ 

/**
 * spawn 和 exec 的区别
 * 总体来说 spawn 返回一个stream，exec返回一个buffer
 * child_process.spawn 返回一个有输出流和错误的流的对象，你可以监听它们从而获取数据，输出流有数据和结束事件，child_process.spawn 适合用在处理大量数据返回的场景中，图片处理，读二进制数据等等。
 * child_process.spawn是一个异步的异步函数，怎么解释呢？child_process.spawn 在执行时就会返回数据，而不是等到数据都处理好了再一次返回。
 * child_process.exec 一次性返回输出执行结果内容，默认的buffer大小为200kb，如果exec返回的内容超过 200kb则会返回一个错误：Error maxBuffer execeded，你可以通过设置options buffer的size来扩大 buffer 的大小。
 * child_process.exec 是一个同步的异步方法，这个意思是，虽然方法体本身是异步的，但是它要等 child process 执行完成后，再把返回数据一口气返回给回调方法。如果返回内容超过了设置的buffer size，则会返回一个maxBuffer exceeded 错误。
 * child_process.exec:产生一个shell客户端，然后使用shell来执行程序，当完成的时候传递给回调函数一个stdout和stderr
 * child_process.fork：产生一个新的Node.js进程，同时执行一个特定的模块来产生IPC通道，进而在父进程和子进程之间传输数据
 */  
//  windows系统衍生.bat  .cmd

const { spawn } = require( 'child_process' );
const fs = require('fs');
const path = require('path');
const resolve = function(file) {
    return path.resolve(__dirname, file);
}
const out = fs.openSync(resolve('./out.log'), 'a');
const error = fs.openSync(resolve('./error.log'), 'a');



// console.log(process.env);//环境变量
/**
 * 进程线程间的关系：
 * 1.线程是程序执行的最小单元，进程是任务调度的最小单元
 * 2.一个进程由一个或多个线程组成（至少一个），线程间可以共享进程的内存空间，进程间互相独立（有各自的内存空间）
 * 3.操作系统使用 CPU 时间分片来调度进程、线程的执行，从而实现多任务
 * 4.线程间的切换比进程间切换开销小
 */ 
/**
 *  创建子进程使其成为daemon（守护进程）:
 *  1.默认情况下，父进程会等待子进程退出后才退出。
 *  2.创建子进程后，就马上通过流的方式返回数据给主进程，这一点与exec有区别
 */
/**
 * 父子进程间的通信：
 * stdio：
 * 1. 'pipe':默认值，建立进程通信管道，子进程中的process.stdio 重定向到了subprocess.stdio；还可以这样写process.stdin.pipe( subprocess.stdin ),subprocess.stdout.pipe( process.stdout )
 * 2. 'inherit' 继承stdio的意思，等同于 [process.stdin, process.stdout, process.stderr] 或 [0,1,2]，子进程直接使用父进程的 IO
 * 3. 'ignore'：不建立 pipe 通道，不能 pipe、不能监听 data 事件、IO 全被忽略
 */ 
const subprocess = spawn( 'node', [resolve('./child1.js')], {
    stdio : ['ignore', out, error],//这些io通道还可以建立日志输出通道,如果需要创建一个完整的守护进程需要将stdio：ignore
    detached : true //子进程会成为新的进程组和会话领导，在父进程退出后也能运行；但是有个前提，就是子进程的stdio必须没有被连接到父进程;设置为true以后subprocess.stdio.下面的接口流都为null
} );
// console.log( subprocess.stdout );
// subprocess.stdout.on( 'data', (data) => {
//     console.log( `stdout ${data}` ); 
// } );

setTimeout(()=>{console.log('parent out')},1000);

subprocess.unref(); //默认情况下，父进程会等子进程退出以后才退出，其实这个时候父进程任务已经完成了；使用该方法可以使得子进程单独运行。因为存在引用关系，如果想创建完全的守护进程还是要stdio='ignore'
