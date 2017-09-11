/**
 * 全局变量:
 * 1~5 为模块中使用
 */ 

// 1. __filename : 当前文件模块的绝对路径
console.log(__filename);
// 2. __dirname ： 当前文件夹名称，等同于path.dirname(__filename)
// const path = require('path');
// console.log(path.dirname(__filename));
// console.log(__dirname);



// 3.module ： 对当前模块的引用
// console.log(module);
// Module {
//     id: '.',
//     exports: {},
//     parent: null,
//     filename: 'E:\\js学习\\工具\\Node\\GitHub\\node\\global\\index.js',
//     loaded: false,
//     children: [],
//     paths:
//      [ 'E:\\js学习\\工具\\Node\\GitHub\\node\\global\\node_modules',
//        'E:\\js学习\\工具\\Node\\GitHub\\node\\node_modules',
//        'E:\\js学习\\工具\\Node\\GitHub\\node_modules',
//        'E:\\js学习\\工具\\Node\\node_modules',
//        'E:\\js学习\\工具\\node_modules',
//        'E:\\js学习\\node_modules',
//        'E:\\node_modules' ] 
// }



// 4.exports 全局变量 在模块内部使用就是对当前module.exports的引用\
// console.log(exports === module.exports); //true


// 5.require() 引入模块 require.cache 表示所有被缓存的模块的缓存区，结构为key:value，其中key为文件绝对地址
console.log( require.cache);


// 6.Buffer 用于处理二进制数据,一个Buffer实例

// 7.process

// 8.seImmediate() setInterval()  setTimeout()


