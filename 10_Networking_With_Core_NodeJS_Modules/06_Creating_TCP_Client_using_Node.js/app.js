import net from 'node:net'

const server = net.createServer(socket => {
  console.log('client connected', socket.remoteAddress)

  socket.on('data', chunk => {
    console.log(chunk.toString())
    socket.write('Got your message!')
  })

  socket.on('close', () => {
    console.log('client disconnected', socket.remoteAddress)
  })

  socket.on('error', err => console.log('Client error:', err.message))
})

server.listen(4000, '0.0.0.0', () => console.log('Server started on port 4000'))
