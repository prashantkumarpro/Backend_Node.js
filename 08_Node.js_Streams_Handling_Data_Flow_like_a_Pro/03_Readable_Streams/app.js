// import fs from 'fs/promises'
import fs from 'fs'

// const fileBuff = await fs.readFile('chars.txt');
// const fileBuff = await fs.readFile("C:\\Users\\HP\\Desktop\\Nikita.Roy.mkv");

console.time()
const readStream = fs.createReadStream(
  'C:\\Users\\HP\\Desktop\\Nikita.Roy.mkv',
  { highWaterMark: 1 * 1024 * 1024 }
)

let readCount=0;
readStream.on('data', chunkBuffer => {
  fs.appendFileSync('base.mkv', chunkBuffer)
  console.log(chunkBuffer.byteLength);
  
  readCount++;
})

readStream.on('end', () => {
  console.timeEnd()
  console.log({readCount})
}) // time : 8.289s, readCount : 2239 

// const readStream = fs.createReadStream('chars.txt', {
//   highWaterMark: 16
// })
// let readCount = 0;
// readStream.on('data', (chunk)=>{
//   // console.log(chunk.byteLength)
//   readCount++;
// })
// readStream.on('end', ()=>{
//   console.log(readCount);

// })

// console.log(fileBuff.byteLength)
// console.log(fileBuff.toString());

// The task is to rendring progress in % on reading chunk 
// 5%, 10%, 15%, ........... 100% finished 