import fs from 'fs'

const writeStream = fs.createWriteStream('output.txt')
process.stdin.on('data', chunk => {
  writeStream.write(chunk)
})
console.log('Child Apps')
