## 🌐 Understanding IPv4 Addresses — **In Depth & Simple**
This is all abbout IPv4 in very very depth

![Image](https://media.geeksforgeeks.org/wp-content/uploads/20241205124156693253/IPv4-address-format.webp?utm_source=chatgpt.com)

![Image](https://www.geoplugin.com/resources/wp-content/uploads/2024/10/IP-Address-in-dotted-decimal-notation.png?utm_source=chatgpt.com)

![Image](https://media.geeksforgeeks.org/wp-content/cdn-uploads/IP_addressing_3.jpg?utm_source=chatgpt.com)

![Image](https://study-ccna.com/wp-content/images/classes_of_ip_addresses.jpg?utm_source=chatgpt.com)

![Image](https://i.adroitacademy.com/blog/43892065.jpg?utm_source=chatgpt.com)

![Image](https://www.firewallflow.com/wp-content/uploads/2025/08/IPv4-Address-Classes.webp?utm_source=chatgpt.com)

I’ll explain IPv4 **from absolute basics to interview-level depth**, in **clear, simple English**, with **real-world + developer examples** (Node.js friendly).

---

## 1️⃣ What is an IPv4 Address?

An **IPv4 address** is a **32-bit unique number** given to a device on a network so it can **send and receive data**.

👉 Think of it like a **house address** for a device.

Example:

```
192.168.1.10
```

---

## 2️⃣ Why IPv4 Has 4 Numbers (Dotted Decimal)?

IPv4 = **32 bits**
32 bits are divided into **4 parts (octets)**
Each octet = **8 bits**

```
192 . 168 . 1 . 10
 8b    8b    8b   8b
```

Each octet value range:

```
0 – 255
```

---

## 3️⃣ Binary Form of IPv4 (Very Important)

Computers understand **binary (0,1)**, not decimal.

Example:

```
192.168.1.10
```

Binary:

```
11000000.10101000.00000001.00001010
```

📌 Interview Tip:
**IPv4 = 32 bits = 4 octets × 8 bits**

---

## 4️⃣ Network Part vs Host Part

Every IPv4 address has **two parts**:

| Part       | Meaning                |
| ---------- | ---------------------- |
| Network ID | Identifies the network |
| Host ID    | Identifies the device  |

Example:

```
192.168.1.10/24
```

* Network → `192.168.1`
* Host → `10`

---

## 5️⃣ Subnet Mask (Key Concept 🔑)

A **subnet mask** tells:

> Which part is **network** and which part is **host**

Example:

```
Subnet Mask: 255.255.255.0
```

Binary:

```
11111111.11111111.11111111.00000000
```

* `1` → Network bits
* `0` → Host bits

---

## 6️⃣ Classes of IPv4 Addresses (Classic Concept)

| Class | Range                       | Default Mask  | Use                 |
| ----- | --------------------------- | ------------- | ------------------- |
| A     | 1.0.0.0 – 126.255.255.255   | 255.0.0.0     | Very large networks |
| B     | 128.0.0.0 – 191.255.255.255 | 255.255.0.0   | Medium              |
| C     | 192.0.0.0 – 223.255.255.255 | 255.255.255.0 | Small               |
| D     | 224–239                     | —             | Multicast           |
| E     | 240–255                     | —             | Research            |

📌 **Modern networks use CIDR, not classes**, but classes are asked in interviews.

---

## 7️⃣ Private vs Public IPv4 Addresses

### 🔹 Private IP (Internal use)

Not accessible from the internet.

| Range                         |
| ----------------------------- |
| 10.0.0.0 – 10.255.255.255     |
| 172.16.0.0 – 172.31.255.255   |
| 192.168.0.0 – 192.168.255.255 |

Example:

```
192.168.1.5
```

### 🔹 Public IP

Given by ISP, globally unique.

Example:

```
142.250.190.14 (Google)
```

---

## 8️⃣ Special IPv4 Addresses (Must Know)

| Address           | Meaning              |
| ----------------- | -------------------- |
| 0.0.0.0           | Unknown / default    |
| 127.0.0.1         | Loopback (localhost) |
| 255.255.255.255   | Broadcast            |
| Network address   | First IP             |
| Broadcast address | Last IP              |

Example `/24`:

```
Network: 192.168.1.0
Broadcast: 192.168.1.255
```

---

## 9️⃣ CIDR Notation (Modern Way)

CIDR = **Classless Inter-Domain Routing**

Format:

```
IP / number_of_network_bits
```

Example:

```
192.168.1.10/24
```

* `/24` → Network bits
* Host bits = `32 - 24 = 8`
* Total hosts = `2⁸ - 2 = 254`

---

## 🔟 Subnetting (Core Skill 🔥)

### Example:

```
192.168.1.0/26
```

* Host bits = 6
* Hosts per subnet = `2⁶ - 2 = 62`
* Subnets = 4

Subnets:

```
192.168.1.0 – 63
192.168.1.64 – 127
192.168.1.128 – 191
192.168.1.192 – 255
```

---

## 1️⃣1️⃣ NAT (Why IPv4 Still Works)

NAT = **Network Address Translation**

* Private IP → Public IP
* Used in routers

Example:

```
192.168.1.10 → 103.21.45.9
```

📌 NAT saved IPv4 from exhaustion.

---

## 1️⃣2️⃣ IPv4 in Real Web Development (Node.js)

### Request flow:

```
Browser (IP) → DNS → Server IP → Response
```

### Node.js example:

```js
req.ip
```

Reverse proxy:

```js
req.headers['x-forwarded-for']
```

---

## 1️⃣3️⃣ IPv4 Limitations

❌ Limited addresses (≈ 4.3 billion)
❌ Needs NAT
❌ Security issues

➡ Solution: **IPv6**

---

## 🎯 Interview One-Liners

* IPv4 Is a  **32-bit address**
* Max IPv4 addresses  is =  to **2³²**
* Loopback = **127.0.0.1**
* Private IPs are **not routable on internet**
* Subnet mask defines **network & host**

---



