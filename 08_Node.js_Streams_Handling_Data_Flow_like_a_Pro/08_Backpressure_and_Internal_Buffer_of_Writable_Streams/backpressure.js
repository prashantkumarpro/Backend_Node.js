import fs from 'fs'

// console.log(writeStream.writableHighWaterMark) // 16384

// writeStream.write('abc')
// writeStream.write('123')
// writeStream.write('ABC')

console.time()
const readStream = fs.createReadStream(
  'C:\\Users\\HP\\Desktop\\Nikita.Roy.mkv',
  { highWaterMark: 1 * 1024 * 1024 }
)
const writeStream = fs.createWriteStream('stream.mkv')

readStream.on('data', chunkBuffer => {
  // Time 10s
  // memory 30mb
  // CPU 10%
  // fs.appendFileSync('base.mkv', chunkBuffer)

  // Time 5s
  // memory 100mb
  // CPU 20%
//   writeStream.write(chunkBuffer)

  // After handling backpressure
  // Time 5s
  // Memory 30mb
  // CPU 20%
  const isEmpty = writeStream.write(chunkBuffer);
  if(!isEmpty){
    readStream.pause()
  }
})

writeStream.on("drain", ()=>{
    readStream.resume();
})

readStream.on('end', () => {
  console.timeEnd()
})
