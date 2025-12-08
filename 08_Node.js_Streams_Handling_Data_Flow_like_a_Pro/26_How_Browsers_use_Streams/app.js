import http from 'http'

import fs from 'fs/promises'

const server = http.createServer(async (req, res) => {
  // reqest or req is a readable stream and res is a writable stream

  res.setHeader('access-control-allow-origin', '*')
  res.setHeader('Content-Type', 'video/mp4')

  // When user go the url it will download video auto
  res.setHeader(
    'Content-Disposition',
    'attachment; filiename=2025-12-07 08-01-00.mp4'
  )

  const fileHandle = await fs.open(
    'C:\\Users\\HP\\Videos\\2025-12-07 08-01-00.mp4'
  )
  const readStream = fileHandle.createReadStream({
    highWaterMark: 100 * 1024 * 1024
  })

  const { size } = await fileHandle.stat()

  res.setHeader('Content-Length', size)

  readStream.on('data', chunk => {
    res.write(chunk)

    readStream.pause()

    setTimeout(() => {
      readStream.resume()
    }, 500)
  })

  readStream.on('end', () => {
    res.end()
  })
})

server.listen(4000, 'localhost', () => {
  console.log('Server Started')
})
