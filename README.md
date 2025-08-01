---

# Real-Time Collaborative Text Editor

A simple Next.js project demonstrating real-time collaboration using WebSockets.

---

## 🚀 Getting Started

### 1. Create Environment Files


```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

### 2. Install Dependencies

```bash
cd rocket-streaming
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
