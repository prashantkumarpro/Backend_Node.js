# Document Versioning in Mongoose

**Document versioning** means keeping track of different versions of a MongoDB document whenever it is updated.

For example, suppose you have a `User` document:

```js
{
  _id: "123",
  name: "Prashant",
  email: "prashant@example.com",
  age: 25
}
```

Later, the user changes their name:

```js
{
  _id: "123",
  name: "Prashant Kumar",
  email: "prashant@example.com",
  age: 25
}
```

With versioning, you can know:

```text
Version 1
name: "Prashant"

Version 2
name: "Prashant Kumar"
```

This is useful when you need **history, auditing, rollback, or change tracking**.

---

## 1. Mongoose's built-in `__v`

Mongoose automatically adds a field called `__v` to documents by default:

```js
{
  _id: "...",
  name: "Prashant",
  __v: 0
}
```

`__v` is commonly called the **version key**.

You can configure its name:

```js
const userSchema = new mongoose.Schema(
  {
    name: String
  },
  {
    versionKey: "version"
  }
);
```

Now:

```js
{
  name: "Prashant",
  version: 0
}
```

### Important

`__v` is **not a complete document history system**.

It generally represents the document's internal version number used by Mongoose, particularly for certain concurrency/array update behavior.

It does **not** automatically give you:

```text
Version 1 → old document
Version 2 → modified document
Version 3 → modified document
```

If you need that, you need to implement version history yourself or use a plugin.

---

# 2. Manual Document Versioning

A simple approach is to store a `version` field:

```js
const documentSchema = new mongoose.Schema({
  name: String,

  version: {
    type: Number,
    default: 1
  }
});
```

When updating:

```js
const document = await Document.findById(id);

document.name = "New Name";
document.version += 1;

await document.save();
```

The document becomes:

```js
{
  _id: "...",
  name: "New Name",
  version: 2
}
```

But this still only stores the **current version number**.

It doesn't store the previous data.

---

# 3. Storing Version History

If you want actual history, a common production approach is to use **two collections**.

### Current document

```js
const documentSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
    version: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);
```

### Version history

```js
const documentVersionSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true
    },

    version: {
      type: Number,
      required: true
    },

    name: String,
    content: String,

    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);
```

Now you might have:

### `documents`

```js
{
  _id: "doc123",
  name: "My Document",
  content: "Hello World",
  version: 3
}
```

### `documentVersions`

```js
{
  documentId: "doc123",
  version: 1,
  name: "My Document",
  content: "Hello",
  changedBy: "user123"
}
```

```js
{
  documentId: "doc123",
  version: 2,
  name: "My Document",
  content: "Hello World",
  changedBy: "user123"
}
```

```js
{
  documentId: "doc123",
  version: 3,
  name: "My Document",
  content: "Hello World!",
  changedBy: "user456"
}
```

Now you have a real history.

---

# 4. Why Use a Separate Collection?

You could store versions inside the document:

```js
{
  name: "Current",
  versions: [
    {
      version: 1,
      name: "Old"
    },
    {
      version: 2,
      name: "New"
    }
  ]
}
```

But this can become problematic.

A document could grow continuously:

```text
Version 1
Version 2
Version 3
...
Version 100
...
Version 10,000
```

MongoDB documents have a **16 MB maximum BSON document size**.

Therefore, for systems with potentially many versions, a separate collection is generally more scalable.

---

# 5. Typical Update Flow

Suppose the current document is:

```js
{
  _id: "doc123",
  content: "Hello",
  version: 1
}
```

User changes it to:

```text
Hello World
```

A typical flow is:

```text
Client
   ↓
Update API
   ↓
Find current document
   ↓
Create version history
   ↓
Update current document
   ↓
Return updated document
```

For example:

```js
const document = await Document.findById(id);

if (!document) {
  throw new Error("Document not found");
}

// Save old version
await DocumentVersion.create({
  documentId: document._id,
  version: document.version,
  content: document.content
});

// Update current document
document.content = "Hello World";
document.version += 1;

await document.save();
```

