import fs from 'fs'
console.time()
const readStream = fs.createReadStream(
  'C:\\Users\\HP\\Downloads\\Rewind.2024.720p.HD.mkv',
  { highWaterMark: 1 * 1024 * 1024 }
)

const writeStream = fs.createWriteStream('stream.mkv', {
  highWaterMark: 1 * 1024 * 1024
})

// readStream.on('data', chunk => {
//   // time 5s
//   // cpu 25%
//   // memory 65mb
//   // writeStream.write(chunk)

//    // time 5s
//   // cpu 10%
//   // memory 95mb
//   const isEmpty = writeStream.write(chunk)
//   if (!isEmpty) {
//     readStream.push()
//   }
// })

// writeStream.on('drain', () => {
//   readStream.resume()
// })

// readStream.on('end', () => {
//   console.timeEnd()
// })
// console.log(readStream)

readStream.pipe(writeStream)

setTimeout(() => {
  readStream.unpipe(writeStream)
}, 2000)

readStream.on('end', () => {
  console.timeEnd()
})
