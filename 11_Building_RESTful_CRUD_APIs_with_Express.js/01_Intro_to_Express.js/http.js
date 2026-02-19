import http from 'http'

const server = http.createServer((req, res) => {
 
  res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.end('Hello from http server')
})

server.listen(3000)