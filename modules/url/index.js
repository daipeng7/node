/**
 * url 现在已经开始往web浏览器的url API靠拢，原来NodeJS残留的API是为了向后兼容的
 * 所以引用方式不同
 * WHATWG : { URL } = require( 'url' )
 * 遗留 ： url = require( 'url' )
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                            href                                             │
├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
│ protocol │  │        auth         │        host         │           path            │ hash  │
│          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
│          │  │                     │   hostname   │ port │ pathname │     search     │       │
│          │  │                     │              │      │          ├─┬──────────────┤       │
│          │  │                     │              │      │          │ │    query     │       │
"  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          │  │          │          │   hostname   │ port │          │                │       │
│          │  │          │          ├──────────────┴──────┤          │                │       │
│ protocol │  │ username │ password │        host         │          │                │       │
├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
│   origin    │                     │       origin        │ pathname │     search     │ hash  │
├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
│                                            href                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
 */ 

//  主要介绍WHATWG URL标准方法
const { URL, URLSearchParams } = require( 'url' );

/**
 * 1.new URL( input[,base] );
 *      input : 需要解析的url地址
 *      base : 如果input为相对地址，那么base为基本的url
 * 该类方法实例化后可以获取所有的url结构，与浏览器URL对象相同
 */ 
let myUrl = new URL( ' https://user:pass@sub.host.com:8080/p/a/t/h?query=string&gender=1#hash' );

/**
 * 2.URLSearchParams 该对象是用于操作，地址的search部分的，既可以通过URL实例的searchParams属性访问，也可以单独实例化
 */ 
console.log( 'get method : ', myUrl.searchParams.get( 'query' ) ); // string
console.log( 'getAll method : ', myUrl.searchParams.getAll( 'query' ) ); // ['string']
console.log( 'append method : ', myUrl.searchParams.append( 'age', 12 ) ); // 增加
console.log( 'has method : ', myUrl.searchParams.has( 'age' ) ); // true
console.log( 'keys method : ', myUrl.searchParams.keys() ); // URLSearchParamsIterator { 'query', 'gender', 'age' } 返回一个ES6迭代器
console.log( 'set method : ', myUrl.searchParams.set( 'name', 'dp' ) );// 设置兼具增、改功能，如果同key有多个，保留第一个删除后面的
console.log( 'sort method : ', myUrl.searchParams.sort() );//排序，增加命中率











