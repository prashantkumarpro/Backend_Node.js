// Write 1 lakh num using nodejs

import fs from 'fs'

console.time()
// Time : 1.312 s
// for (let i = 1; i <= 100000; i++) {
//   if (i === 1) {
//     fs.writeFileSync('num.txt', `${i}, `)
//   } else {
//     fs.appendFileSync('num.txt', `${i}, `)
//   }
// }

// console.timeEnd()

// Time : 32 ms
const writeStream = fs.createWriteStream('streamNum.txt')

for (let i = 1; i <= 1000000; i++) {
  writeStream.write(`${i}, `)
}
writeStream.end()
writeStream.on('finish', () => {
  console.timeEnd() // 3 s , 1000ms = 1s
})
