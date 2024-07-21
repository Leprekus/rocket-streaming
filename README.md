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

# About
This project is intended to be a simple text editor showcasing real time collaboration between two peers using websockets.
To start first have peer 1 create a session, and once it's been created peer to may click join session.
Once you begin typing in the text area you'll see all changes reflected in real time.
Furthermore, the textarea has markdown support so typing something such as # Hello World will render an \<h1>
