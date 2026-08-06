A **thenable object** is any JavaScript object that has a `.then()` method. It behaves like a Promise, even if it is **not** an actual `Promise` instance.

JavaScript treats thenable objects specially because `await` and `Promise.resolve()` automatically work with them.

## Basic Example

```javascript
const thenable = {
  then(resolve, reject) {
    resolve('Hello from thenable!')
  }
}

thenable.then(value => {
  console.log(value)
})
```

**Output:**

```
Hello from thenable!
```

Although `thenable` is just a plain object, it can be used like a Promise because it has a `then()` method.

---

## Using `await` with a Thenable

```javascript
const thenable = {
  then(resolve) {
    setTimeout(() => {
      resolve('Data received')
    }, 2000)
  }
}

async function getData() {
  const result = await thenable
  console.log(result)
}

getData()
```

**Output (after 2 seconds):**

```
Data received
```

Even though `thenable` is **not** a Promise, `await` recognizes its `then()` method and waits for it.

---

## Promise.resolve() with Thenables

```javascript
const thenable = {
  then(resolve) {
    resolve(100)
  }
}

Promise.resolve(thenable).then(console.log)
```

**Output:**

```
100
```

`Promise.resolve()` checks whether the value has a `.then()` method.

- If **yes**, it calls that method.
- If **no**, it simply resolves with the value.

---

## Creating a Thenable Class

```javascript
class Delay {
  constructor(ms) {
    this.ms = ms
  }

  then(resolve) {
    setTimeout(() => {
      resolve(`Finished after ${this.ms} ms`)
    }, this.ms)
  }
}

async function test() {
  const result = await new Delay(3000)
  console.log(result)
}

test()
```

**Output (after 3 seconds):**

```
Finished after 3000 ms
```

Here, `Delay` isn't extending `Promise`, but it still works with `await`.

---

## Is a Thenable a Promise?

```javascript
const thenable = {
  then(resolve) {
    resolve('Hi')
  }
}

console.log(thenable instanceof Promise)
```

**Output:**

```
false
```

A thenable is **not** necessarily a Promise.

---

## Promise vs Thenable

| Promise                                 | Thenable                                       |
| --------------------------------------- | ---------------------------------------------- |
| Built-in JavaScript object              | Any object with a `.then()` method             |
| Created using `new Promise()`           | Can be a plain object or class                 |
| Has `.then()`, `.catch()`, `.finally()` | Only needs `.then()`                           |
| `instanceof Promise` is `true`          | Usually `false`                                |
| Follows full Promise specification      | Doesn't have to implement the full Promise API |

---

## Why Do Thenables Exist?

Thenables allow custom asynchronous objects to integrate seamlessly with JavaScript's Promise ecosystem.

Examples include:

- Custom asynchronous libraries
- Lazy-loading objects
- Database query builders
- Some ORMs (such as Mongoose queries, which are thenable)
- Framework-specific async abstractions

---

## Interview Definition

> A **thenable** is any object that implements a `then(resolve, reject)` method. JavaScript treats thenables like Promises, so they work with `await`, `Promise.resolve()`, and Promise chaining even though they are not actual `Promise` instances.

### Key Takeaways

- ✅ A thenable is **any object with a `.then()` method**.
- ✅ It does **not** have to be an actual `Promise`.
- ✅ `await` works with thenables.
- ✅ `Promise.resolve()` automatically adopts thenables.
- ✅ Thenables enable custom asynchronous objects to behave like Promises.
