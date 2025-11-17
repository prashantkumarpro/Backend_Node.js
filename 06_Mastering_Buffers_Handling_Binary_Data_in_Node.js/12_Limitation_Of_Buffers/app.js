import fs from "fs/promises"

const a = await fs.readFile("C:\\Users\\HP\\Desktop\\Prashant\\DSA\\01 - DSA with JavaScript ｜ Introduction & Roadmap for Beginners.mp4")

const b = await fs.readFile("C:\\Users\\HP\\Desktop\\Prashant\\DSA\\02 - The Biggest Mistake in DSA Learning! (Fix It Now).mp4")
const c = await fs.readFile("C:\\Users\\HP\\Desktop\\Prashant\\DSA\\03 - Master the Basics ｜ DSA with JavaScript ｜ Part 1.mp4")

console.log(a.byteLength)
console.log(b.byteLength)
console.log(c.byteLength)

console.log("End")