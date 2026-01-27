import dgram from 'node:dgram' //UDP
import { createWriteStream, WriteStream } from 'node:fs'
import { writeFile } from 'node:fs/promises'

const socket = dgram.createSocket('udp4')

const wrtieStream = createWriteStream('numbers.txt')
socket.on('message', async (message, remoteAddress) => {
  if (message.toString() === 'EOF') {
    socket.send(
      'File uploaded successfully on the server',
      remoteAddress.port,
      remoteAddress.address
    )
  } else {
    wrtieStream.write(message)
  }
})

socket.bind({ port: 4000 }, () => {
  console.log(socket.address())
  const address = socket.address()
  console.log(`Listening on port ${address.port}`)
})
