Here is your **complete DELETE guide in MongoDB** — simple, practical, and interview-ready 🚀

---

# 🗑️ FULL DELETE GUIDE (MongoDB)

## 🧠 1. Types of Delete Operations

MongoDB mein delete 3 level par hota hai:

| Type              | Kya delete hota hai   |
| ----------------- | --------------------- |
| Document delete   | Pura document         |
| Field delete      | Sirf property (field) |
| Collection delete | Puri collection       |

---

# 1️⃣ Delete Single Document

### ✅ `deleteOne()`

```js
db.expenses.deleteOne({ title: "Food" })
```

👉 Sirf **pehla matching document** delete hoga

---

# 2️⃣ Delete Multiple Documents

### ✅ `deleteMany()`

```js
db.expenses.deleteMany({ title: "Food" })
```

👉 Saare matching documents delete ho jayenge

---

# ⚠️ Delete ALL Documents (Danger)

```js
db.expenses.deleteMany({})
```

👉 Collection ke **saare documents delete** ❌

---

# 3️⃣ Delete Specific Field (Property)

### ✅ `$unset` (VERY IMPORTANT)

```js
db.expenses.updateOne(
  { title: "Food" },
  { $unset: { category: "" } }
)
```

👉 Sirf `category` field remove hoga
👉 Document safe rahega ✅

---

### 🔁 Multiple documents me field delete

```js
db.expenses.updateMany(
  {},
  { $unset: { category: "" } }
)
```

---

# 4️⃣ Delete Collection

### ✅ `drop()`

```js
db.expenses.drop()
```

👉 Puri collection delete
👉 Structure + data dono khatam ❌

---

# 5️⃣ Delete Database

```js
use finance
db.dropDatabase()
```

👉 Pura database delete 💀

---

# 🧠 Conditions ke saath delete (Advanced)

## 👉 Comparison Operators

```js
db.expenses.deleteMany({ amount: { $gt: 500 } })
```

👉 Amount > 500 wale sab delete

---

## 👉 AND condition

```js
db.expenses.deleteMany({
  title: "Food",
  amount: { $lt: 300 }
})
```

---

## 👉 OR condition

```js
db.expenses.deleteMany({
  $or: [
    { title: "Food" },
    { amount: { $gt: 1000 } }
  ]
})
```

---

# 📊 Output samajhna

```js
{
  acknowledged: true,
  deletedCount: 2
}
```

| Field        | Meaning                    |
| ------------ | -------------------------- |
| acknowledged | operation success          |
| deletedCount | kitne documents delete hue |

---

# ⚡ Real Project Example (Important)

```js
// Old expenses delete (older than date)
db.expenses.deleteMany({
  date: { $lt: new Date("2024-01-01") }
})
```

---

# 🧠 Common Mistakes (VERY IMPORTANT)

❌ Galti:

```js
db.expenses.deleteMany()
```

👉 ❌ Error (condition required)

---

❌ Galti:

```js
db.expenses.deleteMany({ title: "food" })
```

👉 MongoDB case-sensitive hai
👉 "Food" ≠ "food"

---

# 🔥 Pro Tips (Interview + Real Use)

✔ Always pehle check karo:

```js
db.expenses.find({ title: "Food" })
```

✔ Phir delete karo:

```js
db.expenses.deleteMany({ title: "Food" })
```

✔ Backup important data before delete

---

# 🧪 Practice Challenge (Must Do)

### Step 1: Insert data

```js
db.expenses.insertMany([
  { title: "Food", amount: 200 },
  { title: "Food", amount: 600 },
  { title: "Travel", amount: 1000 }
])
```

---

### Step 2: Try these

👉 Delete one:

```js
db.expenses.deleteOne({ title: "Food" })
```

👉 Delete many:

```js
db.expenses.deleteMany({ amount: { $gt: 500 } })
```

👉 Delete field:

```js
db.expenses.updateMany({}, { $unset: { amount: "" } })
```

---

# 🚀 Final Summary

| Command        | Use                |
| -------------- | ------------------ |
| deleteOne()    | ek document delete |
| deleteMany()   | multiple delete    |
| $unset         | field delete       |
| drop()         | collection delete  |
| dropDatabase() | database delete    |

---
