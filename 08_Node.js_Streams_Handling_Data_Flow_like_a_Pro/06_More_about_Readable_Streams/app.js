import fs from 'fs'

const readStream = fs.createReadStream('chars.txt', { highWaterMark: 4 })
readStream.setEncoding('utf-8')

// readStream.setEncoding('utf-8')
// readStream.on('data', chunk => {
//   console.log(chunk)
//   readStream.destroy("err")
// })



// readStream.on('close', () => {
//   console.log('closed')
// })

// readStream.on('end', () => {
//   console.log('end')
// })


// readStream.on("error", (err)=>{
//   console.log(err)
// })

readStream.on("open", ()=>{
  console.log('opend')
})