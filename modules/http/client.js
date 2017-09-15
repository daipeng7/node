/**
 * 客户端：http.clientRequest,响应后得到的都是http.IncommingMessage类，他传给了response
 */ 
const querystring = require( 'querystring' );
const http = require( 'http' );

let requestServer = http.request( {
    protocol : 'http:',//协议，默认http
    host : 'localhost', //域名或IP地址，默认localhost
    // hostname : ,//为了支持url.parse（）,优先级高于host
    // family : 4,//协议族，默认同时支持IPv4和IPv6
    port : 8089,//请求的目标服务器端口
    // localAddress : ,//为网络连接绑定本地接口
    // socketPath : ,//Unix 域 Socket（使用 host:port 或 socketPath）
    method : 'GET',//默认GET
    path : '/index.html?id=1',//请求路径，默认'/',包括参数也在这儿写,'/index.html?id=1'
    headers : {
        'Content-Type' : 'application/json'
    },//请求头对象
    // auth : ,//基本身份验证
    // agent : ,//默认undefined，Agent对象，false
    // createConnetion : ,
    // timeout : 

}, ()=>{
    // callback
});
/**
 * 客户端事件:
 */
// 请求被客户端通过abort()方法关闭
requestServer.on( 'abort',()=>{
    console.log( '我被自己关闭了，关闭的方法是abort()' );
} );
// 请求是被服务器关闭的哈，连socket也被关了
requestServer.on( 'aborted', ()=>{
    console.log( '请求是被服务器关闭的哈，连socket也被关了' );
} );
// 服务器相应了CONNECT请求触发
requestServer.on( 'connect', (req,socket,head)=>{
    socket.on( 'data',(data)=>{

    } );
} );
// 当服务发送了一个100 continue的HTTP相应时触发
requestServer.on( 'continue',()=>{
    console.log( '服务器相应了continue请求' );
} );
// 服务器相应事件
requestServer.on( 'response', (res)=>{
    // console.log( `这是服务器返回的数据 ${res}` );
    console.log( res.headers );
    console.log( res.httpVersion );
    console.log( res.method );
    console.log( res.statusCode );
    console.log( res.statusMessage );
    console.log( res.trailers );
} );
// 当该socket被分配到请求后触发
requestServer.on( 'socket',(socket)=>{
    console.log( '我被服务分配了一个socket' );
    socket.on( 'data', (data)=>{
        console.log( `这是服务器发回的数据：${data}` )
    } );
} );
// 服务器相应了一个upgrade请求触发
requestServer.on( 'upgrade',(res,socket,head)=>{
    console.log( '服务器的升级OK了' );
} );

// 这里也可以使用requestServer.write(data,encoding)然后在调用end(data[,encoding[,callback]])
// First argument must be a string or Buffer
const postData = querystring.stringify({
    'msg' : 'Hello World!'
  });
requestServer.end( postData );