A **Mongoose Query** is an object that represents a database operation **before it is executed**. It allows you to build, modify, and execute MongoDB queries using Mongoose.

Think of it like this:

* You **create** a query.
* You can **add filters, sorting, limiting, selecting fields**, etc.
* The query **doesn't run immediately**.
* It executes only when you call `await`, `.then()`, `.exec()`, or use a callback.

### Example

```javascript
const query = User.find({ age: { $gte: 18 } });

console.log(query);
```

At this point, **no database request has been made**. `query` is just a Mongoose Query object.

To execute it:

```javascript
const users = await query;

console.log(users);
```

Or:

```javascript
const users = await query.exec();
```

---

## Creating a Query

```javascript
const query = User.find({ isActive: true });
```

This creates a query that will find all active users.

You can keep modifying it before execution:

```javascript
const query = User.find({ isActive: true })
  .select("name email")
  .sort({ createdAt: -1 })
  .limit(10);
```

Nothing has been sent to MongoDB yet.

---

## Query Execution

A query executes when you do one of the following:

### Using `await`

```javascript
const users = await User.find();
```

### Using `.then()`

```javascript
User.find()
  .then(users => {
    console.log(users);
  });
```

### Using `.exec()`

```javascript
const users = await User.find().exec();
```

---

## Common Query Methods

### Find Multiple Documents

```javascript
const users = await User.find({ role: "admin" });
```

---

### Find One Document

```javascript
const user = await User.findOne({ email: "john@example.com" });
```

---

### Find by ID

```javascript
const user = await User.findById(userId);
```

---

### Update Documents

```javascript
await User.updateOne(
  { email: "john@example.com" },
  { $set: { age: 25 } }
);
```

---

### Delete Documents

```javascript
await User.deleteOne({ email: "john@example.com" });
```

---

## Query Chaining

One of Mongoose's biggest advantages is query chaining.

```javascript
const users = await User.find({ isActive: true })
  .select("name email")
  .sort({ age: -1 })
  .limit(5)
  .skip(10);
```

This query will:

1. Find active users.
2. Return only `name` and `email`.
3. Sort by age (highest first).
4. Skip the first 10 documents.
5. Return the next 5 documents.

---

## Queries Are Thenable

A Mongoose Query is **not a real Promise**, but it is **thenable**, meaning it behaves like one.

```javascript
const query = User.find();

console.log(query instanceof Promise); // false

await query; // Works
```

This is why you can write:

```javascript
await User.find();
```

even though `find()` itself does not return a native Promise.

---

## Summary

* A **Mongoose Query** represents a database operation before it is executed.
* Queries are **lazy**—they don't hit the database until executed.
* You can chain methods like `.find()`, `.select()`, `.sort()`, `.limit()`, and `.skip()` to build complex queries.
* A query executes when you use `await`, `.then()`, `.exec()`, or a callback.
* Mongoose Query objects are **thenable**, so they work seamlessly with `async/await`.
