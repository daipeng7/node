/**
 * fs 模块针对文件的读写等操作方法很多
 */ 
const fs = require( 'fs' );

/**
 * fs.read( fd, buffer, offset, length, position,callback );
 *      fd : 指定的文件
 *      buffer : 自己设置的buffe缓冲区
 *      offset : 从buffer的什么位置开始写入到buffer
 *      length : 写入buffer的字节长度
 *      position : 从fd文件的第几个字节开始读取
 */  

/**
 * 1.readFile( filename, [options], callback ); 异步读取文件函数
 *      filename : 必填，文件名
 *      [options] : 可选配置
 *          encoding : 编码，默认null
 *          flag ： 读取方式，默认'r'
 *      callback : 回调方法,参数（ error， data ）
 */  
// fs.readFile( './index.js', { encoding : 'utf8' }, (error,data)=>{
//     console.log( data);
//     writeFileHandle(data);
// } );

/**
 * 2.fs.writeFile( filename,data,[options],callback ); 异步写入文件函数
 *      filename : 必填，文件名或者文件描述符
 *      data : string|Buffer|Unit8Array 写入的数据
 *      [options] : Object|String 可选配置
 *          encoding : 编码，默认utf8
 *          flag ： 读取方式，默认'w'
 *          mode : 权限，默认0o666
 *      callback : 回调方法,参数（ error， data ）
 */
let writeFileHandle = (data)=>{
    fs.writeFile( './writeData.txt', data, {encoding : 'utf8'}, ()=>{
        console.log( '写入完成' );
        appendFileHandle(data);
    } );
}

/**
 * 3.fs.appendFile(  ); 异步追加写入文件函数
 *      filename : 必填，文件名或者文件描述符
 *      data : string|Buffer|Unit8Array 写入的数据
 *      [options] : Object|String 可选配置
 *          encoding : 编码，默认utf8
 *          flag ： 读取方式，默认'w'
 *          mode : 权限，默认0o666可读写
 *      callback : 回调方法,参数（ error， data ）
 */ 
let appendFileHandle = (data)=>{
    fs.appendFile( './writeData.txt', data, { encoding : 'utf8' }, ()=>{
        console.log( '追加写入文件完成' );
    } );
}

/**
 * 4.fs.open( path, flags, [mode], callback );  异步打开文件函数，注意与read方法的关联性
 *      path : String|Buffer|URL
 *      flags : 打开模式
 *      mode : 权限，默认0o666可读写
 *      callback : 回调方法，参数( error, fd )
 */
fs.open( './writeData.txt', 'a+', (err, fd)=>{
    if( err ){
        console.log( '打开文件出错' );
    }
    else{
        console.log( 'open方法：',fd );
        let _buffer = Buffer.alloc( 255 );
        // 读取
        console.log( 'empty : ', _buffer );
        readHandle( fd, _buffer, 0, 9, 3,(error, bytesRead, buffer)=>{
            console.log( 'error', error );
            console.log( 'bytesRead :', bytesRead );
            console.log( 'buffer : ', buffer );
            // writeHandle( fd, Buffer.from( buffer,'utf8' ), 0, 12, null, (err, bytesWritten, buffer)=>{
            //     console.log( 'bytesWritten : ', bytesWritten );
            // } );
        } );
        // 写入
        // _buffer = Buffer.from( '学习文件模块' );
        // console.log( 'dddd ： ', _buffer );
        // writeHandle( fd, _buffer, 3, 12, 9, (err, bytesWritten, buffer)=>{
        //     console.log( 'bytesWritten : ', bytesWritten );
        // } );
    }
    
} );

/**
 * 5.fs.read( fd, buffer, offset, length, position,callback );  读取文件，读取打开的文件到内容缓冲区中
 *      fd : 使用fs.open打开后返回的文件描述符
 *      buffer : 一个Buffer对象，就是分配的一份用于存储的内存
 *      offset : 向buffer中开始写入的偏移量
 *      length : 要读取的字节数,如果为null则
 * 按照设置的缓冲区内存大小读取
 *      position : 从fd中读取位置，如果为null，数据从当前文件读取位置开始读取，且文件读取位置会被更新
 *      callback(err,bytesRead,buffer) : 读取完成后的回调函数，bytesRead实际被读取的字节数，被读取的缓存区对象    
 */
let readHandle = ( fd, buffer, offset, length, position, callback )=>{
    return fs.read( fd, buffer, offset, length, position, callback );
}

/**
 * 6.fs.write( fd, buffer, offset, length, position,callback );  将缓冲区数据写入到fd指向的文件中,这是一个追加写入，不会覆盖原来的；现将内容读到内存中再把数据写入文件中
 *      fd : 使用fs.open打开后返回的文件描述符
 *      buffer : 一个Buffer对象，就是分配的一份用于存储的内存
 *      offset : 整数，从缓存去中读取数据是的初始位置
 *      length : 整数，从缓冲区中读取数据的字节数
 *      position : 整数，写入文件的初始位置
 *      callback(err,bytesWritten,buffer) : 读取完成后的回调函数，bytesWritten实际从buffer中写入的字节数，被读取的缓存区对象  
 */ 
let writeHandle = ( fd, buffer, offset, length, position,callback )=>{
    return fs.write( fd, buffer, offset, length, position,callback );
}

/**
 * 7.fs.fsync( fd, [callback] ); 刷新缓存区，因为fs.write读取的内容不一定完全写入文件
 */

/**
 * 8.fs.mkdir( path, [mode], callback ); 创建目录
 *      path : 要创建目录的完整路径以及文件目录名
 *      mode : 目录权限，默认0777
 *      callback : 创建目录完成后的回调
 */ 

/**
 * 9.fs.readdir( path, callback );  读取目录信息
 *      path : 目录路径
 *      callback( error, files ) : 存放目录中所有的文件名称
 */ 











