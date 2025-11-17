# ArrayBuffer in JavaScript (In Depth)

## 🔹 1. What is `ArrayBuffer`?

-   `ArrayBuffer` is a **fixed-length raw binary data container** in
    JavaScript.\
-   It does **not store numbers, strings, or objects directly**; it just
    stores **bytes (0--255 values)**.\
-   Think of it as a **box of memory** where each slot is **1 byte (8
    bits)**.

👉 Analogy:\
Imagine a **chocolate tray** with fixed slots. Each slot can hold
exactly **1 chocolate (1 byte)**. You can't change the number of slots
after creating it.

------------------------------------------------------------------------

## 🔹 2. Why do we need `ArrayBuffer`?

JavaScript normally works with high-level data types (strings, objects,
arrays). But sometimes we need **low-level binary data** when working
with: - **Files** (images, audio, video) - **Networking** (WebSockets,
WebRTC) - **Web APIs** (fetching binary data, e.g., PDF, ZIP) -
**Cryptography** (hashing, encryption needs bytes) - **Graphics (WebGL,
Canvas)** → needs fast memory buffers

So, `ArrayBuffer` lets JavaScript talk in the **language of raw
memory**.

------------------------------------------------------------------------

## 🔹 3. Creating an `ArrayBuffer`

``` js
// Create a buffer of 16 bytes
let buffer = new ArrayBuffer(16);

console.log(buffer.byteLength); // 16
```

👉 You just created **16 slots of memory**, each slot = 1 byte.

------------------------------------------------------------------------

## 🔹 4. Problem: How do we put/read data inside `ArrayBuffer`?

-   `ArrayBuffer` alone is like a box of chocolates but without labels.\
-   To actually **read/write** the bytes, we need a **view**.

That's where **Typed Arrays** and **DataView** come in.

------------------------------------------------------------------------

## 🔹 5. Typed Arrays (Fixed Data Views)

Typed arrays let you treat the buffer as an array of a specific data
type:

``` js
let buffer = new ArrayBuffer(8);

// View buffer as 32-bit integers (4 bytes each)
let int32View = new Int32Array(buffer);

int32View[0] = 42;
int32View[1] = 100;

console.log(int32View); // Int32Array(2) [42, 100]
```

👉 The buffer is **8 bytes**. Each `Int32` = **4 bytes**. So only 2
integers fit.

------------------------------------------------------------------------

## 🔹 6. DataView (Flexible Data Access)

If you want more control (e.g., different types at different positions,
or handling **endianness**), use `DataView`.

``` js
let buffer = new ArrayBuffer(8);
let view = new DataView(buffer);

// Store a 32-bit integer at byte 0
view.setInt32(0, 12345);

// Store a 16-bit integer at byte 4
view.setInt16(4, 300);

// Read them back
console.log(view.getInt32(0)); // 12345
console.log(view.getInt16(4)); // 300
```

👉 `DataView` = precise control over bytes.

------------------------------------------------------------------------

## 🔹 7. Real-World Uses of `ArrayBuffer`

### ✅ Example 1: Fetching an Image as Binary

``` js
fetch("cat.png")
  .then(res => res.arrayBuffer())
  .then(buffer => {
    console.log(buffer.byteLength); // size of file in bytes
  });
```

👉 Browser downloads `cat.png` as **raw bytes**.

------------------------------------------------------------------------

### ✅ Example 2: Converting String → ArrayBuffer

``` js
function stringToArrayBuffer(str) {
  let buf = new ArrayBuffer(str.length);
  let bufView = new Uint8Array(buf);
  for (let i = 0; i < str.length; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

let buffer = stringToArrayBuffer("Hi");
console.log(new Uint8Array(buffer)); // Uint8Array(2) [72, 105]
```

👉 Each character stored as ASCII codes (`H=72`, `i=105`).

------------------------------------------------------------------------

### ✅ Example 3: WebSockets (sending binary data)

``` js
let socket = new WebSocket("wss://example.com");
socket.binaryType = "arraybuffer";

socket.onopen = () => {
  let buffer = new ArrayBuffer(4);
  new Uint32Array(buffer)[0] = 12345;
  socket.send(buffer);
};
```

👉 Send raw bytes instead of JSON (faster, smaller).

------------------------------------------------------------------------

### ✅ Example 4: Cryptography (SHA hashing)

``` js
let data = new TextEncoder().encode("hello"); // Uint8Array
crypto.subtle.digest("SHA-256", data)
  .then(hashBuffer => {
    console.log(new Uint8Array(hashBuffer));
  });
```

👉 Cryptography APIs always work with `ArrayBuffer`.

------------------------------------------------------------------------

## 🔹 8. Summary (So You Can Teach)

-   `ArrayBuffer` = raw memory box (fixed length, bytes only).\
-   Alone, it's useless. Needs a **view**.\
-   Views:
    -   **Typed Arrays** (easy, fixed type arrays: Int8, Uint16,
        Float64, etc.)
    -   **DataView** (flexible, precise control of types and byte
        order)\
-   Used in **files, networking, cryptography, graphics**.

------------------------------------------------------------------------

👉 Teaching Analogy:\
1. Imagine a **box of chocolates** (ArrayBuffer).\
2. You need **labels** to know what's inside (Typed Arrays/DataView).\
3. Use it whenever working with **binary data** (files, network,
crypto).
