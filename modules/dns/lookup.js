const dns = require( 'dns' );

/**
 * dns.lookup( hostname[,optins], callback ), 使用该方法是在底层是同步调用getaddrinfo(3),所以会出现性能问题
 *      hostname : 域名
 *      options : 
 *          family : T地址族。如果提供，必须为整数4或6。如果没有提供，只接受IPv4和IPv6地址。
 *          hints : 如果提供，它必须是一个或多个支持的getaddrinfo标识。如果没有提供，那么没有标识被传递给getaddrinfo。多个标识可以通过在逻辑上ORing它们的值，来传递给hints。
 *              dns.ADDRCONFIG  ： 返回的地址取决于当前系统设置的地址类型IPV4或者IPV6
 *              dns.V4MAPPED ： 如果指定了IPV6，但是没有找到，那么就返回一个IPV4的映射
 *          all :  默认值为false,值为true时， 回调函数返回一个包含所有解析后地址的数组，否则只返回一个地址。
 *       callback( err, address, family )
 */ 
dns.lookup( 'www.baidu.com', {
    family : 4,
    hints : dns.ADDRCONFIG || dns.V4MAPPED,
    all : false
}, (err, address, family)=>{
    console.log( 'address : %j, family : %s',address, family );//address : "180.97.33.107", family : 4
} );

/**
 * dns.lookupService( address, port, callback ); 将参数address和port传入操作系统底层getnameinfo服务来解析处理并返回主机名。
 */ 
dns.lookupService( '127.0.0.1', 8080, (err, hostname, service)=>{
    console.log( 'hostname : %s, service : %s', hostname, service );//hostname : DESKTOP-9A62R1J, service : 8080
} );






