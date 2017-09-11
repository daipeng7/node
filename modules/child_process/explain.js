/**
 * 创建进程的方法:
 * 1、shell ： child_process.exec() 、 child_process.execSync() 先衍生一个shell（命令行解释器）并在上面运行命令（windows下必须使用）
 * 2、no shell : child_process.execFile() 、 child_process.execFileSync() 不用衍生一个shell,就可以运行命令（Linux下性能好，因为自带shell，windows下不行，因为.cmd .bat没有执行终端）
 * 3、核心方法 : child_process.spawn()
 * 4、创建一个子进程 ： child_process.fork()
 */ 

//  windows系统衍生.bat  .cmd

const { spawn, exec } = require('child_process');

console.log(process.env);