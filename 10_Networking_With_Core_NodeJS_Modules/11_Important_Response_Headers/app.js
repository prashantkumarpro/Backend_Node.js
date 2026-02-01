import { createReadStream } from 'node:fs'
import { open } from 'node:fs/promises'
import net from 'node:net'

const server = net.createServer(async socket => {
  const fileHanle = await open( "C:\\Users\\HP\\Desktop\\story.mp4")
  // const fileHanle = await open( "C:\\Users\\HP\\Desktop\\Prashant\\ADCA CERTIFICATE.pdf")
  const { size } = await fileHanle.stat()
  const readStream = fileHanle.createReadStream()

  socket.write('HTTP/1.1 200 OKAY\n')
  // socket.write('Content-Type: text/txt; charset=utf-8\n')

  socket.write('Content-Type: video/mp4\n')
  // socket.write('Content-Type: application/pdf\n')

socket.write("Content-Disposition: attachment; filename=story.mp4")

  // socket.write('Access-Control-Allow-Origin: *\n')
  // socket.write('Access-Control-Expose-Headers: Hello, name\n')

  socket.write(`Content-Length: ${size}\n`)
  socket.write('\n\n')

  // socket.end();
  // const readStream = createReadStream('10bit.txt')
  // const readStream = createReadStream("river.webp");
  // const readStream = createReadStream("numbers.txt");
  // const readStream = createReadStream(
  //  "C:\\Users\\HP\\Desktop\\story.mp4"
  // );
  readStream.pipe(socket)
  // socket.write('abcdefgh')
  readStream.on('end', () => {
    console.log('File ended')
  })

  socket.on('data', chunk => {
    console.log(chunk.toString())
  })

  socket.on('close', () => {
    console.log(socket.remoteAddress, ': Client disconnected')
  })

  socket.on('error', () => {
    console.log('Client Lost')
  })
  console.log('Client Connected', socket.remoteAddress)
})

server.listen(4000, '0.0.0.0', () => {
  console.log('Server started on port 4000')
})
