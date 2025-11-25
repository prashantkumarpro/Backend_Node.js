import fs from 'fs'

const fd = fs.openSync('text.txt')

// fs.read(fd,(err,bytesRead, buffData)=>{
//     console.log(err)
//     console.log(bytesRead) // 8
//     console.log(buffData.toString())
//     console.log(buffData.byteLength)// 16384 kb
// })

// custom buffer
const readBuffer = Buffer.alloc(10)

fs.read(
  fd,
  {
    buffer: readBuffer,
    length: 5,
    position: 2
  },
  (err, bytesRead, buffData) => {
    console.log(buffData.toString()) // 8
    console.log(buffData.byteLength) // 16384 kb
  }
)
