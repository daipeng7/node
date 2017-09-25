/**
 * 监控日志改动，因为日志都是append型的文件修改方式，所以只需要传控最后一排的变化就行
 */ 
const fs = require( 'fs' );
const readline = require( 'readline' );
let logPath = './log.js';
let getLog = './getlog.js';

fs.open( logPath, 'a+', (err, fd)=>{
    watchChage( logPath, fd );
} );

// 监控文件变化
let watchChage = ( filename, fd )=>{
    return fs.watchFile( filename, {
        persistent : true,
        interval : 1000 
    }, (curr, prev)=>{
        let _len = curr.size - prev.size;
        let buffer = Buffer.alloc( _len );
        if( curr.mtime > prev.mtime ){
            fs.read( fd, buffer, 0, _len,prev.size, (err, bytesRead, buffer)=>{
                console.log( buffer.toString() );
            } );
        }else{
            console.log( '读取文件错误' );
        }
        
    } );
}

// 逐行读取，转移到指定文件
// readline.createInterface( {
//     input : fs.createReadStream(logPath, {
//         flags : 'r',
//         autoClose : true,
//         fd : null
//     }),
//     output : fs.createWriteStream(getLog, {

//     })
// } );













