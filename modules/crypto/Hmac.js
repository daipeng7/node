/**
 * HMAC的全称是Hash-based Message Authentication Code，也即在hash的加盐运算。使用的话，跟hash模块差不多，选定hash算法，指定“盐”即可。
*/
const crypto = require('crypto');
const secret = 'secret';
const hmac = crypto.createHmac('sha256', secret);

console.log(hmac.update('dddd').digest('hex'));