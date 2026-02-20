## 🚀 Handling Different HTTP Methods in **Express.js**

In web development, different **HTTP methods** are used to perform different actions on the server.

Think like this:

| HTTP Method | Meaning             | Example        |
| ----------- | ------------------- | -------------- |
| GET         | Get data            | View products  |
| POST        | Send data           | Create user    |
| PUT         | Update full data    | Update profile |
| PATCH       | Update partial data | Change email   |
| DELETE      | Remove data         | Delete account |

---

# 📌 1️⃣ GET Method

Used to **retrieve data** from the server.

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('This is GET request');
});

app.listen(3000);
```

👉 Open browser:
`http://localhost:3000/`

---

# 📌 2️⃣ POST Method

Used to **send data to server** (create something).

```js
app.post('/user', (req, res) => {
  res.send('User created');
});
```

You cannot test POST directly from browser URL bar.
Use:

* Postman
* Thunder Client
* fetch() in frontend

---

# 📌 3️⃣ PUT Method

Used to **update entire data**.

```js
app.put('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} updated completely`);
});
```

---

# 📌 4️⃣ PATCH Method

Used to **update partial data**.

```js
app.patch('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} updated partially`);
});
```

---

# 📌 5️⃣ DELETE Method

Used to **delete data**.

```js
app.delete('/user/:id', (req, res) => {
  res.send(`User ${req.params.id} deleted`);
});
```

---

# 🔥 Real World Example (CRUD)

```js
app.get('/users', getUsers);      // Read
app.post('/users', createUser);   // Create
app.put('/users/:id', updateUser); // Update
app.delete('/users/:id', deleteUser); // Delete
```

CRUD =
C → Create (POST)
R → Read (GET)
U → Update (PUT/PATCH)
D → Delete (DELETE)

---

# 🧠 How Express Handles It Internally

When a request comes:

1. Express checks request method (GET/POST/etc)
2. Matches URL path
3. Executes matching route handler
4. Sends response

So this will NOT run:

```js
app.get('/user', ...)
```

If client sends:

```
POST /user
```

Because method must match.

---

# ⭐ Bonus: Using `app.route()`

Cleaner way:

```js
app.route('/users')
   .get((req, res) => res.send('Get users'))
   .post((req, res) => res.send('Create user'));
```

---

# 💡 Best Practice (REST API Style)

Good REST structure:

```
GET    /users
GET    /users/:id
POST   /users
PUT    /users/:id
PATCH  /users/:id
DELETE /users/:id
```

---

# 🎯 Interview Question

👉 Difference between PUT and PATCH?

**PUT** → Replace whole object
**PATCH** → Update only specific fields

---

If you want, next I can explain:

* How to handle request body (`req.body`)
* How to test all methods using frontend fetch
* How Express internally routes requests step by step
* How to build mini REST API with MongoDB

Just tell me 🔥
