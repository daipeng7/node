/**
 * 监控日志改动
 */ 
const fs = require( 'fs' );
const readline = require( 'readline' );
let logPath = './log.js';
let getLog = './getlog.js';
let init = ()=>{

}

let conoleLog = ()=>{

}
fs.open( logPath, 'a+', (err, fd)=>{
    watchChage( logPath );
} );

// 监控文件变化
let watchChage = ( filename )=>{
    return fs.watchFile( filename, {
        persistent : true,
        interval : 1000 
    }, (curr, prev)=>{
        
    } );
}

// 逐行读取
readline.createInterface( {
    input : fs.createReadStream(logPath, {
        flags : 'r',
        autoClose : true,
        fd : null
    }),
    output : fs.createWriteStream(getLog, {

    })
} );













