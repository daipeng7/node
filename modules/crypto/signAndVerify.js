/**
 * 数字签名和签名验证
 * 公钥/私钥/签名/验证签名/加密/解密/非对称加密
 *      公钥和私钥都可以用来加密数据,相反用另一个解开,公钥加密数据,然后私钥解密的情况被称为加密解密,私钥加密数据,公钥解密一般被称为签名和验证签名.
 * 
*/
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const privateKey = fs.readFileSync(path.resolve(__dirname, './keys/private-key.pem'));
const publicKey = fs.readFileSync(path.resolve(__dirname, './keys/public-key.pem'));
const algorithm = 'RSA-SHA256';

console.log(process.cwd());

const sign = text => {
    const sign = crypto.createSign(algorithm);
    sign.update(text);
    return sign.sign(privateKey, 'hex');
}

const verify = (oriContent, signature) => {
    const verifier = crypto.createVerify(algorithm);
    verifier.update(oriContent);
    return verifier.verify(publicKey, signature, 'hex');
}

// 签名
let content = '需要签名的内容';
let signature = sign(content);
console.log('signature===> %s', signature);

// 签名验证
let verified = verify(content, signature);
console.log('verify===> %s', verified);
