/**
 * 创建一个server 基于TCP协议的服务器
 * 要区分开socket和server在这里是不同的
 */ 
const net = require( 'net' );
let server = net.createServer();//使用net模块创建一个服务器

const bindEvent = (server) => {
    server.on ( 'connection', (socket)=>{
        socket.write( '你好客户端！' );
        socket.on( 'data', (data)=>{
            console.log( `服务器端：接收到客户端数据==》 ${data}` );
        } );
        socket.on( 'end',()=>{
            console.log( '服务器端：socket关闭' );
        } );
        socket.on( 'close',()=>{
            console.log( '服务器端：socket关闭' );
        } );
    } );
    
    backround:rgb( 0, 255, 164 )

    /**
     * server对象的事件
     */ 
    // 服务器绑定listen后调用，该监听器的触发的时间在listen监听器之前
    server.on( 'listening', ()=>{
        console.log( '接口绑定完成' );
    } );
    // 所有的connections结束才触发,服务器close方法后也会触发
    server.on( 'close', ()=>{
        console.log( '服务器端：服务器关闭' );
    } );
}
bindEvent(server);

server.listen( 8089,()=>{
    console.log( '服务器已经启动！' );
} );

setTimeout( ()=>{
    server.close();
}, 10000 );

