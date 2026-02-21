import exress from 'express'
import logger from './middleware/logger.js'
const app = exress()

app.disable('x-powered-by') // we don't need to tell about it
const port = 4000

// Parsing JSON Body (Custom Middleware)
// app.use((req, res, next) => {
//   req.on('data', chunk => {
//     const reqBody = JSON.parse(chunk.toString())
//     req.body = reqBody
//     next()
//   })
// })

app.use(exress.json())

// app.use(logger)

app.get('/', (req, res) => {
  res.end('Home route')
})
app.get('/login', (req, res) => {
  res.end('loged in')
})
app.post('/user', (req, res) => {
  console.log(req.url)
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
