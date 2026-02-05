import { open, readdir, readFile } from 'fs/promises'
import http from 'http'

const server = http.createServer(async (req, res) => {
  if (req.url === '/') {
    serverDirectory(req, res)
  } else {
    try {
      const fileHandle = await open(`./storage${decodeURIComponent(req.url)}`)

      const stats = await fileHandle.stat()
      if (stats.isDirectory()) {
        serverDirectory(req, res)
        return
      }

      const readStream = fileHandle.createReadStream()
      readStream.pipe(res)
    } catch (error) {
      console.log(error.message)
      res.end('NOt Found')
    }
  }
})

async function serverDirectory (req, res) {
  const itemList = await readdir(`./storage${req.url}`)
  let dynamicHTML = ''
  itemList.forEach(item => {
    dynamicHTML += `<li><a href="${
      req.url === '/' ? '' : req.url
    }/${item}">${item}</a></li>`
  })
  const htmlBiolerplate = await readFile('./biolerplate.html', 'utf-8')
  res.end(htmlBiolerplate.replace('${dynamicHTML}', dynamicHTML))
}

server.listen(4000, '0.0.0.0', () => {
  console.log('Server started')
})
