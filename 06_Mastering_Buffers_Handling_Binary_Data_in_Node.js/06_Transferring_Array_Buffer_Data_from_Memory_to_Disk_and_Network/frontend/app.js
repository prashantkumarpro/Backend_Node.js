// fetch('http://localhost:3000')
//   .then(res => res.text())
//   .then((data)=>{
//     console.log(data)
//   })

fetch('http://localhost:3000')
  .then(res => res.arrayBuffer())
  .then(data => {
    // console.log(data)
    // const uint8Array = new Uint8Array(data)
    // const decoder = new TextDecoder('utf-8')
    // console.log(decoder.decode(uint8Array))
  })
