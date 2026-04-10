### 🧠 Understanding Mongo Shell (Very Important for DBMS & Interviews)

Mongo Shell is a **command-line interface (CLI)** used to interact with MongoDB.

👉 Simple words mein:
**Mongo Shell = MongoDB ko control karne ka terminal**

---

## 📌 1. What is Mongo Shell?

Mongo Shell ek tool hai jisse hum:

* Database create karte hain
* Data insert karte hain
* Data read/update/delete karte hain

💡 Think like this:

> Jaise browser se website access karte ho, waise Mongo Shell se database access karte ho.

---

## ⚙️ 2. How to Start Mongo Shell

### Step:

```bash
mongosh
```

👉 Agar MongoDB installed hai, to ye command run karte hi shell open ho jayega.

---

## 🗂️ 3. Basic Commands (Must Know)

### 🔹 Show all databases

```js
show dbs
```

---

### 🔹 Create / Switch database

```js
use myDatabase
```

👉 Agar database exist nahi karta → automatically create ho jayega

---

### 🔹 Check current database

```js
db
```

---

## 📦 4. Collections (Like Tables)

### 🔹 Create collection automatically (by inserting data)

```js
db.students.insertOne({
  name: "Prashant",
  age: 22
})
```

👉 Yahan:

* `students` = collection (table jaisa)
* `{}` = document (row jaisa)

---

## 📖 5. Read Data

```js
db.students.find()
```

👉 Output me saara data aa jayega

---

## ✏️ 6. Update Data

```js
db.students.updateOne(
  { name: "Prashant" },
  { $set: { age: 23 } }
)
```

---

## ❌ 7. Delete Data

```js
db.students.deleteOne({ name: "Prashant" })
```

---

## 🧩 8. Important Concepts

### 🔸 Database

→ Collection ka group

### 🔸 Collection

→ Documents ka group

### 🔸 Document

→ JSON format data

Example:

```json
{
  "name": "Prashant",
  "age": 22
}
```

---

## 🎯 9. Real-Life Analogy

| Real Life | MongoDB    |
| --------- | ---------- |
| School    | Database   |
| Class     | Collection |
| Student   | Document   |

---

## 🚀 10. Why Mongo Shell is Important?

* Interviews me basic questions aate hain
* Backend development me useful hai
* Debugging ke liye best tool hai

---

## 🧑‍🏫 Quick Revision (1 Minute)

* `mongosh` → shell start
* `use dbName` → DB select
* `db.collection.insertOne()` → insert
* `db.collection.find()` → read
* `updateOne()` → update
* `deleteOne()` → delete

---

## 💬 Bonus Tip (Interview)

👉 Agar interviewer puche:

> “What is Mongo Shell?”

✅ Answer:

> Mongo Shell is a command-line interface used to interact with MongoDB databases. It allows developers to perform CRUD operations, manage databases, and run queries using JavaScript.

---

