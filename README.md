---

# Real-Time Collaborative Text Editor

A simple Next.js project demonstrating real-time collaboration using WebSockets.

---

## 🚀 Getting Started

### 1. Create Environment Files

**Root folder: `.env.local`**

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

**Backend folder: `backend/.env`**

```env
PORT=3001  
ORIGIN='http://localhost:3000'
```

### 2. Install Dependencies

**Frontend**

```bash
npm i
npm run dev
```

**Backend**

```bash
cd backend
npm i
npm run dev
```

---

## 📝 About

A simple text editor with real-time collaboration between two users via WebSockets.

---

## ⚙️ How It Works

1. **Start a session:** Peer 1 creates a session.
2. **Join the session:** Peer 2 clicks “Join Session.”
3. **Collaborate:** Both can edit simultaneously with real-time updates.

---

## ✨ Features

* Real-time synchronization
* Markdown support (e.g., `# Hello World` → `<h1>Hello World</h1>`)

---

Let me know if you'd like this in markdown format too.
