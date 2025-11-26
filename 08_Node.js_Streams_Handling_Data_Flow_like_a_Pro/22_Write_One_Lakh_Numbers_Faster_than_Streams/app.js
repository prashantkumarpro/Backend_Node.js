import fs from 'fs'

console.time()

// Time: 35 s
// for (let i = 1; i <= 100000; i++) {
//   if (i === 1) {
//     fs.writeFileSync('numbers.txt', `${i}, `)
//   }
//   fs.appendFileSync('numbers.txt', `${i}, `)
// }

// Time: 450 ms
// const fd = fs.openSync('numbers.txt', 'w')

// for (let i = 1; i <= 100000; i++) {
//   fs.writeSync(fd, 'I miss you a lot.\n')
// }
// fs.closeSync(fd)

console.timeEnd()

