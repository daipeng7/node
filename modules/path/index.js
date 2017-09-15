/**
 * path 模块,在不同操作系统平台下，表现不一样，所以要主意加以区分
 * path 在不同操作系统上路径风格会不一样，为了一样可以使用 path.win32. 或者  path.posix.  
 */ 

const path = require( 'path' );

//  1.path.basename( path[,ext] )  返回某个路径的最后一部分，ext扩展名，添加后可以丢掉扩展名
console.log( path.basename( '/js学习/fishDemo/index.html' ) );//index.html
console.log( path.basename( '/js学习/fishDemo/index.html', '.html' ) );//index

// 2.提供平台特定的路径分隔符，windows是；  POSIX是：,例如在windows上
// console.log( path.delimiter ); // ；
// console.log( process.env.PATH );//C:\Python27\;C:\Python27\Scripts;C:\ProgramData\Oracle\Java\javapath;C:\WINDOWS\system32;C:\WINDOWS;
// console.log( process.env.PATH.split( path.delimiter ) );//[ 'C:\\Python27\\','C:\\Python27\\Scripts','C:\\ProgramData\\Oracle\\Java\\javapath','C:\\WINDOWS\\system32','C:\\WINDOWS']

// 3.paht.dirname( path ) 返回一个文件的目录名,可以与path.basename做比较
console.log( path.dirname( '/js学习/fishDemo/index.html' ) ); ///js学习/fishDemo

// 4.path.extname( path ) 返回一个文件的扩展名
console.log( path.extname( '/js学习/fishDemo/index.html' ) ); //.html

// 5.path.parse( path )  返回一个路径对象pathObject ： dir-->root-->base-->name-->ext
console.log( path.parse( 'E:/js学习/fishDemo/index.html' ) );
            // { root: 'E:/',
            // dir: 'E:/js学习/fishDemo',
            // base: 'index.html',
            // ext: '.html',
            // name: 'index' }

// 6.path.format( pathObject ) 将路径对象格式化为路径

// 7.path.normalize( path )  规范化路径去掉'.'  '..'
    
// 8.path.sep  提供了不同平台的路径片段分隔符， windows是'\'， POSIX是'/'
console.log( path.sep );












