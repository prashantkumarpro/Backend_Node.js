const http = require('http')
const fs = require('fs')
const path = require('path')

let clients = []

const server = http.createServer((req, res) => {
  // 1️⃣ Serve HTML
  if (req.url === '/' || req.url === '/index.html') {
    const html = fs.readFileSync(path.join(__dirname, 'index.html'))
    res.writeHead(200, { 'Content-Type': 'text/html' })
    return res.end(html)
  }

  // 2️⃣ SSE endpoint
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive'
    })

    res.write('retry: 1000\n') // reconnect after 1 second
    res.write('\n')

    clients.push(res)

    console.log('🌍 Client connected:', clients.length)

    req.on('close', () => {
      clients = clients.filter(c => c !== res)
      console.log(' Client disconnected:', clients.length)
    })
  }
})

// push data every 2 sec
setInterval(() => {
  clients.forEach(res => {
    res.write(
      `data: ${JSON.stringify({
        msg: 'Are you at home? Hello are you there?',
        time: new Date().toLocaleTimeString()
      })}\n\n`
    )
  })
}, 100)

// 🔥 IPv6 binding
server.listen(4000, '::', () => {
  console.log('🚀 Server running')
  console.log(server.address())
})
