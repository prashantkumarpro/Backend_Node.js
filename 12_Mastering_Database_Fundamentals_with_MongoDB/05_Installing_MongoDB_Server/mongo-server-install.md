Let’s install **MongoDB Server** step-by-step in a very simple way 👍 (Windows guide – tell me if you’re using Mac/Linux)

---

# 🧠 What is MongoDB Server?

MongoDB Server is the **database engine** that stores your data (documents).

👉 You install it → run it → then connect using tools like:

* Mongo Shell (`mongosh`)
* MongoDB Compass
* Node.js (Mongoose)

---

# 💻 Step 1: Download MongoDB

Go to official website:

👉 [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)

### Select:

* Version: Latest
* OS: Windows
* Package: **msi**

Click **Download**

---

# ⚙️ Step 2: Install MongoDB

Open the downloaded `.msi` file

### Follow steps:

1. Click **Next**
2. Accept terms ✅
3. Choose **Complete Installation**
4. ✔️ Tick: **Install MongoDB as a Service**
5. ✔️ Tick: **Install MongoDB Compass** (GUI tool)
6. Click **Next → Install**

---

# 📁 Step 3: Create Data Folder (Important)

MongoDB needs a folder to store data

👉 Open this path:

```
C:\data\db
```

If not exists:

* Create folder `data`
* Inside it create `db`

---

# 🚀 Step 4: Start MongoDB Server

If installed as service → it runs automatically

Or manually:

```bash
mongod
```

---

# 🧪 Step 5: Check Installation

Open Command Prompt and run:

```bash
mongosh
```

If you see:

```
test>
```

👉 ✅ MongoDB is working!

---

# 🎯 Step 6: Test Database

Inside `mongosh`:

```js
use mydb

db.users.insertOne({name: "Prashant", age: 22})

db.users.find()
```

---

# 🧩 Optional: Use GUI (Compass)

Open:
👉 MongoDB Compass

Connect using:

```
mongodb://localhost:27017
```

---

# ⚠️ Common Errors + Fix

### ❌ 'mongosh not recognized'

👉 Add MongoDB to PATH:

```
C:\Program Files\MongoDB\Server\...\bin
```

---

### ❌ Connection refused

👉 Start service:

```bash
net start MongoDB
```

---


