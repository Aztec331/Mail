# 📬 Mail — Web-Based Email Client

## 🚀 Overview

Mail is a full-stack web application that provides a clean and responsive email client interface.
Users can compose, send, receive, archive, and manage emails through an intuitive browser-based experience.

The project demonstrates backend-driven UI rendering, asynchronous client-server communication, and structured data handling in a modern web application.

---

## ✨ Features

* 📥 Inbox, Sent, and Archive mailboxes
* ✉️ Compose and send emails
* 🔄 Asynchronous email loading (no full page refresh)
* 🗂️ Archive and unarchive messages
* 👁️ Mark emails as read/unread
* 📱 Responsive user interface

---

## 🛠️ Tech Stack

**Backend**

* Python
* Django

**Frontend**

* HTML
* CSS
* Bootstrap
* JavaScript

**Database**

* SQLite

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Aztec331/Mail.git
cd Mail
```

### 2️⃣ Create virtual environment

```bash
python -m venv venv
source venv/bin/activate      # macOS / Linux
venv\Scripts\activate         # Windows
```

### 3️⃣ Install dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Run migrations

```bash
python manage.py migrate
```

### 5️⃣ Start the development server

```bash
python manage.py runserver
```

Open in browser:

```
http://127.0.0.1:8000
```

---

## 🧩 Project Structure

```
Mail/
│
├── mail/            # Core application logic
├── templates/       # HTML templates
├── static/          # CSS, JS, assets
├── db.sqlite3       # Database
└── manage.py        # Django entry point
```

---

## 👨‍💻 My Role

Designed and developed the application end-to-end, including:

* Backend architecture and data models
* API endpoints and business logic
* Frontend integration with dynamic UI updates
* Database design and email workflow implementation

---

## 💡 What This Project Demonstrates

* Full-stack web development with Django
* REST-style backend communication
* DOM manipulation and async JavaScript
* CRUD operations with structured databases
* Building responsive UI with Bootstrap

---

## 📜 License

This project is for educational and portfolio purposes.
