import { Buffer } from 'buffer'

// const a = new ArrayBuffer(4)
// // const nodeBuffer = Buffer.alloc(4)
// const nodeBuffer = Buffer.from(a)

// const uint8Array = new Uint8Array(a)

// uint8Array[0] = 97
// uint8Array[1] = 98
// uint8Array[2] = 99
// uint8Array[3] = 100
// console.log(nodeBuffer.buffer)
// console.log(uint8Array.buffer === nodeBuffer.buffer)

// console.log(nodeBuffer.toString()) // abcd

const nodeBuffer = Buffer.alloc(4)
const nodeBuffer1 = Buffer.from([97, 98, 99, 100])
console.log(nodeBuffer1.toString('utf-8'));// abcd

const nodeBuffer2 = Buffer.allocUnsafe(4)

console.log(nodeBuffer.byteLength);
console.log(nodeBuffer1.byteLength);
console.log(nodeBuffer2.byteLength);
console.log(nodeBuffer.buffer.byteLength);
console.log(nodeBuffer1.buffer.byteLength);
console.log(nodeBuffer2.buffer.byteLength);