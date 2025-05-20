# 🟩 Day 01 - TodoApp

This is the first project of my **100 Days of Code** challenge — a simple and functional Todo List application built with a full-stack approach.

---

## 📦 Tech Stack

- **Backend**: [.NET 8 Minimal API](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis)
- **Database**: In-Memory (no setup needed)
- **Frontend**: [Angular](https://angular.io/)
- **UI Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

## 📁 Project Structure

```
Day01-TodoApp/
│
├── Client/         # Angular frontend application
└── Server/         # .NET 8 Minimal API backend
```

---

## 🚀 How to Run

### 1. Start the Backend (Server)

```bash
cd Server
dotnet run
```

The API should be running at: `https://localhost:5001` or similar.

---

### 2. Start the Frontend (Client)

```bash
cd Client
npm install
ng serve
```

Visit the app at: `http://localhost:4200`

> ⚠️ Make sure the backend is running before starting the frontend.

---

## ✅ Features

- Add and remove todo items
- Track your tasks easily
- Clean and responsive UI
- In-memory storage (reset on refresh)

---

## 📌 Notes

- This is a beginner-level app created to warm up both frontend and backend hands-on coding.
- The backend is stateless and does not persist data after restart.

---

## 🔗 Repository Root

[Back to Main Repo](../..)

---

## 🧠 What I Learned

- Setting up a Minimal API with .NET 8
- Angular basics with reactive forms
- Tailwind CSS layout & design
- Connecting frontend to backend APIs

---

Happy coding! 👨‍💻  
Made with ❤️ by [@aheroglu](https://github.com/aheroglu)
