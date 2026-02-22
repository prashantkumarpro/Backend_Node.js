## Serving Static Files using Express.js

When you build a web app using **Express**, you often need to serve:

* HTML files
* CSS files
* JavaScript files
* Images
* Fonts

Express provides a built-in middleware called **`express.static()`** to serve these files easily.

---

## 1️⃣ What is Static File?

A **static file** is a file that does NOT change on the server before sending to the client.

Examples:

* `style.css`
* `script.js`
* `logo.png`
* `index.html`

These files are directly sent to the browser.

---

## 2️⃣ How Express Serves Static Files

Express uses:

```js
express.static(rootFolder)
```

This is a **built-in middleware function**.

Internally, Express uses the `serve-static` package to handle this.

---

## 3️⃣ Basic Folder Structure

```
my-app/
│
├── app.js
├── public/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── images/
│       └── logo.png
```

---

## 4️⃣ Basic Example

### Step 1: Install Express

```bash
npm install express
```

---

### Step 2: Setup Server (`app.js`)

```js
const express = require('express');
const path = require('path');

const app = express();

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

### Step 3: Access in Browser

If you open:

```
http://localhost:3000/index.html
```

It will automatically serve:

* `index.html`
* `style.css`
* `script.js`
* images

---

## 5️⃣ How It Works Internally (Step-by-Step Flow)

Let’s say user visits:

```
http://localhost:3000/style.css
```

### Step-by-step:

1. Request hits Express.
2. Express checks middleware stack.
3. `express.static()` middleware runs.
4. It looks inside `public` folder.
5. If file exists → send file.
6. If not → call `next()`

So static middleware works like:

```js
if (fileExists) {
  sendFile()
} else {
  next()
}
```

---

## 6️⃣ Serving Static Files with Virtual Path Prefix

You can also add a prefix.

```js
app.use('/static', express.static('public'));
```

Now files are accessed like:

```
http://localhost:3000/static/index.html
```

But actual folder is still `public`.

---

## 7️⃣ Multiple Static Folders

You can serve multiple folders:

```js
app.use(express.static('public'));
app.use(express.static('uploads'));
```

Express will check in order.

---

## 8️⃣ Best Practice (Production Ready Setup)

Use `path.join()` to avoid OS issues:

```js
app.use(express.static(path.join(__dirname, 'public')));
```

---

## 9️⃣ Real-World Example (Frontend + Backend)

If you build:

* React build folder → `build/`
* Express backend → `server.js`

You can serve React build like:

```js
app.use(express.static(path.join(__dirname, 'build')));
```

---

# 🔥 Important Interview Points

* `express.static()` is middleware.
* It serves files directly without writing routes.
* Order of middleware matters.
* If file not found → it calls `next()`.

---

# 💡 Advanced: Set Static Options

```js
app.use(express.static('public', {
  maxAge: '1d',
  extensions: ['html']
}));
```

### Options:

* `maxAge` → cache time
* `extensions` → automatically add extension
* `index` → default file (`index.html`)

---

# 🧠 Quick Summary

| Concept          | Meaning                      |
| ---------------- | ---------------------------- |
| Static file      | File sent directly to client |
| express.static   | Built-in middleware          |
| Virtual path     | URL prefix                   |
| Middleware order | Important                    |

---

If you want, next we can learn:

* How Express internally resolves static files
* How caching works
* How to serve uploads folder
* Difference between `res.sendFile()` vs `express.static()`
* How to secure static files

Tell me what you want next 🚀
