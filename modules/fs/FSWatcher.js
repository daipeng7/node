/**
 * fs.FSWatcher类  监控目录或文件变化的类
 * 1.参数 eventType 变化类型， filename  文件名称
 */ 
const fs = require( 'fs' );

// change 事件的两种监听方式
// let fswatcher = fs.watch( '../global', {
//     encoding : 'utf8'
// }, ( eventType, filename )=>{
//     if( filename ){
//         console.log( filename );
//         console.log( eventType );//变化类型
//     }
// } );    
let fswatcher = fs.watch( '../global', { encoding : 'utf8' });
fswatcher.on( 'change', ( eventType, filename )=>{
    if( filename ){
        console.log( filename );
        console.log( eventType );//变化类型
    }
} );
// error 错误事件
fswatcher.on( 'error', (error)=>{
    console.log( error );
} );
// close 关闭监控事件
setTimeout( ()=>{
    fswatcher.close();
}, 3000  );