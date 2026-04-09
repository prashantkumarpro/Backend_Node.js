## 📖 Read Operation in MongoDB (Simple + Practical Explanation)

In MongoDB, **Read Operation** means **fetching (reading) data from the database**.

👉 You use the method:

```js
db.collection.find()
```

---

## 🔹 1. Basic Syntax

```js
db.collection.find(query, projection)
```

* **query** → what data you want
* **projection** → which fields you want to show

---

## 🔹 2. Read All Documents

```js
db.users.find()
```

👉 This will return **all documents** from the `users` collection.

---

## 🔹 3. Read Specific Data (Filter)

```js
db.users.find({ age: 25 })
```

👉 This will return users whose **age is 25**

---

## 🔹 4. Read One Document Only

```js
db.users.findOne({ name: "Rahul" })
```

👉 Returns **only the first matching document**

---

## 🔹 5. Projection (Select Specific Fields)

```js
db.users.find({ age: 25 }, { name: 1, age: 1 })
```

👉 Show only **name and age**

❗ `_id` is included by default

To hide `_id`:

```js
db.users.find({}, { name: 1, _id: 0 })
```

---

## 🔹 6. Comparison Operators

| Operator | Meaning      | Example                 |
| -------- | ------------ | ----------------------- |
| `$gt`    | greater than | `{ age: { $gt: 20 } }`  |
| `$lt`    | less than    | `{ age: { $lt: 30 } }`  |
| `$gte`   | ≥            | `{ age: { $gte: 18 } }` |
| `$lte`   | ≤            | `{ age: { $lte: 60 } }` |
| `$ne`    | not equal    | `{ age: { $ne: 25 } }`  |

Example:

```js
db.users.find({ age: { $gt: 20 } })
```

---

## 🔹 7. Logical Operators

```js
db.users.find({
  $and: [
    { age: { $gt: 20 } },
    { city: "Delhi" }
  ]
})
```

👉 You can also use `$or`

```js
db.users.find({
  $or: [
    { age: 18 },
    { age: 25 }
  ]
})
```

---

## 🔹 8. Sorting Data

```js
db.users.find().sort({ age: 1 })
```

* `1` → ascending
* `-1` → descending

---

## 🔹 9. Limit Results

```js
db.users.find().limit(5)
```

👉 Only 5 documents

---

## 🔹 10. Skip (Pagination)

```js
db.users.find().skip(5).limit(5)
```

👉 Skip first 5 → get next 5

---

## 🔥 Real-World Example (Very Important)

Imagine you are building your **Quiz App**:

```js
db.questions.find({ subject: "JavaScript" })
```

👉 Fetch all JavaScript questions

```js
db.users.find({ score: { $gt: 80 } })
```

👉 Get top-performing users

---

## 🧠 Simple Understanding (Like Teaching Students)

* `find()` = "Give me data"
* `findOne()` = "Give me only one"
* `query` = "Which data?"
* `projection` = "Which fields?"

---

## 🎯 Quick Practice for You

Try answering:

1. Get all users from **Patna**
2. Get users with **age > 18**
3. Show only **name field**
4. Get top 3 users sorted by score

---

