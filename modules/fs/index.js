/**
 * fs 模块
 * 1.fs.read() VS fs.readFile()  
 *      fs.read() 第一个参数只能是fd（文件描述符），用途是将fd文件指定的‘指定’内容读入到‘指定’的buffer（第二个参数）中，是后者的底层函数
 *      fs.readFile() 第一个参数有三种类型，用途是将指定文件的全部内容读取出来，并以参数的方式传递到完成回到函数中，比较常用
 * 2.fs.write() VS fs.writeFile()
 *      fs.write() 第一个参数只能是fd（文件描述符）,有两种用法，将‘指定’大小的内容写入到fd中，是后者的底层函数
 *      fs.writeFile() 第一个参数有三种类型,用途是将指定内容全部写入指定文件，比较常用
 */ 