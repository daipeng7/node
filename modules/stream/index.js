/**
 * Stream nodejs的核心模块基本都是stream的实例，他控制了数据的传输
 * 分类：
 *      Readable：用来读取数据，比如 fs.createReadStream()。
 *      Writable：用来写数据，比如 fs.createWriteStream()。
 *      Duplex：可读+可写，比如 net.Socket()。
 *      Transform：在读写的过程中，可以对数据进行修改，比如 zlib.createDeflate()（数据压缩/解压）。
*/