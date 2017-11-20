/**
 * util  实用工具,很多有用的方法在4.0.0后都被废除了
 */ 
const util = require( 'util' );

/**
 * 1.util.callbackify( original )  封装一个异步函数为回调函数，其第一个参数为reject触发的error，第二个参数为resolve触发的data，都使用return返回
 *      original : 一个Promise实例，或者一个异步方法
 */  
let  fn = ()=>{
    return Promise.resolve( '这是一个正确的数据' );
}

const callback = util.callbackify( fn );

callback( (err, data) =>{
    console.log( err, data );
});

/**
 * 2. util.debuglog( section ) util.debuglog() 方法用于创建一个函数，基于 NODE_DEBUG 环境变量的存在与否有条件地写入调试信息到 stderr。 如果 section 名称在环境变量的值中，则返回的函数类似于 console.error()。 否则，返回的函数是一个空操作。NODE_DEBUG 环境变量中可指定多个由逗号分隔的 section 名称。 例如：NODE_DEBUG=fs,net,tls。
 *      section : 一个字符串，指定要为应用的哪些部分创建 debuglog 函数。 debuglog 函数要为哪些应用创建。设置NODE_DEBUG环境变量，的值，如： NODE_DEBUG=foo，则可以对这种方法设置foo的值
 */ 

 const debug_foo = util.debuglog( 'foo' );
//  添加临时环境变量set NODE_DEBUG=foo && node index.js,如果是用powershell运行可以使用 $evn:NODE_DEBUG="foo"
console.log( process.env.NODE_DEBUG );
 debug_foo( '这是NODE_DEBUG=foo的日志' );//FOO 8032: 这是NODE_DEBUG=foo的日志

/**
 * 3.util.format( format[,..args] ); 使用占位符格式化内容
 *      %s : 字符串
 *      %d : 数值（整数或浮点数）
 *      %i : Integer
 *      %f : Floating point value
 *      %j : JSON.如果value是一个对象引用，则使用字符串'[Circular]'替换
 *      %% : 百分号
 *      %o : Object.包含不可枚举的属性
 *      %O : Object.不包含不可枚举的属性
 */
console.log( util.format( '%d' ), 2 );//2
console.log( util.format( '%d' ), '2' );//2
console.log( util.format( '%d' ), 'dd' );//NaN

/**
 * 4.util.inspect( object[,options] );  将对象进行检查并自定义格式化
 *      object : 对象
 *      options : 
 *          showHidden : 默认false, 如果为true则不可枚举的属性也会包括在格式化后的结果中
 *          depth : 默认为 2，格式化是的递归次数。 若要无限地递归则传入 null。
 *          colors : 默认为false，如果为true，则格式化后的内容会根据类型展示不同的颜色
 *          customInspect :  默认为 true,如果为 false，则 object 上自定义的 inspect(depth, opts) 函数不会被调用。
 *          showProxy : 默认false，如果为 true，则 Proxy 对象的对象和函数会展示它们的 target 和 handler 对象。
 *          maxArrayLength : 指定格式化时数组和 TypedArray 元素能包含的最大数量。 默认为 100。 设为 null 则显式全部数组元素。 设为 0 或负数则不显式数组元素。
 *          breakLength : 一个对象的键被拆分成多行的长度。 设为 Infinity 则格式化一个对象为单行。 默认为 60。
 */ 

console.log( util.inspect(util, {
    shwoHidden : false,
    colors : true
}) );





