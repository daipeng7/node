// 创建一个client服务器,连接成功后返回的是个socket实例，就如同server中的connection回调函数的参数
const net = require( 'net' );

let client = net.createConnection( {
        port : 8089
    }, ()=>{
        client.write( '你好服务器！');
    } );

// 注册消息时间
client.on( 'data', (data)=>{
    console.log( `客户端：接收到服务器端数据==》 ${data}` );
    setTimeout( ()=>{
        client.end();//如果中途直接退出客户端，服务器端会报错
    }, 5000 );
} );

// 服务器断开
client.on( 'end', ()=>{
    console.log( '客户端：socket关闭' );
} ); 


    














