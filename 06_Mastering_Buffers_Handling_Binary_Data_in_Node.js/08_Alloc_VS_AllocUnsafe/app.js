import { Buffer } from 'buffer'

// const buffer1 = Buffer.alloc(4500)
// const buffer2 = Buffer.allocUnsafe(4500)

// console.log(buffer1);
// console.log(buffer2);

console.time('Buffer.alloc')
for (let i = 0; i < 100000; i++) {
  Buffer.alloc(1024) // 1kb buffer
}
console.timeEnd('buffer.alloc')

console.time('Buffer.allocUnsafe')
for (let i = 0; i < 100000; i++) {
  Buffer.allocUnsafe(1024) // 1kb buffer
}
console.timeEnd('Buffer.allocUnsafe')

// console.log(buffer1.toString());
// console.log(buffer2.toString());
