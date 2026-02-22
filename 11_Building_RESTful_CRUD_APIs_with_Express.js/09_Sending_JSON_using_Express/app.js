import express from 'express'
const app = express()

app.disable('x-powered-by') // we don't need to tell about it
const port = 4000

app.get('/', (req, res) => {
  // res.setHeader('Content-Type', 'application/json')
  // res.send(JSON.stringify({ message: 'Hello world' }))
  res.status(301).json({message: "Hello World!"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
