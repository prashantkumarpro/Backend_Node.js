## 🔎 Understanding Preflight Request (CORS)

Since you’re learning Express deeply, this topic is **very important for backend + frontend integration**, especially when your React app calls your Express API.

---

## 🌍 What is a Preflight Request?

A **Preflight Request** is a special **HTTP `OPTIONS` request** sent by the browser **before the actual request**, to check whether the server allows the real request.

It is part of **CORS (Cross-Origin Resource Sharing)** security.

---

## 🧠 Why Does It Happen?

When:

* Frontend runs on → `http://localhost:5173` (React / Vite)
* Backend runs on → `http://localhost:3000` (Express)

These are **different origins** (different ports = different origin).

So the browser asks:

> “Hey server, before I send POST/PUT/DELETE request, do you allow this cross-origin request?”

That checking request = **Preflight Request**

---

## 📦 When Does Preflight Happen?

Preflight happens when:

1. Method is NOT simple:

   * `PUT`
   * `DELETE`
   * `PATCH`
   * Custom methods

2. OR Headers are NOT simple:

   * `Authorization`
   * `Content-Type: application/json`
   * Custom headers

3. OR Credentials are included

---

## 🔁 Flow of Preflight Request (Step-by-Step)

```
Frontend → Browser sends OPTIONS request
Browser → Checks server CORS headers
If allowed → Browser sends actual request (POST/PUT/etc)
If not allowed → Browser blocks request
```

---

## 📡 Example

### Frontend Code (React)

```js
fetch("http://localhost:3000/api/user", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "Prashant" }),
});
```

Because:

* Method = POST
* Content-Type = application/json

Browser sends:

```
OPTIONS /api/user
```

Before actual POST request.

---

## 🛠️ How to Handle Preflight in Express

### ✅ Method 1: Use `cors` Package (Recommended)

```bash
npm install cors
```

```js
import express from "express";
import cors from "cors";

const app = express();

app.use(cors()); // Automatically handles preflight

app.listen(3000);
```

This automatically:

* Handles OPTIONS requests
* Sets correct CORS headers

---

### ✅ Method 2: Manual Handling

```js
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.sendStatus(200);
});
```

---

## 📌 Important CORS Headers

| Header                           | Purpose                 |
| -------------------------------- | ----------------------- |
| Access-Control-Allow-Origin      | Which origin is allowed |
| Access-Control-Allow-Methods     | Allowed HTTP methods    |
| Access-Control-Allow-Headers     | Allowed headers         |
| Access-Control-Allow-Credentials | Allow cookies           |

---

## 🔥 Interview Level Understanding

### ❓ Why doesn't browser send preflight for GET?

Because:

* GET is a **simple request**
* No complex headers

### ❓ Does Postman send preflight?

❌ No.

Preflight is a **browser security feature**.
Postman does not care about CORS.

---

## 🎯 Real-World Example (Your Projects)

If you build:

* React frontend (Vite)
* Express backend

Without CORS setup → Browser error:

```
Access to fetch at 'http://localhost:3000'
from origin 'http://localhost:5173'
has been blocked by CORS policy
```

Because preflight failed.

---

## 💡 Deep Backend Insight (Important for You)

Internally:

1. Browser sends:

   ```
   OPTIONS /api/user
   Origin: http://localhost:5173
   Access-Control-Request-Method: POST
   Access-Control-Request-Headers: content-type
   ```

2. Server must reply:

   ```
   Access-Control-Allow-Origin: http://localhost:5173
   Access-Control-Allow-Methods: POST
   Access-Control-Allow-Headers: content-type
   ```

Then browser allows actual request.

---

## 🏆 Summary

* Preflight = Browser safety check
* It is an `OPTIONS` request
* Happens before complex cross-origin requests
* Must respond with correct CORS headers
* Best practice → use `cors` middleware

---

If you want, next we can:

* 🔬 See how Express internally handles OPTIONS
* 🧠 Build CORS middleware from scratch
* 🚀 See how preflight works with cookies & JWT

Tell me what level you want — basic, intermediate, or deep internal.
