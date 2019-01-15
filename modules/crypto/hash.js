/**
 * hash.digest([encoding])：计算摘要。encoding可以是hex、latin1或者base64。如果声明了encoding，那么返回字符串。否则，返回Buffer实例。注意，调用hash.digest()后，hash对象就作废了，再次调用就会出错。
*/
const crypto = require('crypto');

console.log(require.resolve('crypto'));

const hash = crypto.createHash('sha256'); // 摘要计算的算法是根据平台openssl支持的算法来的，常用的有sha256/sha1/md5

console.log(hash.update('dfdfdf').digest('hex')); // 调用digest方法后不能再进行计算，否则报错
