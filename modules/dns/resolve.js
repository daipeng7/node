/**
 * Class dns.Resolver  创建一个DNS解析对象用于解析,8.3.0新增的
 */ 
// const { Resolver } = require( 'dns' );

// const resolver = new Resolver();
// console.log( resolver.getServers() );

const dns = require( 'dns' );
console.log( dns.getServers() );//[ '61.139.2.69', '218.6.200.139' ]


















