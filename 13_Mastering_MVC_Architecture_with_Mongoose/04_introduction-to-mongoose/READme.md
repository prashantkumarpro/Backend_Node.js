# Introduction to Mongoose and Models

When building a Node.js application, we need a way to store and retrieve data from a database. While MongoDB is a powerful NoSQL database, working directly with it can become repetitive and difficult to manage. This is where **Mongoose** comes in.

Mongoose is an **Object Data Modeling (ODM)** library for MongoDB and Node.js. It provides a structured way to define the shape of your data, validate it, and interact with the database using JavaScript objects.

---

## What is Mongoose?

Mongoose is an ODM (Object Data Modeling) library that sits between your Node.js application and MongoDB.

It provides features such as:

* Defining data structures using schemas
* Creating models to interact with collections
* Data validation
* Built-in query methods
* Middleware (Hooks)
* Relationship management
* Easy CRUD operations

Without Mongoose, you would work directly with MongoDB's native driver, which requires more manual coding and validation.

---

## What is a Model?

A **Model** is a JavaScript class created from a Mongoose Schema.

Think of it like this:

```
MongoDB Database
        │
        ▼
 Collection (users)
        │
        ▼
 Mongoose Model (User)
        │
        ▼
 JavaScript Objects
```

The Model acts as the bridge between your application and the MongoDB collection.

Using a model, you can:

* Create documents
* Read documents
* Update documents
* Delete documents
* Validate data before saving

---

## Understanding the Flow

```
Application
     │
     ▼
 Mongoose Model
     │
     ▼
 MongoDB Collection
     │
     ▼
 Documents
```

Every time you create or fetch data, you work with the Model—not directly with MongoDB.

---

# Why Do We Need Models?

Imagine you're building a Todo application.

Without models, someone could save data like this:

```json
{
    "name": 12345,
    "completed": "yes",
    "age": "twenty"
}
```

This creates inconsistent data.

With a Mongoose Model, you define exactly what your documents should look like.

Example:

```javascript
{
    title: String,
    completed: Boolean
}
```

Now Mongoose ensures that the data follows this structure.

---

# Real-Life Analogy

Imagine a school admission form.

Every student must fill:

* Name
* Age
* Class
* Address

The school doesn't allow random fields like:

* Favorite Movie
* Instagram Password

The admission form defines the required structure.

Similarly:

* **Schema** → Admission Form
* **Model** → School Office
* **Document** → Student Record

---

# Creating Your First Model

### Step 1: Import Mongoose

```javascript
const mongoose = require("mongoose");
```

---

### Step 2: Create a Schema

```javascript
const todoSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
});
```

---

### Step 3: Create the Model

```javascript
const Todo = mongoose.model("Todo", todoSchema);
```

This creates a model named **Todo**.

---

### Step 4: Use the Model

Create a document:

```javascript
const todo = new Todo({
    title: "Learn Mongoose",
    completed: false
});
```

Save it:

```javascript
await todo.save();
```

---

# What Happens Behind the Scenes?

When you execute:

```javascript
const Todo = mongoose.model("Todo", todoSchema);
```

Mongoose automatically:

* Creates a collection named **todos** (pluralized by convention).
* Associates the schema with that collection.
* Gives you methods like:

  * `create()`
  * `find()`
  * `findOne()`
  * `updateOne()`
  * `findById()`
  * `deleteOne()`
  * `save()`

---

# CRUD Using Models

### Create

```javascript
await Todo.create({
    title: "Study MVC",
    completed: false
});
```

---

### Read

```javascript
const todos = await Todo.find();
```

---

### Update

```javascript
await Todo.updateOne(
    { title: "Study MVC" },
    { completed: true }
);
```

---

### Delete

```javascript
await Todo.deleteOne({
    title: "Study MVC"
});
```

---

# Model vs Schema

| Schema                           | Model                       |
| -------------------------------- | --------------------------- |
| Defines document structure       | Interacts with the database |
| Blueprint                        | Working class               |
| Contains fields and validation   | Performs CRUD operations    |
| Does not access MongoDB directly | Communicates with MongoDB   |

---

# Benefits of Using Mongoose Models

* Organized code structure
* Data validation
* Cleaner database interactions
* Easier maintenance
* Built-in helper methods
* Middleware support
* Better scalability
* Improved developer productivity

---

# Best Practices

* Keep one model per file.
* Use meaningful model names (e.g., `User`, `Todo`, `Product`).
* Define validation rules in schemas.
* Reuse models throughout your application.
* Organize models in a dedicated `models/` folder.

Example project structure:

```
project/
│
├── models/
│   ├── User.js
│   ├── Todo.js
│   └── Product.js
│
├── controllers/
├── routes/
├── views/
├── app.js
└── package.json
```

---

# Summary

* **Mongoose** is an ODM library that simplifies working with MongoDB in Node.js.
* A **Schema** defines the structure and rules for your data.
* A **Model** is created from a schema and provides methods to interact with the corresponding MongoDB collection.
* Models make it easy to perform CRUD operations, enforce validation, and keep your application organized.
* In MVC architecture, models are responsible for managing data and communicating with the database, while controllers handle business logic and views present the data to users.
