## 🚀 Dynamic Routing in Express.js

Dynamic routing in **Express.js** allows you to create routes with **dynamic parameters** (variables in the URL). These parameters help you handle different requests using a single route.

Instead of creating multiple routes like:

```js
app.get('/user/1', ...)
app.get('/user/2', ...)
app.get('/user/3', ...)
```

We use **dynamic route parameters** 👇

```js
app.get('/user/:id', (req, res) => {
  res.send(`User ID is ${req.params.id}`)
})
```

---

# 📌 1️⃣ What is Dynamic Routing?

Dynamic routing means defining a route that contains a **parameter (variable)** in the URL.

### Example URL:

```
/user/101
/user/202
/user/303
```

Here, `101`, `202`, `303` are dynamic values.

---

# 🧠 2️⃣ How It Works Internally (Step-by-Step)

When a request comes:

1. Express matches `/user/:id`
2. It extracts the dynamic value
3. Stores it inside `req.params`
4. Passes it to your route handler

Example:

```js
app.get('/user/:id', (req, res) => {
  console.log(req.params)   // { id: '101' }
  res.send(`User ID: ${req.params.id}`)
})
```

If user visits:

```
http://localhost:3000/user/101
```

Output:

```
User ID: 101
```

---

# 📦 3️⃣ Real Project Example (Like Your Pinterest Clone Idea)

Imagine you're building a Pinterest clone using Express + MongoDB.

### 🔹 Route for single post

```js
app.get('/post/:postId', async (req, res) => {
  const postId = req.params.postId
  const post = await Post.findById(postId)
  res.json(post)
})
```

URL:

```
/post/65ab321cdf
```

This fetches that specific post.

---

# 🔥 4️⃣ Multiple Dynamic Parameters

You can add more than one parameter.

```js
app.get('/user/:userId/post/:postId', (req, res) => {
  res.json(req.params)
})
```

URL:

```
/user/10/post/200
```

Output:

```json
{
  "userId": "10",
  "postId": "200"
}
```

---

# 🎯 5️⃣ Route Parameters vs Query Parameters

### 🔹 Route Parameter

```
/user/10
```

Access:

```js
req.params.userId
```

### 🔹 Query Parameter

```
/user?name=prashant&age=22
```

Access:

```js
req.query.name
req.query.age
```

---

# ⚡ 6️⃣ Optional Route Parameters

You can make parameters optional using `?`

```js
app.get('/profile/:username?', (req, res) => {
  res.send(req.params.username || "Guest User")
})
```

If:

```
/profile/prashant → prashant
/profile → Guest User
```

---

# 🧩 7️⃣ Route Parameter Validation (Best Practice)

```js
app.get('/user/:id', (req, res) => {
  const id = req.params.id

  if (isNaN(id)) {
    return res.status(400).send("Invalid User ID")
  }

  res.send(`User ID: ${id}`)
})
```

---

# 🏗 8️⃣ Dynamic Routing Using Express Router (Clean Structure)

Since you're building Express projects, structure like this:

```
routes/
   user.js
app.js
```

### 📄 routes/user.js

```js
const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`)
})

module.exports = router
```

### 📄 app.js

```js
const userRoutes = require('./routes/user')

app.use('/user', userRoutes)
```

Now:

```
/user/100
```

---

# 🎓 9️⃣ Interview Question

**Q: What is dynamic routing in Express?**

👉 Dynamic routing allows defining route parameters using `:` so we can handle multiple URL variations with a single route and access values using `req.params`.

---

# 🧠 Important Rule (Very Important)

Order matters!

```js
app.get('/user/new', ...)
app.get('/user/:id', ...)
```

If reversed:

```js
app.get('/user/:id', ...)
app.get('/user/new', ...)
```

Then `/user/new` will match `:id` instead of "new".

Always put **specific routes first**.

---

# 💪 Practice Task For You

Create routes for:

1. `/product/:id`
2. `/category/:categoryName`
3. `/blog/:year/:month`

And console.log all params.

---

