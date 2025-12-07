import fs from 'fs/promises'

// const fileHandle = await fs.open('text.txt', 'w+')

// const writeStream = fileHandle.createWriteStream()
// writeStream.write("Hiiiii")

// const readstream = fileHandle.createReadStream()
// readstream.setEncoding('utf-8')

// readstream.on('data', chunk => {
//   console.log(chunk)
// })

const readFileHandle = await fs.open("C:\\Users\\HP\\Videos\\2025-11-25 07-35-05.mp4")

const writeFileHandle = await fs.open('day1.mp4', "w")

const readStream = readFileHandle.createReadStream()
const writeStream = writeFileHandle.createWriteStream()

readStream.pipe(writeStream)
