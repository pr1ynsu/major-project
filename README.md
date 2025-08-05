
## 🚀 Government Chalan & Forum System

This project is a **full-stack application** with:

* 🖥 **Frontend** built in **React (Vite)**
* ⚙ **Backend** built in **Django (REST API + WebSockets)**
* 🔐 **Authentication** (User/Government/Developer roles)
* 💬 **Real-time Forum** (Chat + role tags)
* 📂 **CSV export of registered users**

---

## 📂 **Project Structure**

```
major-project/
│── FrontEnd/website/       # React frontend
│   ├── src/
│   │   ├── components/     # Navbar, Footer, etc.
│   │   ├── pages/          # Login, Signup, Contact, Gallery, Forum
│   │   ├── App.jsx
│   │   └── main.jsx
│── BackEnd/major_backend/  # Django backend
│   ├── authapp/            # Authentication API
│   ├── forumapp/           # Forum WebSocket
│   ├── db.sqlite3
│   ├── manage.py
│── README.md
```

---

## ⚡ **Features**

✅ User registration & login (roles: **User**, **Developer**, **Government**)
✅ Unique token generated for every registered user
✅ All registered users are saved in a **CSV file**
✅ Real-time chat forum with role badges
✅ Government portal for Chalan details (future feature)
✅ Responsive UI with **glassmorphism theme**

---

## 🛠 **Tech Stack**

* **Frontend**: React (Vite), React Router, Tailwind CSS
* **Backend**: Django, Django REST Framework, Django Channels (WebSockets)
* **Database**: SQLite (development)
* **Communication**: WebSocket for live chat
* **Data Storage**: CSV export for registered users

---

## ⚙ **Installation & Setup**

### **1️⃣ Clone the repository**

```bash
git clone <your-repo-url>
cd major-project
```

---

### **2️⃣ Backend Setup (Django)**

```bash
cd BackEnd
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt  # Install dependencies
python manage.py migrate         # Apply migrations
python manage.py runserver       # Start Django backend
```

The backend runs at: **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

---

### **3️⃣ Frontend Setup (React + Vite)**

```bash
cd FrontEnd/website
npm install       # Install dependencies
npm run dev       # Start frontend
```

The frontend runs at: **[http://localhost:5173/](http://localhost:5173/)**

---

## 🔑 **Authentication API Endpoints**

| Method | Endpoint     | Description                   |
| ------ | ------------ | ----------------------------- |
| POST   | `/register/` | Register new user             |
| POST   | `/login/`    | Login user                    |
| GET    | `/users.csv` | Download registered users CSV |

---

## 💬 **Forum (WebSocket)**

* WebSocket URL:

```
ws://127.0.0.1:8000/ws/forum/
```

* Messages include: `username`, `role`, `message`
* Roles displayed with **color badges** in chat

---

## 📌 **Future Features**

* 🚦 Government Chalan Management System
* 📜 View past forum discussions from database
* 🔔 Real-time notifications for important updates
