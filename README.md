# 📸 InstaMini — Instagram-like MERN Social Media App

InstaMini is a full-stack **Instagram-inspired social media application** built using the **MERN stack**.
It replicates core Instagram features with a clean UI, smooth UX, and scalable backend architecture.

This project demonstrates **real-world full-stack development**, not a tutorial-level clone.

---

## 🚀 Features

### 🔐 Authentication

* User signup & login
* JWT-based authentication
* Secure password hashing (bcrypt)
* Protected routes
* Logout from anywhere

### 👤 User Profiles

* View own & other users’ profiles
* Upload / remove profile picture
* Followers & following count
* Follow / Unfollow users
* Instagram-style profile layout
* Modal-based post viewing (no page reload)

### 🖼️ Posts

* Create image posts
* Feed with posts from followed users
* Like / Unlike posts (real-time)
* Comment on posts
* Delete own posts
* Instagram-style post modal inside profile

### ❤️ Interactions

* Toggle like (red/white heart like Instagram)
* Live like count updates
* Comment list with user avatars
* Show / hide comments

### 🔍 Search

* Search users by username
* Full-screen search UI
* Recent searches (Instagram-style UX)

### 📱 Responsive UI

* Mobile-first design
* Desktop Instagram-style sidebar
* Mobile navbar + footer navigation
* Smooth modals and transitions

---

## 🧠 Tech Stack & Usage

### 🖥️ Frontend

* **React** – Component-based UI
* **React Router** – Client-side routing
* **Tailwind CSS** – Responsive styling
* **Axios** – API communication
* **React Icons** – Instagram-style icons

### 🌐 Backend

* **Node.js** – Server runtime
* **Express.js** – REST API framework
* **MongoDB** – NoSQL database
* **Mongoose** – MongoDB ODM
* **JWT** – Authentication
* **bcryptjs** – Password hashing
* **Multer** – File uploads
* **Cloudinary** – Image storage

### ☁️ Deployment

* **Render** – Backend hosting
* **MongoDB Atlas** – Cloud database
* **Cloudinary** – Media hosting

---

## 🗂️ Project Structure

```
InstaMini/
│
├── client/              # React frontend
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── App.jsx
│
├── server/              # Node + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.js
│
└── README.md
```

---

## 🔌 Core API Endpoints

* `/auth/register` – Signup
* `/auth/login` – Login
* `/users/me` – Own profile
* `/users/:id` – User profile
* `/users/:id/follow` – Follow user
* `/users/:id/unfollow` – Unfollow user
* `/posts` – Create post
* `/posts/:id/like` – Like post
* `/posts/:id/unlike` – Unlike post
* `/posts/:id/comment` – Add comment
* `/feed` – User feed

---

## ⚙️ Environment Variables

Create a `.env` file inside the `server/` folder:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🧑‍💻 How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/InstaMini.git
cd InstaMini
```

### 2️⃣ Start Backend

```bash
cd server
npm install
npm start
```

Backend runs on:
👉 `http://localhost:5000`

### 3️⃣ Start Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:
👉 `http://localhost:5173`

---

## 🔐 Authentication Flow

1. User signs up or logs in
2. JWT stored in `localStorage`
3. Token sent in request headers for protected routes
4. Backend verifies token for every request

---

## 🎯 Why This Project Stands Out

* Instagram-like UX (profiles, modals, interactions)
* Clean backend architecture
* Real authentication & authorization
* Media uploads with Cloudinary
* Fully deployable production-ready app

This is a **portfolio-grade project**, not a basic clone.

---

## 🔮 Future Enhancements

* Stories & Reels
* Notifications
* Saved posts
* Dark mode
* Infinite scrolling
* Real-time chat

---

## 👤 Author

**Kirti Choudhary**
B.Tech CSE | MERN Stack Developer
