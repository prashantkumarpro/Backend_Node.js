## 🌐 What is a MAC Address?

![Image](https://www.teracomtraining.com/images/xmac-address.jpg.pagespeed.ic.Rxqv6LRAWR.jpg)

![Image](https://grok.lsu.edu/image/33570.jpg)

![Image](https://media.geeksforgeeks.org/wp-content/uploads/mac-notation.jpg)

![Image](https://network-byte.com/wp-content/uploads/2023/12/difference-between-a-MAC-address-vs.-IP-address.png)

**MAC Address** stands for **Media Access Control Address**.

It is a **unique physical address** given to every network-enabled device (like mobile phones, laptops, Wi-Fi cards, Ethernet cards).

---

## 🔑 Simple Definition

A **MAC address** is a **permanent identity number** of a device on a network.

👉 Think of it like:

* **MAC Address = Device’s fingerprint**
* **IP Address = Device’s temporary location**

---

## 📌 Key Points (Very Important)

* ✅ **Uniquely identifies a device**
* 🔒 **Assigned by the manufacturer**
* 💾 **Stored in hardware (Network Interface Card – NIC)**
* 🔁 **Does not change** (normally)
* 🏠 **Used inside local networks (LAN)**

---

## 🧱 MAC Address Format

Example:

```
00:1A:2B:3C:4D:5E
```

* Total: **48 bits**
* Written in **hexadecimal**
* Split into **6 parts (bytes)**

### Meaning:

* **First 3 bytes** → Company / Manufacturer ID
* **Last 3 bytes** → Unique device number

---

## 📡 Where is MAC Address Used?

### 1️⃣ Inside Local Network (LAN)

* Routers and switches use MAC addresses to deliver data **inside the same network**.

### 2️⃣ Wi-Fi & Ethernet Communication

* When your phone connects to Wi-Fi, the router identifies it using its **MAC address**.

### 3️⃣ Network Security

* **MAC filtering**: Allow/deny specific devices.

---

## 🆚 MAC Address vs IP Address

| Feature     | MAC Address         | IP Address          |
| ----------- | ------------------- | ------------------- |
| Type        | Physical address    | Logical address     |
| Assigned by | Manufacturer        | Network / ISP       |
| Changes?    | ❌ No                | ✅ Yes               |
| Used where  | Local network       | Internet & networks |
| Example     | `00:1A:2B:3C:4D:5E` | `192.168.1.1`       |

---

## 🔍 How to Check MAC Address?

### On Windows:

```
ipconfig /all
```

### On Linux / Mac:

```
ifconfig
```

### On Mobile:

* Settings → About Phone → Status → MAC Address

---

## 🧠 Real-Life Example

📦 Sending a parcel:

* **IP Address** → City & house address
* **MAC Address** → Person’s name & identity

Even if the house changes, the **person remains the same**.

---

## 🧑‍💻 Why Developers Should Care (Backend / Networking)

Since you are learning **Networking + Node.js**:

* MAC address helps you understand:

  * How devices talk **inside a network**
  * How routers forward packets
  * How ARP (Address Resolution Protocol) works

👉 MAC address = **foundation of networking**

---
