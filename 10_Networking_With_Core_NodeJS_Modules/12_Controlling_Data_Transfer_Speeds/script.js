const res = await fetch('http://10.113.0.211:4000')

console.log(res.body)

for await (const chunk of res.body) {
  console.log(chunk)
}
