import { Buffer } from 'buffer'
import { log } from 'console'
import fs from 'fs/promises'
// const nodeBuffer = Buffer.from('Hello world!', 'utf-16le')

// const nodeBuffer2 = Buffer.alloc(8)
// nodeBuffer2[0] = 98
// nodeBuffer2[7] = 104
// console.log(nodeBuffer.toString());
// console.log(nodeBuffer2);

// fs.writeFile('file.txt', nodeBuffer)

// console.log(nodeBuffer.toString('utf-8'))
// console.log(nodeBuffer.toString('utf-16le'))

// fs.writeFile("file.txt", nodeBuffer2)

const nodeBuffer = Buffer.from('Hello world!')
// console.log(nodeBuffer.toString('hex'));

// const nodeBuffer = Buffer.alloc(8);
// nodeBuffer.write("abc");
// console.log(nodeBuffer.toString());
// console.log(nodeBuffer.toJSON());

// console.log(nodeBuffer.slice(5,8).toString());

// const nodeBuffer2 = Buffer.alloc(8)
// nodeBuffer.copy(nodeBuffer2, 0, 0, 5)
// console.log(nodeBuffer2.toString());
// console.log(nodeBuffer.includes('HE',5))

// console.log(nodeBuffer.fill(58));

// console.log(nodeBuffer.readInt8(2));


