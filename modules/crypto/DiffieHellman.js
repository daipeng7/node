/**
 * DiffieHellma
 *      Diffie-Hellman（简称DH）是密钥交换算法之一，它的作用是保证通信双方在非安全的信道中安全地交换密钥。目前DH最重要的应用场景之一，就是在HTTPS的握手阶段，客户端、服务端利用DH算法交换对称密钥
 *      1、先双方确定两个超大素数
 *      2、双方都随机产生一个随机数（这个随机数保密），然后用各自的随机数计算一个结果
 *      3、然后将各种的计算结果发送给对方
 *      4、最后双方根据对方的结果计算出密钥
 * 
 * 选取两个大数p和g并公开，其中p是一个素数，g是p的一个模p本原单位根(primitive root module p)，所谓本原单位根就是指在模p乘法运算下，g的1次方，2次方……(p-1)次方这p-1个数互不相同，并且取遍1到p-1；

对于Alice(其中的一个通信者)，随机产生一个整数a，a对外保密，计算Ka = g^a mod p，将Ka发送给Bob； 
对于Bob(另一个通信者)，随机产生一个整数b，b对外保密，计算Kb = g^b mod p，将Kb发送给Alice；

在Alice方面，收到Bob送来的Kb后，计算出密钥为：key = Kb^a mod p = g^(b*a) mod p mod p； 
对于Bob，收到Alice送来的Ka后，计算出密钥为：key = Ka ^ b mod p = g^(a*b) mod p mod p。

攻击者知道p和g，并且截获了Ka和Kb，但是当它们都是非常大的数的时候，依靠这四个数来计算a和b非常困难，这就是离散对数数学难题。
*/

const crypto = require('crypto');

const primeLength = 1024; // 素数p的长度
const generator = 5; // 素数a

// 创建客户端的DH实例
const client = crypto.createDiffieHellman(primeLength, generator);
// 产生公、私钥对，Ya = a^Xa mod p
const clientKey = client.generateKeys();

// 创建服务端的DH实例，拆用跟客户端相同的素数a、p
const server = crypto.createDiffieHellman(client.getPrime(), client.getGenerator());
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