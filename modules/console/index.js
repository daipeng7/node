// 1.new Console(stdout[,stderr]) 如果不传stderr，错误将会放入stdout
const fs = require( 'fs' );
const { Console } = require( 'console' );
const output = fs.createWriteStream( './stdout.log' );
const errput = fs.createWriteStream( './stderr.log' );
const logger = new Console( output, errput );

const count = 5;
logger.info( 'count: %d', count );//输出到 stdout.log
logger.error( 'count: %d', count );//输出到 stderr.log


// 2.console.assert( value, message, ...args) 断言，如果value为false会阻断后续代码的执行，但是可以改写console
console.assert( false, '断言输出' );
console.log( '我还是输出了' );

// 3.console.count( label ) 其中label默认值是'default',记录console了label的次数


// 4.console.countReset( lable )  重置console了label的次数

// 5.console.log( data, [...arg] ) console.info( data, [...args] ) console.error( data, [...args] )


// 6.console.time( label )  console.timeEnd( label ) 输出时间戳
console.time( 'used time:' );
for( let i = 0; i < 10000; i++){}
console.timeEnd( 'used time:' ); //6.0..0后被废除

// 7.console.trace( [message], [...args] ) 打印堆栈信息,当报错是调用他可以作为日志输出
console.trace( 'show me' );

