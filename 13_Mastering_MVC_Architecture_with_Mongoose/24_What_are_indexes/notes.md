## What are Indexes in MongoDB?

An **index** is a special data structure that MongoDB creates to make **queries faster**.

Think of an index like the **index page of a book**.

### Without an index

Suppose you have **10 million users**:

```js
{
  _id: "...",
  name: "Prashant",
  email: "prashant@example.com"
}
```

And you run:

```js
User.findOne({ email: "prashant@example.com" })
```

Without an index on `email`, MongoDB may need to check documents one by one:

```text
Document 1 → email doesn't match
Document 2 → email doesn't match
Document 3 → email doesn't match
...
Document 8,734,291 → email matches
```

This is called a **collection scan**.

---

## With an index

If you create:

```js
userSchema.index({ email: 1 })
```

MongoDB creates a separate index structure roughly like:

```text
email index

abc@gmail.com       → Document A
hello@gmail.com     → Document B
prashant@gmail.com  → Document C
xyz@gmail.com       → Document D
```

Now when you run:

```js
User.findOne({ email: "prashant@gmail.com" })
```

MongoDB can use the index to find the document much faster.

```text
Query
  ↓
Email Index
  ↓
Matching Document
```

---

# Why do we need indexes?

The main purpose is:

> **Indexes reduce the amount of data MongoDB has to examine to answer a query.**

They are especially important for frequently used:

* `find()`
* `findOne()`
* filtering
* sorting
* range queries
* unique constraints
* some aggregation operations

---

# Creating an Index in Mongoose

### Single-field index

```js
userSchema.index({ email: 1 })
```

`1` means **ascending** order.

You can also use:

```js
userSchema.index({ email: -1 })
```

`-1` means **descending** order.

For equality searches, the direction often doesn't matter much; direction becomes more relevant for sorting and compound indexes.

---

# Example

Suppose:

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
})
```

Create indexes:

```js
userSchema.index({ email: 1 })
userSchema.index({ age: 1 })
```

Now these queries can benefit from indexes:

```js
User.findOne({ email: "abc@gmail.com" })
```

and:

```js
User.find({ age: 25 })
```

---

# Unique Index

Indexes can also enforce uniqueness.

For example:

```js
userSchema.index(
  { email: 1 },
  { unique: true }
)
```

Now MongoDB won't allow two documents with the same email.

```text
abc@gmail.com  ✅
xyz@gmail.com  ✅
abc@gmail.com  ❌ duplicate
```

This is why you often see:

```js
email: {
  type: String,
  unique: true
}
```

in Mongoose schemas.

---

# Compound Index

You can create an index using multiple fields:

```js
leadSchema.index({
  branchId: 1,
  createdAt: -1
})
```

This is called a **compound index**.

It's extremely important in your multi-tenant CRM architecture.

For example, your query might be:

```js
Lead.find({
  branchId: branchId
}).sort({
  createdAt: -1
})
```

The index:

```js
{ branchId: 1, createdAt: -1 }
```

is designed specifically for this query pattern.

Conceptually:

```text
branchId
   ↓
   001
      ↓ createdAt
      newest
      older
      older

   002
      ↓ createdAt
      newest
      older
```

---

# Why `branchId` comes first in your CRM indexes

You designed your CRM as **multi-tenant**, where every branch's data must be isolated.

So queries commonly look like:

```js
Lead.find({
  branchId,
  statusId
})
```

A suitable index could be:

```js
leadSchema.index({
  branchId: 1,
  statusId: 1
})
```

Or:

```js
leadSchema.index({
  branchId: 1,
  createdAt: -1
})
```

This allows MongoDB to narrow down to the branch first and then efficiently work with the other field.

---

# Important: Indexes aren't free

Indexes make **reads faster**, but they have costs.

### Storage

Indexes consume additional disk space.

### Writes

When you insert/update/delete a document, MongoDB may also need to update its indexes.

So:

```text
More indexes
     ↓
Faster certain queries
     +
More storage
     +
More write overhead
```

Therefore:

> **Don't create an index for every field.**

Create indexes based on your **actual query patterns**.

---

# How to see whether MongoDB uses an index

Use:

```js
db.users.find({
  email: "abc@gmail.com"
}).explain("executionStats")
```

You'll see information about how MongoDB executed the query.

For example:

```text
IXSCAN
```

means MongoDB used an **index scan**.

Whereas:

```text
COLLSCAN
```

means MongoDB scanned the collection.

---

## Simple mental model

Remember this:

```text
No Index

Query
  ↓
Collection
  ↓
Document 1
Document 2
Document 3
Document 4
...
Document 10,000,000
```

With an index:

```text
Query
  ↓
Index
  ↓
Relevant Documents
```

So the simplest definition is:

> **An index is a data structure maintained by MongoDB that allows it to locate and retrieve matching documents more efficiently instead of scanning the entire collection.**

And in your Mongoose/CRM work, **understanding compound indexes and index field order is especially important**, because your queries frequently include `branchId` plus another filtering/sorting field.
