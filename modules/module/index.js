/**
 * module 模块
 * 1.Node.js将每个文件视为独立的模块,在加载模块上分类有：核心模块（原生模块）和文件模块
 *      文件模块又分为3种：
 *          .js     通过fs模块同步读取文件，并编译执行
 *          .node   通过C/C++编写，使用dlopen加载
 *          .json   使用JSON.parse()解析为js
 * 2.主模块：通过命令启动程序的Node.js模块为主模块，就相当于入口模块,可以通过require.main访问
 * 3.目录作为模块：
 *      在目录下先查找package.json文件并查找main字段{name : 'modle',main : './modle.js'}并加载
 *      如果没有package.json，接加载该目录下的index.js或者index.node文件
 * 4.从node_modules目录下加载
 *      从当前目录一直向上找到node_modules目录，然后按照目录模块加载法加载
 * 5.模块包装器：
 *      (function( module, exports, require, __filename, __dirname ){
 *          模块实际内容
 *      })
 */ 
/**
 * require 加载
 * 1.缓存 :require.cache全局缓存模块
 *      模块第一次加载的都会缓存，如果 “在同一模块中” 重复调用都解析为同一个已经缓存的模块，那么就会返回同一对象，且不会再执行
 *      模块的缓存是基于 “解析出来的文件名” 进行缓存的，所有会受到地址的影响，比如在 “不同的模块中” 多次调用同一个模块，返回的不能保证为同一个对象
 */ 
const path = require( 'path' );
//1. require.resolve()方法用于解析加载文件的路径，但是不加载模块
const test = require( './test' );
console.log(test.x);
console.log(test.getX());
test.add(1);
console.log(test.x);
console.log(test.getX());


// 2.当前模块的文件夹名称
console.log( __dirname );

// 3.当前模块文件名称后解析后的绝对路径
console.log( __filename );
console.log( path.dirname( __filename ) );

// 4.module.children该模块加载的子模块

// 5.module.parent 最先引用该模块的模块