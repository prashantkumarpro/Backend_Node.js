import { open } from 'fs/promises'
import express from 'express'
const app = express()

app.disable('x-powered-by') // we don't need to tell about it
const port = 4000

// Serve static file
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.end('Welcome to Home ')
})

app.get('/test', async (req, res) => {
  // const fileHandle = await open('story.mp4')
  // const readStream = fileHandle.createReadStream()
  // const stats = await fileHandle.stat()
  // res.setHeader('Content-Length', stats.size)
  // res.setHeader('Content-Type', 'video/mp4')
  // res.setHeader('Accept-Ranges', 'bytes')
  // res.setHeader('Accept-Ranges', 'bytes')
  // readStream.pipe(res)
  res.sendFile(`${import.meta.dirname}/story.mp4`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
