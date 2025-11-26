import fs from 'fs'

const fd = fs.openSync('text.txt', 'w')

// const buff = Buffer.alloc('123')

// fs.write(fd, "🔥", (err, bytesWritten, writtenData) => {
//   console.log(bytesWritten)
//   console.log(writtenData)
// })

const bytesWritten = fs.writeSync(fd,"👌");
console.log(bytesWritten)
