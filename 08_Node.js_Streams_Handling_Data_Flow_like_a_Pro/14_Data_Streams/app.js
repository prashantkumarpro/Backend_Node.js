import fs from 'fs'
import { spawn } from 'child_process'
// Readable stream
// console.log(process.stdin)

// Writable stream
// console.log(process.stdout)
// console.log(process.stderr)

// console.log('hi')
// process.stdout.write("hii\n")

// process.stdin.on('data', chunk => {
//   console.log('Data recieved:', chunk.toString())

// const writeStream = fs.createWriteStream('output.txt')

// process.stdin.on("data", (chunk)=>{
//     writeStream.write(chunk)
// })

// process.stdin.pipe(writeStream)
// process.stderr.write('Hii')

// console.log(process.stdin.fd) // 0
// console.log(process.stdout.fd) // 1
// console.log(process.stderr.fd) // 2

// const childProcess = spawn('cat', ['output.txt'])
// childProcess.stdout.on('data', chunk => {
//   console.log(chunk.toString())
// })
const childProcess = spawn('node', ['childApp.js'])
childProcess.stdout.on('data', chunk => {
  console.log(chunk.toString())
})

childProcess.stdin.write("hiii!!")