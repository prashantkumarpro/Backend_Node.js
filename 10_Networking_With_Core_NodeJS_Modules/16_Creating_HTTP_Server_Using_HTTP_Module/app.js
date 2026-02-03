import http from 'node:http'
const server = http.createServer((request, response) => {
  console.log(request.url)
  console.log(request.method)
  response.setHeader('Content-Length', '20')
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.write('Hello from http server')
  request.on('data', chunk => {
    console.log('got data on request')
    console.log(chunk.toString())
  })
})

// server.on('connection', socket => {
//   socket.on('data', chunk => {
//     console.log(chunk.toString())
//   })
//   socket.end('HTTP\n\nHii from http server')
// })

// server.on('request', (request, response) => {
// request = readable stream
// response = writable stream
//   response.setHeader("Content-Length", "20")
//   response.write("Hello from http server");
// })

server.listen(4000, '0.0.0.0', () => {
  console.log('Server started on 4000')
})
