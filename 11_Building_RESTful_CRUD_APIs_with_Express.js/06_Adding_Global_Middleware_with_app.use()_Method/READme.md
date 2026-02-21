## 🚀 Adding Global Middleware with `app.use()` in Express.js

In Express, **global middleware** means middleware that runs for **every incoming request** — no matter which route is called.

We use:

```js
app.use()
```

---

## 🧠 What is Global Middleware?

Global middleware:

* Runs for **all routes**
* Executes **before route handlers**
* Used for:

  * Logging
  * Authentication
  * Parsing data
  * Error handling
  * Security checks

---

## 📌 Basic Example

```js
const express = require('express');
const app = express();

// Global Middleware
app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next(); // move to next middleware or route
});

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000);
```

### 🔎 What Happens?

When you open:

```
http://localhost:3000/
```

Flow:

1. Middleware runs → logs request
2. `next()` passes control
3. Route handler runs
4. Response sent

---

## 📊 How Request Flow Works

```
Client Request
      ↓
Global Middleware (app.use)
      ↓
Route Handler (app.get/post/etc)
      ↓
Response
```

---

## 🎯 Why `next()` is Important?

If you don't call `next()`:

* The request **will hang**
* Route will never execute
* Browser keeps loading

Example ❌ (Wrong):

```js
app.use((req, res, next) => {
  console.log('Hello');
  // next() missing
});
```

---

## 📁 Best Practice: Separate Middleware Folder

Since you're building Express projects, professional structure should be:

```
project/
│
├── app.js
├── routes/
├── middleware/
│     └── logger.js
```

---

### 🔹 middleware/logger.js

```js
const logger = (req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
};

module.exports = logger;
```

---

### 🔹 app.js

```js
const express = require('express');
const logger = require('./middleware/logger');

const app = express();

// Global Middleware
app.use(logger);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(3000);
```

---

## 🎯 Global Middleware With Path

You can also apply middleware to a specific base path:

```js
app.use('/api', (req, res, next) => {
  console.log('API middleware');
  next();
});
```

Now it runs only for:

```
/api/users
/api/products
```

---

## 🔥 Multiple Global Middlewares

```js
app.use(express.json()); // built-in middleware
app.use(logger);         // custom middleware
app.use(authMiddleware); // another custom middleware
```

They execute **in order**.

---

## 🧠 Real-World Example (Authentication)

```js
app.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }
  next();
});
```

Now all routes are protected.

---

## 💡 Important Interview Point

Difference between:

```js
app.use()
```

and

```js
app.get()
```

| app.use()                | app.get()               |
| ------------------------ | ----------------------- |
| Handles all HTTP methods | Only GET requests       |
| Used for middleware      | Used for route handling |
| Runs before routes       | Handles specific route  |

---

## 🏆 As a Developer (Important for You)

Since you're learning backend deeply:

👉 Understand this clearly:

* Express works on **middleware chain system**
* Everything is middleware internally
* Order of middleware matters

---

If you want, next I can explain:

* 🔥 How Express handles middleware internally (deep dive)
* 🔥 How to create error-handling global middleware
* 🔥 How to handle async middleware properly
* 🔥 Build a professional Express structure step-by-step
