import fs from 'fs'

const readStream = fs.createReadStream('chars.txt', { highWaterMark: 3 })

// readStream.on('data', chunk => {
//   // console.log(chunk)
//   console.log(readStream.readableFlowing)
//   console.log(readStream.readableEnded)
//   console.log(readStream.isPaused())
// })

readStream.on('data', chunk => {
  const { bytesRead, readableHighWaterMark } = readStream
  if (readableHighWaterMark === bytesRead) {
    fs.writeFileSync('abc.txt', chunk)
  } else {
    fs.appendFileSync('abc.txt', chunk)
  }
  readStream.pause()
  setTimeout(() => {
    readStream.resume()
  }, 100)
})

// console.log(readStream.readableFlowing) // null in initial state
// console.log(readStream.readableEnded) // flase
// readStream.pause()
// console.log(readStream.isPaused())
