import fs from 'fs/promises'

// base64
// btoa()
// const bufferContent = await fs.readFile('favicon/favicon-16x16.png')

// const a = bufferContent.toString('base64')

// fs.writeFile('new-file.txt', a)

// // atob()
// const bufferContent = await fs.readFile('new-file.txt')
// const a = bufferContent.toString('utf-8')
// fs.writeFile('a.png', a, 'base64')

// btoa()
// const bufferContent = await fs.readFile('javascript.txt')

// const a = bufferContent.toString('base64')

// fs.writeFile('script.txt', a)

// atob
// const bufferContent = await fs.readFile('script.txt')
// const a = bufferContent.toString('utf-8')
// fs.writeFile('javascript.txt', a, 'base64')

// for video
// btoa
// const videoBuffer = await fs.readFile('video.mp4');
// const videoBase64 = videoBuffer.toString('base64');
// fs.writeFile('video.text', videoBase64)

// atob
// const videoBuffer = await fs.readFile('video.text')
// const videoBase64 = videoBuffer.toString('utf-8')
// fs.writeFile('video1.mp4', videoBase64, 'base64')

// btoa
// const audioBuffer = await fs.readFile('audio.mp3');
// const audioBase64 = audioBuffer.toString('base64');
// fs.writeFile('audio.text', audioBase64)

// atob
// const audioBuffer = await fs.readFile('audio.text');
// const audioBase64 = audioBuffer.toString('utf-8');
// fs.writeFile('audio1.mp3', audioBase64, 'base64')

const cssBuffer = await fs.readFile('index.css')
const cssBase64 = cssBuffer.toString('base64')
fs.writeFile('css.txt', cssBase64)

// const bufferContent = await fs.readFile('file.txt')

// const a = bufferContent.toString('base64url')
// fs.writeFile('file.txt2', a) // it removes padding (=)

// it replace +/ with -_
