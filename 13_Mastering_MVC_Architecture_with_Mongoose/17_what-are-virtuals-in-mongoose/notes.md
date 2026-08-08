# What are Virtuals in Mongoose?

**Virtuals** in Mongoose are **computed properties** that are not stored in MongoDB.

They allow you to create a field whose value is **calculated from other fields** in the document.

### Simple Example

Suppose we have a `User` schema:

```js
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String
})
```

MongoDB stores:

```js
{
  firstName: "Prashant",
  lastName: "Kumar"
}
```

We can create a virtual called `fullName`:

```js
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})
```

Now:

```js
const user = await User.findOne()

console.log(user.fullName)
```

Output:

```text
Prashant Kumar
```

But MongoDB still contains only:

```js
{
  firstName: "Prashant",
  lastName: "Kumar"
}
```

There is **no `fullName` field stored in the database**.

---

## Why are they called Virtuals?

Because the property **virtually exists on the Mongoose document**, but it doesn't physically exist in MongoDB.

Think of it like:

```text
MongoDB
┌────────────────────┐
│ firstName          │
│ lastName           │
└────────────────────┘
          │
          ▼
     Mongoose Virtual
          │
          ▼
       fullName
```

---

## Getter Virtual

A getter virtual **calculates a value**.

```js
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})
```

Usage:

```js
console.log(user.fullName)
```

---

## Setter Virtual

A virtual can also have a setter.

```js
userSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`
  })
  .set(function (value) {
    const [firstName, lastName] = value.split(' ')

    this.firstName = firstName
    this.lastName = lastName
  })
```

Now:

```js
user.fullName = 'Rahul Sharma'
```

Mongoose will internally set:

```js
user.firstName = 'Rahul'
user.lastName = 'Sharma'
```

Again, `fullName` itself is **not stored**.

---

# Virtuals vs Normal Fields

### Normal field

```js
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  fullName: String
})
```

`fullName` is stored in MongoDB.

```json
{
  "firstName": "Prashant",
  "lastName": "Kumar",
  "fullName": "Prashant Kumar"
}
```

### Virtual

```js
userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`
})
```

MongoDB stores:

```json
{
  "firstName": "Prashant",
  "lastName": "Kumar"
}
```

Mongoose provides:

```js
user.fullName
```

So:

> **Normal field = stored data**
> **Virtual = computed data**

---

# Important: Virtuals are not saved

This:

```js
user.fullName = 'Prashant Kumar'

await user.save()
```

does **not** create a `fullName` field in MongoDB when `fullName` is a getter-only virtual.

Virtuals are useful for values that can be derived from existing data and therefore **don't need their own database storage**.

---

# Virtual Populate

Mongoose also supports another important feature called **Virtual Populate**.

For example:

```js
const authorSchema = new mongoose.Schema({
  name: String
})

const bookSchema = new mongoose.Schema({
  title: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
})
```

Instead of storing an array of books inside `Author`, we can create a virtual:

```js
authorSchema.virtual('books', {
  ref: 'Book',
  localField: '_id',
  foreignField: 'authorId'
})
```

Then:

```js
const author = await Author
  .findById(authorId)
  .populate('books')
```

Now:

```js
author.books
```

contains the related books.

The important part is:

```text
Author
   │
   │ _id
   ▼
Book.authorId
```

The `books` property itself is **not stored in the Author document**.

---

## Virtuals in JSON

By default, virtuals may not appear when converting a document to JSON.

You can enable them:

```js
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)
```

Now:

```js
res.json(user)
```

can include:

```json
{
  "firstName": "Prashant",
  "lastName": "Kumar",
  "fullName": "Prashant Kumar"
}
```

even though `fullName` is **still not stored in MongoDB**.

---

## When should you use Virtuals?

Use virtuals when a value:

* Can be calculated from existing fields
* Doesn't need to be persisted
* Doesn't need its own database index
* Should always reflect the current underlying data

Common examples:

```text
firstName + lastName → fullName
birthDate → age
price + tax → finalPrice
firstName + email → displayName
startDate + duration → endDate
```

### Key interview point

> **A Mongoose Virtual is a property that is computed by Mongoose but is not persisted in MongoDB. It can be used for derived values or virtual population of related documents.**
