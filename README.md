This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, create 2 env files

One in the root folder
 ```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
npm i
npm run dev

```
The second one in root/backend
 ```bash
# ./backend/.env.
PORT = 3001
ORIGIN = 'http://localhost:3000'
```

install dependencies and start the frontend server:
```bash
npm i
npm run dev
```
install dependencies and start the backend server:

```bash
cd /backend
npm i
npm run dev
```

## About

This project is a simple text editor that demonstrates real-time collaboration between two users using WebSockets.

### How It Works
1. **Start a session**: Peer 1 creates a session.
2. **Join the session**: Peer 2 clicks "Join Session" after the session is created.
3. **Collaborate**: Both users can type in the text area and see changes reflected in real time.

### Features
- Real-time synchronization
- Markdown support (e.g., `# Hello World` renders as `<h1>`)
