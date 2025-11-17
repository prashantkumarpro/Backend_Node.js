import fs from 'fs'

const writeStream = fs.createWriteStream('file.txt', { highWaterMark: 4 })

// writeStream.write('a')
// writeStream.write('a')
// writeStream.write('a')
// writeStream.write('a')

// writeStream.end()
writeStream.end('Hi, I am Prashant')
// writeStream.on('open', fd => {
//   console.log('fd', fd)
// })

writeStream.on('finish', () => {
  console.log('finished')
})

writeStream.on('close', () => {
  console.log('closed')
})
