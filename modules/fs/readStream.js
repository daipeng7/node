/**
 * fs.ReadStream类 读取流
 */ 
const fs = require( 'fs' );
/**
 * fs.createReadStream( path, optoins )  创建文件读取流
 * optoins : 
 *      flags : 读取文件操作，默认'r'
 *              r ：读取文件，文件不存在时报错；
 *              r+ ：读取并写入文件，文件不存在时报错；
 *              rs ：以同步方式读取文件，文件不存在时报错；
 *              rs+ ：以同步方式读取并写入文件，文件不存在时报错；
 *              w ：写入文件，文件不存在则创建，存在则清空；
 *              wx ：和w一样，但是文件存在时会报错；
 *              w+ ：读取并写入文件，文件不存在则创建，存在则清空；
 *              wx+ ：和w+一样，但是文件存在时会报错；
 *              a ：以追加方式写入文件，文件不存在则创建；
 *              ax ：和a一样，但是文件存在时会报错；
 *              a+ ：读取并追加写入文件，文件不存在则创建；
 *              ax+ ：和a+一样，但是文件存在时会报错。
 *      encoding : 'utf8'   编码
 *      autoClose : 是否读取完后自动关闭，默认true
 *      start : 指定文件开始读取位置
 *      end : 指定文件结束读取位置
 */ 
let readStream = fs.createReadStream( __dirname+'/index.js', {} );

// open 文件打开事件
readStream.on( 'open', (fd)=>{
    console.log( '打开文件' );
    console.log( fd );
} );

// data 读取文件数据事件
readStream.on( 'data', (data)=>{
    console.log( data );
} );

// error 读取错误事件
readStream.on( 'error', (error)=>{
    console.log( error );
} );

// end 文件流数据读取完成后触发，在close之前
readStream.on( 'end', ()=>{
    console.log( '文件流读取结束' );
} );

// close 关闭文件读取流事件
readStream.on( 'close', ()=>{
    console.log( '文件关闭' );
} );










