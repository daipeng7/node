/**
 * DiffieHellma
 *      Diffie-Hellman（简称DH）是密钥交换算法之一，它的作用是保证通信双方在非安全的信道中安全地交换密钥。目前DH最重要的应用场景之一，就是在HTTPS的握手阶段，客户端、服务端利用DH算法交换对称密钥
 *      1、先双方确定两个超大素数
 *      2、双方都随机产生一个随机数（这个随机数保密），然后用各自的随机数计算一个结果
 *      3、然后将各种的计算结果发送给对方
 *      4、最后双方根据对方的结果计算出密钥
 * 
 假设客户端、服务端挑选两个素数a、p（都公开），然后

    客户端：选择自然数Xa，Ya = a^Xa mod p，Ya为客户端的公钥，发送给服务端；

    服务端：选择自然数Xb，Yb = a^Xb mod p，Ya为服务端的公钥，发送给客户端；

    客户端：计算 Ka = Yb^Xa mod p

    服务端：计算 Kb = Ya^Xb mod p

    最后会发现 Ka = Kb
*/

const crypto = require('crypto');

const primeLength = 1024; // 模数p的长度,可以经常变化
const generator = 5; // 生成元，如果不设置默认为2

// client和server都利用公开的a,p进行计算出各自的公、私钥对，然后通过交换彼此的公钥来计算出相同的加密字段

// 创建客户端的DH实例
const client = crypto.createDiffieHellman(primeLength, generator);
// 产生公、私钥对，Ya = a^Xa mod p
const clientKey = client.generateKeys();

// 创建服务端的DH实例，拆用跟客户端相同的素数a、p
const clientP = client.getPrime(); // 从客户端传到了服务端,也就是https在进行SSL/TSL协商的时候生成的随机数
const server = crypto.createDiffieHellman(clientP, generator);
// 产生公、私钥对，Yb = a^Xb mod p
const serverKey = server.generateKeys();

// 计算 Ka = Yb^Xa mod p
const clientSecret = client.computeSecret(server.getPublicKey());
// 计算 Kb = Ya^Xb mod p
var serverSecret = server.computeSecret(client.getPublicKey());

// 由于素数p是动态生成的，所以每次打印都不一样
// 但是 clientSecret === serverSecret
console.log(clientSecret.toString('hex'));
console.log(serverSecret.toString('hex'));