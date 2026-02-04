import http from 'http'
const clientRequest = http.request({
  method: 'POST',
  hostname: '10.113.0.211',
  port: 4000
})

clientRequest.end('Hi I am client')

clientRequest.on('response', response => {
  response.on('data', chunk => {
    console.log(chunk.toString())
  })
})
