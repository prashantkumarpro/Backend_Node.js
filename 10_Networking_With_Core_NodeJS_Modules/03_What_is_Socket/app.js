import dgram from 'node:dgram' // UDP

const socket = dgram.createSocket('udp4') // EventEmeter

socket.on('message', (message, remoteAddress) => {
  message.toString()
  console.log(message.toString(), remoteAddress)

  socket.send(
    'Message Received Successfully on Server',
    remoteAddress.port,
    remoteAddress.address
  )
})

// socket.on("listening",()=>{
//     console.log(socket.address())
//     console.log("listening")
// })

// socket.send("Hi from Lap",3000, "10.113.0.120" )

socket.bind({ port: 4000 }, () => {
  console.log(socket.address())
  const address = socket.address()
  console.log(`Listening on port ${address.port}`)
})
