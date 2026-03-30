import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 4000

app.use(
  cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true
  })
)

app.get('/', (req, res) => {
  // res.set("Set-Cookie",`name=Prashant ${new Date().toLocaleTimeString()} httpOnly; SameSite=None; Secure`)

  res.cookie('age', '25', {
    httpOnly: true,
    sameSite: 'None',
    secure: true
  })
  res.json({ message: 'Hello World!' })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
