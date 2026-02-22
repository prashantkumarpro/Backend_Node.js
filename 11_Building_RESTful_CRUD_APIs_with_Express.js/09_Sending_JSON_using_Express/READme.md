Great 🔥 Now we are entering an important Express topic.

# Sending JSON Using Express

In Express, sending JSON is **very common**, especially when building APIs for frontend apps like React.

Express provides a very simple method:

```js
res.json()
```

---

## 1️⃣ Basic Example

```js
const express = require('express')
const app = express()

app.get('/user', (req, res) => {
  const user = {
    name: 'Prashant',
    age: 25,
    profession: 'Frontend Developer'
  }

  res.json(user)
})

app.listen(3000)
```

### What happens here?

- Client hits: `GET /user`
- Server sends JSON response
- Browser/Postman receives:

```json
{
  "name": "Prashant",
  "age": 25,
  "profession": "Frontend Developer"
}
```

---

## 2️⃣ How `res.json()` Works Internally

When you call:

```js
res.json(data)
```

Express:

1. Converts object → JSON string using `JSON.stringify()`
2. Sets header automatically:

   ```
   Content-Type: application/json
   ```

3. Sends response

So this:

```js
res.json({ success: true })
```

Is basically equal to:

```js
res.setHeader('Content-Type', 'application/json')
res.send(JSON.stringify({ success: true }))
```

But Express makes it clean and simple.

---

## 3️⃣ Sending JSON with Status Code

Very important in APIs 👇

```js
app.get('/product', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Product fetched successfully'
  })
})
```

If error:

```js
app.get('/product', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Product not found'
  })
})
```

---

## 4️⃣ Sending Array as JSON

```js
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: 'Rahul' },
    { id: 2, name: 'Aman' }
  ]

  res.json(users)
})
```

Output:

```json
[
  { "id": 1, "name": "Rahul" },
  { "id": 2, "name": "Aman" }
]
```

---

## 5️⃣ Difference: `res.send()` vs `res.json()`

| Method       | What it sends              |
| ------------ | -------------------------- |
| `res.send()` | String, HTML, Buffer, JSON |
| `res.json()` | Always JSON                |

Example:

```js
res.send({ name: 'Prashant' })
```

This also works because Express detects object → converts to JSON.

But best practice for APIs:

👉 Use `res.json()` when sending JSON
👉 Use `res.send()` for text or HTML

---

## 6️⃣ Real API Style (Professional Way)

As a backend developer, response format should be consistent:

```js
app.get('/api/user/:id', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: 1,
      name: 'Prashant'
    }
  })
})
```

This makes frontend integration easier.

---

# 🧠 Important Interview Question

### ❓ Why do we use `res.json()` instead of `res.send()`?

Because:

- It automatically sets correct header
- Ensures response is valid JSON
- Makes API development cleaner and consistent

---

