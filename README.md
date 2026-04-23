# 🗂️ Mini GitHub Clone

> A simplified version control system built from scratch — because the best way to understand Git is to build one.

---

## 📖 Overview

**Mini GitHub Clone** is a full-stack web application that replicates the core workflows of Git and GitHub. Instead of just *using* Git, this project digs into what actually happens under the hood — tracking files, storing commits, managing history, and letting users push and pull changes through a clean web interface.

Built with the **MERN stack** (MongoDB, Express, React, Node.js) and secured with **JWT authentication**.

---

## ✨ Features

| Feature | Status |
|---|---|
| Create a repository (`git init`) | ✅ Working |
| Stage files for tracking (`git add`) | ✅ Working |
| Commit and save changes (`git commit`) | ✅ Working |
| Push and pull data | ✅ Working |
| Revert to previous states | ✅ Working |
| JWT-based authentication | ✅ Working |
| File storage via AWS S3 | 🚧 In Progress |
| Deployment | 🔜 Planned |

---

## 🛠️ Tech Stack

**Frontend**
- [React.js](https://react.dev/) — UI library
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling

**Backend**
- [Node.js](https://nodejs.org/) — Runtime environment
- [Express.js](https://expressjs.com/) — REST API framework

**Database**
- [MongoDB](https://www.mongodb.com/) — NoSQL document storage

**Auth & Storage**
- [JWT](https://jwt.io/) — Stateless authentication
- [AWS S3](https://aws.amazon.com/s3/) — File and blob storage *(in progress)*

---

## 📁 Project Structure

```
mini-github-clone/
├── backend/          # Express API, auth, DB models
├── frontend/         # React app with Tailwind
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd mini-github-clone
```

### 2. Configure Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
JWT_SECRET=your_jwt_secret
PORT=your_port
MONGODB_URI=your_mongodb_connection_string

# AWS S3 (optional — only needed for file storage)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket_name
```

### 3. Start the Backend

```bash
cd backend
npm install
npm start
```

### 4. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173` (or whichever port Vite assigns).

---

## 🧠 What I Learned

- **How version control works internally** — commits, diffs, refs, and history chains
- **REST API design** with Node.js and Express
- **Stateless authentication** using JWTs — signing, verifying, and handling token expiry
- **MongoDB data modeling** for hierarchical structures like repos, commits, and files
- **Cloud storage integration** with AWS S3

---

## 🔮 Roadmap

- [ ] Deploy the full application online
- [ ] Improve UI/UX with a polished GitHub-like interface
- [ ] Add branching and merging support
- [ ] Implement diffing to show what changed between commits
- [ ] Add collaborator/team access per repository
- [ ] Better file handling and large file support via S3

---

## 🎯 Why I Built This

Most developers use Git every day without fully understanding what's happening beneath the surface. This project was my attempt to change that — to go from *using* a tool to *understanding* it by rebuilding its core concepts from scratch.

It's also a practical exercise in full-stack architecture, API design, and working with cloud services.

---

## 📬 Feedback & Contributions

This is a learning project, so rough edges exist! If you spot something that could be improved — in the code, the architecture, or this README — feel free to open an issue or submit a PR. All feedback is welcome.

---

*Built with curiosity 🔍 and a lot of `console.log` statements.*
