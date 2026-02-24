## 📁 12 – Handling File Uploads in Express

When building real-world apps (like your Pinterest clone or any full-stack project), you’ll often need users to upload:

* Profile images
* PDFs
* Videos
* Product images
* Resume files

In **Express.js**, handling file uploads requires middleware because Express **cannot parse `multipart/form-data` by default**.

---

# 🚀 Step 1: Install Required Package

We use:

## 📦 Multer

Multer is a middleware for handling `multipart/form-data`.

```bash
npm install multer
```

---

# 🧠 How File Upload Works (Behind the Scenes)

When a user uploads a file:

1. Browser sends form with `enctype="multipart/form-data"`
2. Express receives raw stream
3. Multer intercepts request
4. Multer parses file
5. File is stored:

   * On disk
   * Or in memory
6. File info becomes available in:

   * `req.file` (single)
   * `req.files` (multiple)

---

# 🛠 Step 2: Basic Single File Upload Example

### 📂 Folder Structure

```
12_Handling_File_Uploads_in_Express
│
├── app.js
├── uploads/
└── views/
```

---

## 🧾 app.js

```js
const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()

// Storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

// Form Route
app.get('/', (req, res) => {
  res.send(`
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="myfile" />
      <button type="submit">Upload</button>
    </form>
  `)
})

// Upload Route
app.post('/upload', upload.single('myfile'), (req, res) => {
  console.log(req.file)
  res.send('File Uploaded Successfully')
})

app.listen(3000)
```

---

# 🔍 Understanding Important Parts

### 1️⃣ `multer.diskStorage()`

Controls:

* Where file is saved
* What file name will be

---

### 2️⃣ `upload.single('myfile')`

Middleware that:

* Accepts single file
* Field name must match HTML input name

---

# 📂 After Upload

Uploaded file appears inside:

```
uploads/
   1708765432.jpg
```

---

# 🖼 Example Flow

![Image](https://nerdy-form.com/img/blog/mceclip0-6426d47314999.jpg)

![Image](https://vld-bc.com/uploads/cover_0aec23a4bf.png)

![Image](https://static.afteracademy.com/images/file-uploads-in-node-js-with-express-and-multer-postman-output1-cc6ec3fa7c2c7527.png)

![Image](https://miro.medium.com/1%2AhVd4Nbviz8rs1S7swOq0zg.jpeg)

---

# 📌 Multiple File Upload

```js
app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  console.log(req.files)
  res.send('Multiple files uploaded')
})
```

---

# 📌 Upload Fields (Different Input Names)

```js
app.post('/upload-fields',
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 5 }
  ]),
  (req, res) => {
    console.log(req.files)
    res.send('Files uploaded')
  }
)
```

---

# 🛡 File Type Filtering (Very Important for Security)

```js
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only images allowed'), false)
    }
  }
})
```

---

# 📏 File Size Limit

```js
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB
})
```

---

# ⚠️ Common Errors

| Error                               | Reason              |
| ----------------------------------- | ------------------- |
| `req.file undefined`                | Field name mismatch |
| `Unexpected field`                  | Wrong upload method |
| `Cannot read property of undefined` | Missing middleware  |

---

# 🧠 Internal Flow in Express (Advanced)

1. Client sends POST request
2. Express creates req/res objects
3. Multer middleware runs first
4. Multer reads stream
5. Stores file
6. Calls `next()`
7. Route handler runs

This is similar to how you learned middleware execution internally.

---

# 💡 Real Project Usage

In your:

* Pinterest clone → Upload images
* Movies4U → Upload movie posters
* himPrash Web Solution → Upload client logos
* Resume Builder → Upload PDFs

---

# 🏆 Interview Question

👉 Why can't Express handle file uploads without Multer?

Answer:
Because Express does not parse `multipart/form-data`. It only parses JSON and URL-encoded data using built-in middleware.

---

If you want next level:

* Upload to Cloudinary
* Store file path in MongoDB
* Use streaming instead of disk storage
* Handle file delete
* Build real mini project

Tell me — do you want:

1. Cloud upload version?
2. MongoDB integration?
3. Full production-level architecture explanation?

We’ll go deep step-by-step.
