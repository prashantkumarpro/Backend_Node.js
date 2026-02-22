## Adding Route-Specific Middleware in Express

In **Express.js**, you can attach middleware to a **specific route** instead of applying it globally. This means the middleware will run **only for that route**, not for every request.

---

## 1️⃣ Basic Example – Route-Specific Middleware

```js
const express = require('express');
const app = express();

// Route-specific middleware
function checkAuth(req, res, next) {
  console.log("Auth middleware executed");
  next();
}

app.get('/dashboard', checkAuth, (req, res) => {
  res.send("Welcome to Dashboard");
});

app.listen(3000);
```

### 🔎 What Happens Here?

When user visits:

```
GET /dashboard
```

Execution flow:

1. `checkAuth` middleware runs first
2. If `next()` is called → route handler runs
3. Response is sent

If user visits:

```
GET /about
```

👉 `checkAuth` will NOT run.

---

## 2️⃣ Multiple Route-Specific Middlewares

You can pass multiple middleware functions:

```js
app.get(
  '/profile',
  checkAuth,
  logRequest,
  (req, res) => {
    res.send("User Profile");
  }
);
```

Or using array:

```js
app.get('/profile', [checkAuth, logRequest], (req, res) => {
  res.send("User Profile");
});
```

Execution order:

```
checkAuth → logRequest → route handler
```

Order matters ⚡

---

## 3️⃣ Route-Specific Middleware Using Router (Best Practice)

In real projects (like your Express + Mongoose + EJS projects), we organize routes separately.

### 📁 Project Structure

```
project/
│
├── middleware/
│   └── auth.js
│
├── routes/
│   └── user.js
│
└── app.js
```

---

### middleware/auth.js

```js
function checkAuth(req, res, next) {
  console.log("Checking authentication...");
  next();
}

module.exports = checkAuth;
```

---

### routes/user.js

```js
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth');

router.get('/dashboard', checkAuth, (req, res) => {
  res.send("User Dashboard");
});

module.exports = router;
```

---

### app.js

```js
const express = require('express');
const app = express();
const userRoutes = require('./routes/user');

app.use('/user', userRoutes);

app.listen(3000);
```

Now the final route becomes:

```
GET /user/dashboard
```

And only this route uses `checkAuth`.

---

## 4️⃣ Real-World Example (Authentication Protection)

Example: Protect admin route

```js
function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).send("Access Denied");
  }
}

app.get('/admin', isAdmin, (req, res) => {
  res.send("Admin Panel");
});
```

---

## 5️⃣ Difference: Global vs Route Middleware

| Type              | Applied Using                  | Runs On              |
| ----------------- | ------------------------------ | -------------------- |
| Global Middleware | `app.use()`                    | Every request        |
| Route Middleware  | `app.get('/path', middleware)` | Specific route only  |
| Router Middleware | `router.use()`                 | Specific route group |

---

## 🔥 Interview Question

**Q: What is the difference between app.use() and route-specific middleware?**

Answer:

* `app.use()` applies middleware globally or to a path prefix.
* Route-specific middleware runs only for that specific HTTP method and route.

---

