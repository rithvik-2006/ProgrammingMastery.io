

# 🧠 CodeMastery - Master Advanced Programming Concepts

**CodeMastery** is a modern, dark-themed web platform built with **React.js** and **Express.js**, designed to help programmers deeply understand the toughest concepts in computer science through interactive learning.

## 🚀 Features

* **Dynamic Pop Quiz System**
  Auto-generates challenging quizzes on:

  * Algorithms
  * Data Structures
  * System Design
  * Low-level Programming

* **Concise Documentation Hub**
  Includes:

  * Clear explanations
  * Code snippets
  * Real-world examples

* **Modern UI/UX**

  * Fully responsive layout
  * Smooth animations
  * Minimalistic dark mode
  * Card-based interactive components

* **User System**

  * Secure authentication
  * Progress tracking
  * Personalized quiz history

## 🛠 Tech Stack

### Frontend

* React.js
* Tailwind CSS (dark theme)
* Framer Motion (animations)

### Backend

* Express.js
* MongoDB (data storage)
* JWT for authentication
* REST API for quizzes & docs

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/codemastery.git
cd codemastery
```

### 2. Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Start development servers

```bash
# Frontend
npm run dev

# Backend
npm run start
```


## 📚 Documentation

All learning content is organized into modules:

* Fast-access search
* Downloadable code snippets
* Real-world use cases per topic

## 🧪 API Endpoints (Sample)

```http
GET    /api/docs/:topic       // Fetch documentation by topic
POST   /api/quiz/start        // Start a new quiz
POST   /api/auth/register     // User signup
POST   /api/auth/login        // User login
GET    /api/progress          // Get user progress
```

## 📌 Future Plans

* Add leaderboard and timed quizzes
* Integrate AI for smart question generation
* Weekly challenges & certifications



