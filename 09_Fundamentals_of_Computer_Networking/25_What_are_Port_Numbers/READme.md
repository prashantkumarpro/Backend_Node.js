## 🔌 What are Port Numbers?

![Image](https://media.geeksforgeeks.org/wp-content/uploads/20231203014759/imresizer-1701548045427.jpg)

![Image](https://study-ccna.com/wp-content/uploads/2016/03/how_ports_work.jpg)

![Image](https://www.tcpipguide.com/free/diagrams/portsaddressing.png)

**Port numbers** are like **door numbers** on a computer or server.

* An **IP address** tells *which computer* to reach.
* A **port number** tells *which application/service* on that computer should receive the data.

👉 **IP = House address**
👉 **Port = Specific room/door in the house**

---

## 🧠 Simple Definition

A **port number** is a **numeric identifier (0–65535)** used by computers to send data to the **correct application or service**.

---

## 📦 Why Port Numbers Are Needed

Many apps run on the same device at the same time:

* Web browser
* Email
* Database
* Game server

Without port numbers, the computer would not know:

> “This data is for the website” or
> “This data is for the database”

---

## 🔢 Port Number Ranges

### 1️⃣ Well-Known Ports (0–1023)

Used by standard services.

| Port | Service            |
| ---: | ------------------ |
|   80 | HTTP (Web)         |
|  443 | HTTPS (Secure Web) |
|   21 | FTP                |
|   22 | SSH                |
|   25 | SMTP (Email)       |

---

### 2️⃣ Registered Ports (1024–49151)

Used by specific applications.

|  Port | Use            |
| ----: | -------------- |
|  3306 | MySQL          |
| 27017 | MongoDB        |
|  8080 | Alternate HTTP |

---

### 3️⃣ Dynamic / Private Ports (49152–65535)

* Temporarily assigned
* Mostly used by client apps (browser, mobile apps)

---

## 🌐 Real-Life Example (Very Important)

When you open a website:

```
https://google.com
```

Behind the scenes:

* IP → Google’s server
* Port → **443 (HTTPS)**

So the request is actually:

```
Google-IP : 443
```

---

## 🧑‍💻 Developer Example (Node.js)

```js
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

This means:

* Your computer is the **IP**
* Your Node.js app listens on **port 3000**

Accessed as:

```
http://localhost:3000
```

---

## 🔄 One IP, Many Ports

A single server can run:

* Website → Port 80
* API → Port 3000
* Database → Port 27017

All on **one IP address** 🤯

---

## 🧠 One-Line Summary

> **Port numbers tell a computer which application should receive incoming network data.**

---

