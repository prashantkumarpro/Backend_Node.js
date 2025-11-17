const a = new ArrayBuffer(4)
const view = new DataView(a)

view.setInt8(0, 0xff)
view.setInt8(1, 127)
// view.setInt8(2, 0b01010000)
// view.setInt8(3, 0o120)



// console.log(a);
// getInt8 Reads value as signed
console.log(view.getInt8(0)); // -1

// getUint8 Reads value as unsigned
console.log(view.getUint8(0)); // 255

 