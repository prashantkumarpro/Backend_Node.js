import fsPromises from 'fs/promises'
import fs from 'fs'
import { error, log } from 'console'

setTimeout(() => {
  console.log('hi')
}, 0) // setTimeout is ayncronous 

// Async I/O (Input/Output)
// const fileContent = await fsPromises.readFile("file.txt", "utf-8");
// console.log(fileContent)

// Async I/O (Input/Output)
//  fs.readFile("file.txt", "utf-8", (error, data)=>{
//     console.log(data)
//  });

// sync I/O (Input/Output)
const fileContent = fs.readFileSync('file.txt', 'utf-8');
console.log(fileContent);


