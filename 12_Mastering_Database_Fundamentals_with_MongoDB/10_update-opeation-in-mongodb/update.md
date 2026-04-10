Let’s understand **Update Operation in MongoDB** in a very simple and practical way 👇

---

# 🔄 Update Operation in MongoDB

👉 Update means **changing existing data (documents)** in your database.

For example:

* Change name
* Update price
* Add new field
* Remove a field

---

## 📌 1. `updateOne()` → Update ONE document

### ✅ Syntax:

```js
db.collection.updateOne(
  { filter },
  { update }
)
```

### ✅ Example:

```js
db.users.updateOne(
  { name: "Prashant" },
  { $set: { age: 25 } }
)
```

👉 Meaning:

* Find user with name "Prashant"
* Set age = 25

---

## 📌 2. `updateMany()` → Update MULTIPLE documents

### ✅ Example:

```js
db.users.updateMany(
  { city: "Delhi" },
  { $set: { status: "Active" } }
)
```

👉 All users from Delhi will get `status: Active`

---

## 📌 3. `$set` Operator (Most Important)

👉 Used to **update or add fields**

```js
{ $set: { field: value } }
```

### Example:

```js
db.products.updateOne(
  { name: "Laptop" },
  { $set: { price: 50000 } }
)
```

---

## 📌 4. `$inc` Operator → Increase value

👉 Used for numbers

```js
db.users.updateOne(
  { name: "Prashant" },
  { $inc: { age: 1 } }
)
```

👉 Age will increase by 1

---

## 📌 5. `$unset` Operator → Remove field

```js
db.users.updateOne(
  { name: "Prashant" },
  { $unset: { age: "" } }
)
```

👉 Removes `age` field

---

## 📌 6. Update using Mongoose (Node.js)

Since you are using **Mongoose**, this is very important 👇

### Example:

```js
const User = mongoose.model("User", userSchema);

await User.updateOne(
  { name: "Prashant" },
  { $set: { age: 25 } }
);
```

---

## 📌 7. `findOneAndUpdate()` (🔥 Most used in projects)

```js
await User.findOneAndUpdate(
  { name: "Prashant" },
  { $set: { age: 26 } },
  { new: true }
);
```

👉 `new: true` → returns updated document

---

## ⚡ Real-Life Example (Your Finance Project)

```js
await Expense.updateOne(
  { title: "Food" },
  { $set: { amount: 500 } }
);
```

👉 You updated expense amount

---

## 🚀 Important Tips (Interview + Real Use)

* Always use `$set` (safe update)
* Without `$set`, whole document can be replaced ❗
* Use `updateMany()` carefully
* Prefer `findOneAndUpdate()` in real apps

---

## 🧠 Simple Summary

* `updateOne()` → 1 document
* `updateMany()` → multiple documents
* `$set` → update/add field
* `$inc` → increase value
* `$unset` → remove field

---

