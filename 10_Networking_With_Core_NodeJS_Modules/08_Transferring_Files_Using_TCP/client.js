import { createReadStream, createWriteStream } from 'node:fs'
import net from 'node:net'

const socket = net.createConnection({
  host: '10.113.0.211',
  port: 4000
})

socket.on('connect', () => {
  console.log('Connected to server')
})

// const readStream = createReadStream('C:\\Users\\HP\\Videos\\day1.mp4')

// // upload
// readStream.pipe(socket)

const writeStream = createWriteStream('C:\\Users\\HP\\Desktop\\my-day1.mp4')

//download
socket.pipe(writeStream)

socket.on('end', () => {
  console.log('File download completed')
})

socket.on('error', () => {
  console.log('Server lost')
})
