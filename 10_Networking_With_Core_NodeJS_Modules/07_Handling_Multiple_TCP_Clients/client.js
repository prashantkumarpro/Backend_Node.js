import net from 'node:net'

const socket = net.createConnection({ host: '10.113.0.211', port: 4000 })

socket.on('connect', () => {
  console.log('Connected to server')
})

setTimeout(() => {
  // socket.write('Hii From Client!')
  // socket.end()
}, 2000)

socket.on('error', () => {
  console.log('Server Lost')
})

socket.on('data', chunk => {
  console.log(chunk.toString())
})

process.stdin.on('data', input => {
  socket.write(input)
})
