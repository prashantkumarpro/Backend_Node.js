import { createReadStream, createWriteStream } from 'node:fs'
import net from 'node:net'

const server = net.createServer(socket => {
  socket.write('HTTP/1.1\n\n')

  const readStream = createReadStream('my-day1.mp4')
  readStream.pipe(socket)

  readStream.on('end', () => {
    console.log('File ended')
  })
  
  socket.on('data', chunk => {
    console.log(chunk.toString())
  })

  socket.on('close', () => {
    console.log(`Client disconnected`)
  })

  socket.on('error', err => {
    console.log(`Client error:`, err.message)
  })
})

server.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000')
})
