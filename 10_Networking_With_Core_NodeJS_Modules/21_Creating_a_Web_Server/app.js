import { createReadStream } from 'fs'
import http from 'http'

const server = http.createServer(async (req, res) => {
  console.log(req.url)
  if (req.url === '/') {
    const readStream = createReadStream('./public/index.html')
    readStream.pipe(res)
  } else {
    const readStream = createReadStream(`./public${req.url}`)

    readStream.on('error', err => {
      res.end('Not Found!')
    })
    readStream.pipe(res)
  }
})

server.listen(4000, '10.113.0.211', () => {
  console.log('Server started')
})
