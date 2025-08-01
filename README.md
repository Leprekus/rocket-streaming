---

# Real-Time Collaborative Text Editor

A simple Next.js project demonstrating real-time collaboration using WebSockets.

---

## 🚀 Getting Started

### 1. Create Environment Files

Create an env for the frontend:
rocket-streaming/.env.local
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

Create and env for the backend:
rocket-streaming/backend/.env
```env
PORT=8080
ORIGIN=http://localhost:3001
```

Note: NEXT_PUBLIC_URL must match the backend's URL
and ORIGIN must match the frontend's URL.

### 2. Install Dependencies and run servers

Frontend:
```bash
cd rocket-streaming/
npm i
npm run dev
```

Backend:
```bash
cd rocket-streaming/backend
npm i
npm run dev
```
---

## 📝 About

A simple text editor with real-time collaboration between two users via WebSockets.

---

## ⚙️ How It Works

1. **Start a session:** Open client one and click "Create session".
2. **Join the session:** Open client two and click “Join Session.”
3. **Type!**: Click anywhere on the screen and begin typing
4. **Collaborate:** Both can edit simultaneously with real-time updates.

---

## ✨ Features

* Real-time synchronization
* Markdown support (e.g., `# Hello World` → `<h1>Hello World</h1>`)

---
