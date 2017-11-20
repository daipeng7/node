/**
 * querystring  查询字符串
 */ 
const querystring = require( 'querystring' );

/**
 * 1.querystring.escape( str ); 对给定str进行URL编码。可以改写改方法自定义编码规则
 */  

/**
 * 2.querystring.parse( str[,sep][,eq][,options]  ); 将一个URL查询字符串str解析成一个键值对的集合
 *      str : 要解析的字符串
 *      sep : 默认'&'，用于界定str中的键值对字符串。
 *      eq : 默认'='，用于界定str中的键与值的字符串。
 *      options : 
 *          decodeURIComponent : 默认querystring.unescape(),解码字符串
 *          maxKeys : 默认1000，指定要解析的键的最大数量。指定为 0 则不限制。
 */  
let _url = 'https://www.baidu.com/s?wd=node%20%E5%B8%B8%E7%94%A8%E5%B7%A5%E5%85%B7&rsv_spt=1&rsv_iqid=0xe88d0dc40000f1a8&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=0&rsv_t=1112x1n9JFtrsWp%2BunY%2BuTZ%2Fd%2BZm5oT%2FfHu8mzMvqBDd6nYAQW1PVMw0hgv3fnjXwTzi&oq=angular%25E6%2580%258E%25E6%25A0%25B7%25E6%258B%25BF%25E5%2587%25BD%25E6%2595%25B0%25E5%25AD%2597%25E7%25AC%25A6%25E4%25B8%25B2%25E7%259A%2584%25E5%258F%2582%25E6%2595%25B0&rsv_pq=8547cab30002a06e&inputT=6477&rsv_sug3=264&rsv_sug1=223&rsv_sug7=100&rsv_sug2=0&rsv_sug4=1933687';
console.log( querystring.parse( _url ) );

/**
 * 3.querystring.stringify( object[,sep][,eq][,options] ); 与2相反
 */ 





