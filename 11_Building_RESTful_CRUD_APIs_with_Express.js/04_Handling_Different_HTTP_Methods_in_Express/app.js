import exress from 'express'
import logger from './middleware/logger.js'
const app = exress()

app.disable('x-powered-by') // we don't need to tell about it
const port = 4000

app.use(logger)

app.get('/', (req, res) => {
  res.end('Home route')
})
app.get('/login', (req, res) => {
  res.end('loged in')
})
app.post('/', (req, res) => {
  res.end('post home route')
})
app.put('/', (req, res) => {
  res.end('put home route')
})
app.delete('/', (req, res) => {
  res.end('delete home route')
})
app.patch('/', (req, res) => {
  res.end('patch home route')
})
app.head('/', (req, res) => {
  res.end('head home route')
})
app.options('/', (req, res) => {
  res.end('option home route')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
