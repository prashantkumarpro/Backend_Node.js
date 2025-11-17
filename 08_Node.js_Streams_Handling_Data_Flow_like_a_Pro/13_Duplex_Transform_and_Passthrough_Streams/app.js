import fs from 'fs'
import { pipeline } from 'stream'
// console.time()
// const readStream = fs.createReadStream(
//   'C:\\Users\\HP\\Downloads\\Rewind.2024.720p.HD.mkv',
//   { highWaterMark: 1 * 1024 * 1024 }
// )

// const writeStream = fs.createWriteStream('stream.mkv', {
//   highWaterMark: 1 * 1024 * 1024
// })

// readStream.pipe(writeStream)

// readStream.on("error",(err)=>{
//   console.log(err)
// })

// pipeline(readStream, writeStream, err => {
//   console.log(err)
// })

// setTimeout(() => {
//   readStream.destroy("Khatam")
// }, 1000)

// setInterval(() => {
//   console.log('hi')
// }, 200);

// process.stdout.write('Type something: ')

// process.stdin.on('data', data => {
//   const text = data.toString().trim()
//   const words = text.split(' ').filter(Boolean).length
//   process.stdout.write(`Word count: ${words}\n`)
//   process.exit()
// })

const secret = Math.floor(Math.random() * 10) + 1;
process.stdout.write("Guess a number (1-10): ");

process.stdin.on("data", (data) => {
  const guess = Number(data.toString().trim());
  if (guess === secret) {
    process.stdout.write("🎉 Correct!\n");
    process.exit();
  } else {
    process.stdout.write("❌ Try again: ");
  }
});
