import fs from 'fs'

const writeStream = fs.createWriteStream('file.txt', { highWaterMark: 4 })

let i = 1
write1000a()

writeStream.on('drain', () => {
  console.log('drain', writeStream.writableLength)
  write1000a()
})

function write1000a () {
  while (i <= 1000) {
    console.log(writeStream.writableLength)
    let isEmpty = writeStream.write('a')
    i++
    if (!isEmpty) {
      break
    }
    console.log(isEmpty)
  }
}
