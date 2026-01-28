import net from 'node:net'

const clients = []

process.stdin.on('data', input => {
  const msg = input.toString().trim()
  const [indexStr, ...rest] = msg.split(' ')
  const index = Number(indexStr)

  if (!Number.isNaN(index) && clients[index]) {
    clients[index].write(rest.join(' ') + '\n')
  } else {
    clients.forEach(client => client.write(msg + '\n'))
  }
})

const server = net.createServer(socket => {
  socket.id = clients.length
  clients.push(socket)

  console.log(`Client #${socket.id} connected`)

  socket.on('data', data => {
    console.log(`Client #${socket.id}:`, data.toString())

    clients.forEach(client => {
      if (client !== socket) {
        client.write(`Client #${socket.id}: ${data}`)
      }
    })
  })

  socket.on('close', () => {
    clients.splice(clients.indexOf(socket), 1)
    console.log(`Client #${socket.id} disconnected`)
  })

  socket.on('error', err => {
    console.log(`Client #${socket.id} error:`, err.message)
  })
})

server.listen(4000, '0.0.0.0', () => {
  console.log('Server running on port 4000')
})
