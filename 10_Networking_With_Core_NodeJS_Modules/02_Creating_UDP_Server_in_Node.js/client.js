import dgram from 'node:dgram' // UDP

const socket = dgram.createSocket('udp4') // EventEmeter

socket.on('message', (message, remoteAddress) => {
  console.log(message.toString())
  console.log(remoteAddress)
  socket.close()
})

socket.send('Hi from Lap', 4000, '10.113.0.211', () => {
  console.log('message sent')
})
