import exress from 'express'
const app = exress()

app.disable('x-powered-by') // we don't need to tell about it

app.get('/', (req, res) => {
  res.send('Hello World!👌')
  //   res.setHeader('Content-Type', 'text/html;charset=utf8')
  //   res.end("Hello World!👌")
})

app.listen(4000, () => {
  console.log('Server started on 4000')
})
