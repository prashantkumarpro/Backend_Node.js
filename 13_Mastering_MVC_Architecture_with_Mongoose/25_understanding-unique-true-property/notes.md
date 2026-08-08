## 25. Understanding `unique: true` Property in Mongoose

In Mongoose, `unique: true` is used to create a **unique index** on a field. It prevents MongoDB from storing duplicate values for that field.

### Example

```js
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
});
```

Now MongoDB allows:

```text
john@gmail.com
alice@gmail.com
```

But it will reject another document with:

```text
john@gmail.com
```

because `email` must be unique.

---

### Important: `unique` is NOT a validator

This is one of the most important things to understand.

```js
email: {
  type: String,
  unique: true
}
```

❌ `unique: true` does **not** mean Mongoose validates uniqueness before saving.

Instead, Mongoose uses it to tell MongoDB to create a **unique index**.

MongoDB itself enforces the uniqueness.

So if you try to insert a duplicate:

```js
await User.create({
  email: "john@gmail.com"
});
```

MongoDB will return a duplicate-key error, commonly:

```text
E11000 duplicate key error
```

You should handle this error in your application.

```js
try {
  await User.create({
    email: "john@gmail.com"
  });
} catch (error) {
  if (error.code === 11000) {
    return res.status(409).json({
      message: "Email already exists"
    });
  }

  throw error;
}
```

---

## `unique: true` vs `required: true`

They solve different problems:

```js
email: {
  type: String,
  required: true,
  unique: true
}
```

| Property         | Purpose                          |
| ---------------- | -------------------------------- |
| `required: true` | Value must be provided           |
| `unique: true`   | Duplicate values are not allowed |
| `type: String`   | Value must be a string           |

Think of it as:

```text
required → "You must provide it"
unique   → "Nobody else can have the same value"
type     → "It must be this data type"
```

---

## What happens internally?

Suppose you have:

```js
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  }
});
```

Mongoose creates a MongoDB index approximately like:

```js
{
  username: 1
}
```

with:

```js
unique: true
```

Conceptually:

```text
users
│
├── username: "prashant"   ✅
├── username: "rahul"      ✅
├── username: "amit"       ✅
└── username: "prashant"   ❌ Duplicate
```

The database rejects the fourth document.

---

## A common misconception

Some developers think:

```js
unique: true
```

means:

> "Mongoose will check whether this value already exists."

That's not quite correct.

Mongoose does **not** perform:

```js
const existingUser = await User.findOne({ email });

if (existingUser) {
  // duplicate
}
```

for you.

The **database index** is responsible for enforcing uniqueness.

---

## Why is a database-level unique index important?

Imagine two requests arrive at almost exactly the same time:

```text
Request A → check email → doesn't exist
Request B → check email → doesn't exist

Request A → insert
Request B → insert
```

If you only perform a manual `findOne()` check, both requests might pass the check.

A unique MongoDB index prevents this race condition:

```text
Request A → INSERT → ✅
Request B → INSERT → ❌ E11000
```

That's why uniqueness should ultimately be enforced at the database level.

---

## `unique` creates an index

You can also explicitly create the index:

```js
userSchema.index(
  { email: 1 },
  { unique: true }
);
```

This is effectively the more explicit form of:

```js
email: {
  type: String,
  unique: true
}
```

For simple fields, `unique: true` is convenient.

For complex indexes, prefer:

```js
userSchema.index(
  { branchId: 1, phone: 1 },
  {
    unique: true
  }
);
```

This becomes especially important in a **multi-tenant application**.

For example, if your CRM has multiple branches:

```text
Branch A → 9876543210
Branch B → 9876543210
```

You may want the same phone number to be allowed in different branches, but not duplicated within the same branch.

So:

```js
phone: {
  type: String,
  required: true
},

branchId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Branch",
  required: true
}
```

and:

```js
leadSchema.index(
  { branchId: 1, phone: 1 },
  { unique: true }
);
```

Now:

```text
branch A + 9876543210 → ✅
branch A + 9876543210 → ❌

branch B + 9876543210 → ✅
```

This is a very important pattern for your multi-tenant CRM.

### Key takeaway

> **`unique: true` is an instruction to create a unique MongoDB index; it is not a Mongoose validator.**

And remember:

```js
unique: true
```

➡️ MongoDB enforces uniqueness
➡️ Duplicate insertion produces `E11000`
➡️ Your controller/service should handle that error
➡️ For multi-tenant data, use compound unique indexes such as `{ branchId: 1, phone: 1 }`
