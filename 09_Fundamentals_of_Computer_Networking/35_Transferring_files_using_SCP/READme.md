## Transferring Files Using **SCP (Secure Copy Protocol)**

![Image](https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2022/01/terminal-outputs-debug-messages-for-scp-command-verbose-mode.png)

![Image](https://blog.invgate.com/hs-fs/hubfs/how-does-the-scp-protocol-work.jpg?height=1101\&name=how-does-the-scp-protocol-work.jpg\&width=2001)

![Image](https://techplayon.com/wp-content/uploads/2022/03/SCP_Use.png)

**SCP** is a simple and secure way to transfer files between computers over a network.
It uses **SSH (Secure Shell)** under the hood, so your data is **encrypted** during transfer.

---

## Why use SCP?

* 🔒 **Secure** (encrypted via SSH)
* ⚡ **Fast & simple**
* 🧑‍💻 **Command-line friendly**
* 🌍 Works **locally or over the internet**

---

## Basic Syntax

```bash
scp [options] source destination
```

---

## Common Use Cases

### 1️⃣ Copy a file from **local → remote**

```bash
scp file.txt user@remote_ip:/home/user/
```

**Example**

```bash
scp notes.pdf prashant@192.168.1.10:/home/prashant/docs/
```

---

### 2️⃣ Copy a file from **remote → local**

```bash
scp user@remote_ip:/path/file.txt .
```

```bash
scp prashant@192.168.1.10:/home/prashant/docs/notes.pdf .
```

---

### 3️⃣ Copy a **directory** (very common)

```bash
scp -r myFolder user@remote_ip:/home/user/
```

`-r` = recursive (for folders)

---

### 4️⃣ Copy using a **custom SSH port**

```bash
scp -P 2222 file.txt user@remote_ip:/home/user/
```

> ⚠️ `-P` is **uppercase** for port

---

### 5️⃣ Copy between **two remote servers**

```bash
scp user1@server1:/path/file.txt user2@server2:/path/
```

---

## Useful SCP Options

| Option | Meaning              |
| ------ | -------------------- |
| `-r`   | Copy directories     |
| `-P`   | Specify SSH port     |
| `-C`   | Enable compression   |
| `-v`   | Verbose (debug info) |

---

## How SCP Works (Simple Explanation)

1. Your system opens an **SSH connection**
2. File is **encrypted**
3. File is transferred securely
4. File is written to destination

Think of it like:

> **WhatsApp for files, but over SSH 😄**

---

## Real-World Example (Developer Life)

* Upload build files to a server
* Download logs from production
* Move backups between machines
* Transfer files to a cloud VM

---

## SCP vs SFTP (Quick Note)

| SCP              | SFTP                |
| ---------------- | ------------------- |
| Simple & fast    | More control        |
| One-time copy    | Interactive session |
| Limited features | File browsing       |

---

## ⚠️ Important Notes

* SCP requires **SSH access**
* Password or **SSH key** authentication
* For very large transfers, `rsync` is better

---

