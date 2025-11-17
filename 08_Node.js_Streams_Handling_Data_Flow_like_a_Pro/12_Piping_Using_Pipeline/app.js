import fs from 'fs'
import { pipeline } from 'stream'
console.time()
const readStream = fs.createReadStream(
  'C:\\Users\\HP\\Downloads\\Rewind.2024.720p.HD.mkv',
  { highWaterMark: 1 * 1024 * 1024 }
)

const writeStream = fs.createWriteStream('stream.mkv', {
  highWaterMark: 1 * 1024 * 1024
})

// readStream.pipe(writeStream)

// readStream.on("error",(err)=>{
//   console.log(err)
// })



pipeline(readStream, writeStream, err => {
  console.log(err)
})


setTimeout(() => {
  readStream.destroy("Khatam")
}, 1000)

setInterval(() => {
  console.log('hi')
}, 200);