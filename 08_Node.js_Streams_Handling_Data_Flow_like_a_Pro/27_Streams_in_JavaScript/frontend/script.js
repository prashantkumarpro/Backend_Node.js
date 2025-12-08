// const input = document.querySelector('input')

// const decoder = new TextDecoder()

// input.addEventListener('change', async () => {
//   const file = input.files[0]
//   // const str = await file.text()
//   // console.log(str)

//   const readStream = file.stream()
//   const reader = readStream.getReader()

//   // const result = await reader.read()
//   // console.log(decoder.decode(result.value))

//   // const result2 = await reader.read()
//   // console.log(decode.decode(result2.value))
//   // const result3 = await reader.read()
//   // console.log(decode.decode(result3.value))
//   // const result4 = await reader.read()
//   // console.log(decode.decode(result4.value))
//   // const result5 = await reader.read()
//   // console.log(decode.decode(result5.value))
//   // const result6 = await reader.read()
//   // console.log(decode.decode(result6.value))

//   // while (true) {
//   //   const { done, value } = await reader.read()
//   //   if (done) break
//   //   console.log(decoder.decode(value))
//   // }

//   // for await (const chunk of readStream) {
//   //   console.log(chunk)
//   // }

// })
console.time()

const decoder = new TextDecoder()
const imgDecoder = new ImageDecoder({type:'image/webp', data:'null'})

const response = await fetch('http://localhost:4000/')
// const data = await response.text()

let i = 0

for await (const chunk of response.body) {
  i++

  console.log(decoder.decode(chunk))
  if (i === 1) console.timeEnd()
}
