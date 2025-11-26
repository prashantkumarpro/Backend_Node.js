import fs from 'fs'

const fd = fs.openSync('text.txt', 'w+') // w => write mode
// const fd = fs.openSync('text.txt', 'w') // r => read mode
// const fd = fs.openSync('text.txt', 'w') // a => append mode

// w+ => write and read mode 
// r+ => read and wirte mode 
// a+ => read and wirte mode 
fs.writeSync(fd, "Hii")
