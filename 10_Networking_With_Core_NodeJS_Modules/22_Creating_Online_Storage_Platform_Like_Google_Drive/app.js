import { open, readdir, readFile } from 'fs/promises'
import http from 'http'
import mime from 'mime-types'
import path from 'node:path'

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  if (req.url === '/') {
    await serverDirectory(req, res)
    return
  }

  try {
    const [url, queryString] = req.url.split('?')

    const queryPrams = {}
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=')
        queryPrams[key] = value
      })
    }

    const fileHandle = await open(`./storage${decodeURIComponent(url)}`)
    const stats = await fileHandle.stat()

    if (stats.isDirectory()) {
      await serverDirectory(req, res)
      return
    }

    const readStream = fileHandle.createReadStream()

    res.setHeader(
      'Content-Type',
      mime.contentType(url.slice(1)) || 'application/octet-stream'
    )

    res.setHeader('Content-Length', stats.size)

    if (queryPrams.action === 'download') {
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${path.basename(url)}"`
      )
    }

    readStream.pipe(res)
  } catch (error) {
    console.log(error.message)
    res.statusCode = 404
    res.end('Not Found')
  }
})

async function serverDirectory (req, res) {
  const [url] = req.url.split('?')
  const itemList = await readdir(`./storage${url}`, {
    withFileTypes: true
  })

  const detailedList = itemList.map(item => ({
    name: item.name,
    type: item.isDirectory() ? 'folder' : 'file'
  }))

  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(detailedList))
}

server.listen(80, '172.30.85.211', () => {
  console.log('Server started')
})
