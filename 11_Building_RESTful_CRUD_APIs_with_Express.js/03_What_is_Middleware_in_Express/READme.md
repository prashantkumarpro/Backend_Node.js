# 🚀 What is Middleware in Express?

In **Express.js**, **Middleware** is a function that runs **between the request and the response**.

👉 It has access to:

* `req` (request object)
* `res` (response object)
* `next` (a function to move to the next middleware)

### Basic Structure:

```js
function middlewareName(req, res, next) {
  // Do something
  next(); // move to next middleware
}
```

Think of middleware like a **security guard or checkpoint** 🛂
Before the request reaches the final route, it passes through different checkpoints.

---

# 🧠 Why Middleware is Powerful?

Because you can:

* Check authentication
* Validate data
* Log requests
* Parse JSON
* Handle errors
* Modify request/response

---

# 🔥 Types of Middleware in Express

There are **5 main types**:

---

# 1️⃣ Application-Level Middleware

Middleware applied to the entire app.

```js
import express from 'express'
const app = express()

app.use((req, res, next) => {
  console.log("Request received")
  next()
})
```

✅ Runs for every request.

You can also apply it to specific routes:

```js
app.use('/user', (req, res, next) => {
  console.log("User route accessed")
  next()
})
```

---

# 2️⃣ Router-Level Middleware

Used with `express.Router()`.

```js
import express from 'express'
const router = express.Router()

router.use((req, res, next) => {
  console.log("Router middleware")
  next()
})

router.get('/', (req, res) => {
  res.send("Home route")
})

app.use('/api', router)
```

👉 Only runs for `/api` routes.

---

# 3️⃣ Built-in Middleware

Express provides some built-in middleware functions.

### `express.json()`

Parses JSON body.

```js
app.use(express.json())
```

### `express.urlencoded()`

Parses form data.

```js
app.use(express.urlencoded({ extended: true }))
```

Without these, `req.body` will be `undefined`.

---

# 4️⃣ Third-Party Middleware

External packages installed via npm.

Example:

### 📦 morgan

Used for logging HTTP requests.

```bash
npm install morgan
```

```js
import morgan from 'morgan'
app.use(morgan('dev'))
```

---

### 📦 cors

Used to allow cross-origin requests.

```bash
npm install cors
```

```js
import cors from 'cors'
app.use(cors())
```

---

# 5️⃣ Error-Handling Middleware (Very Important ⚠️)

Special middleware with **4 parameters**:

```js
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send("Something broke!")
})
```

👉 Must have 4 arguments: `(err, req, res, next)`
Otherwise Express won’t recognize it as error middleware.

---

# 🔥 Middleware Flow Example

```js
app.use((req, res, next) => {
  console.log("1st middleware")
  next()
})

app.get('/', (req, res) => {
  res.send("Final Response")
})
```

Flow:

```
Client Request
   ↓
Middleware
   ↓
Route Handler
   ↓
Response
```

---

# 🧩 Real-World Example (Authentication Middleware)

```js
function checkAuth(req, res, next) {
  if (req.headers.authorization) {
    next()
  } else {
    res.status(401).send("Unauthorized")
  }
}

app.get('/dashboard', checkAuth, (req, res) => {
  res.send("Welcome to dashboard")
})
```

👉 Middleware runs before the route.

---

# 🎯 Important Interview Points

* Middleware runs in order of definition.
* If you don’t call `next()`, request will hang.
* Error middleware must have 4 parameters.
* `app.use()` applies middleware globally.
* You can pass multiple middleware functions in a route.

Example:

```js
app.get('/user', middleware1, middleware2, (req, res) => {
  res.send("Done")
})
```

---

# 💪 Quick Revision Summary

| Type              | Purpose                  |
| ----------------- | ------------------------ |
| Application-Level | Runs for whole app       |
| Router-Level      | Runs for specific router |
| Built-in          | Provided by Express      |
| Third-party       | Installed via npm        |
| Error-handling    | Handles errors           |

---


