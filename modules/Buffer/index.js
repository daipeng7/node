/**
 * ES6 中的TypedArray ：
 * var a = new ArrayBuffer( 8 )
 * var v1 = new Int8Array( a )  //Int8Array类型二进制数据，每一份的长度为1个字节
 * var v2 = new int16Array( a ) //Int16Array类型二进制数据，每一份的长度为2个字节
 * var v = new int32Array( a ) //Int32Array类型二进制数据，每一份的长度为4个字节
 */ 

/**
 * Node.js 中的Buffer
 *  Buffer 类的实例类似于整数数组，但 Buffer 的大小是固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在被创建时确定，且无法调整。
 *  Buffer 类在 Node.js 中是一个全局变量，因此无需使用 require('buffer').Buffer。
 *  Node.js 8.0.0后Buffer( num ) 、 new Buffer( num ) 将返回一个初始化后的buffer实例，为了安全都不再使用这两个API
 *  为了使 Buffer 实例的创建更可靠、更不容易出错，各种 new Buffer() 构造函数已被 废弃，并由 Buffer.from()、Buffer.alloc()、和 Buffer.allocUnsafe() 方法替代。
 *  传一个字符串、数组、或 Buffer 作为第一个参数，则将所传对象的数据拷贝到 Buffer 中。
 *  传入一个 ArrayBuffer，则返回一个与给定的 ArrayBuffer 共享所分配内存的 Buffer。
 */  


/**
 * Buffer 与 TypedArray
 * Buffer的实例也是Uint8Array
 * 1.Buffer 对象的内存是拷贝到 TypedArray 的，而不是共享的。
 * 2.Buffer 对象的内存是被解析为一个明确元素的数组，而不是一个目标类型的字节数组。 也就是说，new Uint32Array(Buffer.from([1, 2, 3, 4])) 会创建一个包含 [1, 2, 3, 4] 四个元素的 Uint32Array，而不是一个只包含一个元素 [0x1020304] 或 [0x4030201] 的 Uint32Array 。
 * 3.Node.js 的Buffer直接实例化的类型就是Uint8Array类型的缓冲内存
 */
// console.log( new Uint32Array(Buffer.from([1, 2, 3, 4])) ); //等价于 new Uint32Array( buffer ),相当于Buffer.from所作的等价于new ArrayBuffer()然后初始化了值以后返回的buffer实例
// const arr = new Uint8Array(2);

// arr[0] = 5000;
// arr[1] = 4000;

// // 拷贝 `arr` 的内容
// const buf1 = Buffer.from(arr);
// // 与 `arr` 共享内存
// const buf2 = Buffer.from(arr.buffer);
// console.log( arr );//Uint8Array [ 136, 160 ]
// console.log( arr.buffer );//ArrayBuffer { byteLength: 2 }
// console.log( buf1 );//<Buffer 88 a0>
// console.log( buf2 );//<Buffer 88 a0>

// arr[1] = 6000;
// console.log( buf2 );//<Buffer 88 70>



/**
 * Buffer.from(  )
 */  
// Buffer.from( array )
// const buf3 = Buffer.from( [1, 2, 3, 4, 5, 6] ); //Buffer,from( array )
// const buf4 = Buffer.from( 'test' ); // Buffer.from( string )
// console.log( buf3 );// <Buffer 01 02 03 04 05 06>
// console.log( buf4 );//<Buffer 74 65 73 74>
// console.log( buf3.toString( 'hex' ) );// 010203040506
// console.log( buf4.toString( 'hex' ) );//74657374



// Buffer.alloc( siz[,fill[,encoding]] )  fill默认填充0
// let buf5 = Buffer.alloc( 5, 'a' );
// console.log( buf5 );//<Buffer 61 61 61 61 61>
// buf5 = Buffer.alloc( 5, 'a', 'base64' );
// console.log( buf5 );//<Buffer 98 8b 09 ca 82>

// Buffer.byteLength( string[,encoding] )  string代表要计算字节长度的数据，如果string 是字符串 encoding 默认utf8
const buf6 = Buffer.from( [1,2,3,4,5,6] );
console.log( Buffer.byteLength( buf6 ) );//6
console.log( Buffer.byteLength( '大哦哪个那' ) );//15
console.log( Buffer.byteLength(  ) );