Now:

```text
Current document
version: 2
content: "Hello World"
```

And history contains:

```text
version: 1
content: "Hello"
```

---

# 6. Versioning vs Auditing

These concepts are related but different.

### Document Versioning

Answers:

> "What did this document look like before?"

Example:

```text
v1 → Hello
v2 → Hello World
v3 → Hello World!!!
```

### Auditing

Answers:

> "Who changed what and when?"

Example:

```text
User: Prashant
Action: UPDATE
Field: content
Old: Hello
New: Hello World
Time: 3:20 PM
```

A production application may use both.

---

# 7. Optimistic Concurrency

One of the most important reasons to understand version numbers is **concurrency**.

Imagine two users open the same document.

Both see:

```text
version = 5
```

### User A

Changes:

```text
Hello → Hello World
```

### User B

Changes:

```text
Hello → Hello MongoDB
```

If both blindly update the document, the second update can overwrite the first.

Version checking can prevent this.

User A sends:

```js
{
  version: 5,
  content: "Hello World"
}
```

The server performs:

```js
await Document.findOneAndUpdate(
  {
    _id: id,
    version: 5
  },
  {
    $set: {
      content: "Hello World"
    },
    $inc: {
      version: 1
    }
  }
);
```

If successful:

```text
version 5 → version 6
```

Now User B tries:

```js
{
  version: 5,
  content: "Hello MongoDB"
}
```

But the database currently has:

```text
version = 6
```

Therefore:

```js
findOneAndUpdate({
  _id: id,
  version: 5
})
```

matches **nothing**.

The server can respond:

```http
409 Conflict
```

Meaning:

> "This document was modified by someone else. Please reload the latest version."

---

# 8. Where Mongoose `__v` Fits

This is where Mongoose's built-in version key becomes interesting.

By default:

```js
{
  __v: 0
}
```

Mongoose uses this internally for versioning behavior, especially around certain document `save()` operations and optimistic concurrency scenarios.

You can enable stronger optimistic concurrency behavior:

```js
const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String
  },
  {
    optimisticConcurrency: true
  }
);
```

Then Mongoose can use the version key to detect conflicting saves.

Conceptually:

```text
Document version: 5

       ↓

User A saves
       ↓
Version becomes 6

       ↓

User B tries to save version 5
       ↓
Version mismatch
       ↓
VersionError
```

This is different from keeping a complete historical record.

---

# 9. Important Distinction

Think of these as three different things:

| Feature                    | Purpose                               |
| -------------------------- | ------------------------------------- |
| `__v`                      | Mongoose version/concurrency tracking |
| `version` field            | Your application's version number     |
| Version history collection | Complete historical snapshots         |

For example:

```text
__v
 ↓
Concurrency / Mongoose internal versioning
```

```text
version
 ↓
Current document version
```

```text
documentVersions
 ↓
Actual historical versions
```

---

# 10. For a Google Drive-like Application

Since you're working on a **Google Drive/Mega-like file system**, document/file versioning can be especially useful.

For example:

```text
files
├── fileId
├── name
├── size
├── currentVersion
└── ...
```

And:

```text
fileVersions
├── fileId
├── version
├── storageKey
├── size
├── mimeType
├── uploadedBy
├── createdAt
└── ...
```

Suppose:

```text
report.pdf
```

gets uploaded three times.

You could have:

```text
File
  report.pdf
  currentVersion: 3

FileVersions
  v1 → report-v1.pdf
  v2 → report-v2.pdf
  v3 → report-v3.pdf
```

The database doesn't necessarily need to store the actual file contents. It can store the **storage reference/key** for each version.

This is a much better architecture for a file-storage system.

---

## The key idea

**Mongoose's `__v` is not the same thing as full document version history.**

Remember:

```text
__v
   ↓
"Which version/state is this document at?"

Version History
   ↓
"What did this document look like at each previous version?"
```

And:

```text
Optimistic Concurrency
   ↓
"Has someone else modified this document since I read it?"
```

These are related, but they solve **different problems**.
