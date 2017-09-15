/**
 * process 方法
 */ 

// 1.会使当前Node.js进程立即结束，并生产core文件 
// process.abort();

// 2.返回Node.js进程所运行平台的架构信息
console.log( `This processor architecture is: ${process.arch}` );

// 3.返回该进程执行的命令行参数信息，是一个数组
console.log( process.argv );

// 4.返回该进程执行的命令行参数第一个只读副本，其实就是node运行程序的位置
console.log( process.argv0 );

// 5.变更Node.js当前的工作目录
console.log( `current work dir is：${process.cwd()}` );
// console.log( `current work dir is：${process.chdir( './fs' )}` );
// 6.获取Node.js当前的工作目录
console.log( `current work dir is：${process.cwd()}` );

// 7.process.cupUsage() 获取执行当前进程的用户CPU时间和系统CPU时间
console.log( process.cpuUsage() );//{ user: 312000, system: 31000 }

// 8.process.env 返回一个用户换机信息的对象
// console.log( process.env );

// 9.process.execArgv 返回Node.js进程启动时的特定选项
console.log( process.execArgv );

// 10.process.execPath 返回Node.js进程启动的绝对路径
console.log( process.execPath );//D:\Program Files\nodejs\node.exe

// 11.process.mainModule  获取require.main的替代方式，就是获取入口模块
console.log( process.mainModule );

// 12.process.memoryUsage() 获取Node.js进程的内存使用情况,单位是字节
console.log( process.memoryUsage() );
        // { rss: 22831104,
        // heapTotal: 6815744,   V8内存总量
        // heapUsed: 4628664,    V8内存使用量
        // external: 8252 }      代表V8管理的，绑定到Javascript的C++对象的内存使用情况

// 13. process.nextTick( callback[,...args] ) 将callback添加到nextTick 队列中每次事件轮询完就执行该队列，所以需要控制，防止无线循环

// 14.process.pid 返回进程ID
console.log( process.pid );

// 15.process.platform 返回运行的操作系统平台
console.log( process.platform );

// 16.process.uptime 返回Node.js进程的运行时间，秒数
console.log( process.uptime() );

