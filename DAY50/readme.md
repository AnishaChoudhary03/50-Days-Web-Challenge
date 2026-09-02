# 🎉 Day 50 - Final Capstone

## Synexus Core

The final project of the 50-Days-Web-Challenge.

---

## 🎯 Objective

Integrate the major web engineering concepts developed throughout the challenge into one polished Vanilla JavaScript application.

---

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript ES6+
- ES Modules
- SPA Routing
- Fetch API
- Promise.all()
- Retry Logic
- Service Workers
- Cache API
- Responsive Design
- Dark Mode

---

## ✨ Features

### SPA Navigation

The application uses client-side hash routing.

Routes:

#/  
#/users  
#/data  
#/about

---

### API Data

GitHub API data is retrieved using the Fetch API.

---

### Parallel Requests

Promise.all() is used to retrieve:

- User information
- Repositories
- Followers

concurrently.

---

### Retry Logic

Failed requests are automatically retried with exponential backoff.

---

### Service Worker

The Service Worker caches core application files.

This allows the application shell to remain available when the network is unavailable.

---

### Online / Offline Detection

The application displays the current network status.

---

### Dark Mode

Users can switch between light and dark themes.

The selected theme is stored in localStorage.

---

### Responsive Design

The interface adapts to:

- Desktop
- Tablet
- Mobile

---

## 📁 Structure

DAY50/

├── index.html  
├── style.css  
├── main.js  
├── router.js  
├── api.js  
├── utils.js  
├── sw.js  
└── readme.md

---

## 🧠 Final Architecture

HTML
↓
CSS
↓
main.js
↓
Router
↓
Views
↓
API
↓
Fetch + Retry
↓
Promise.all()
↓
GitHub API

Service Worker
↓
Cache API
↓
Offline Application Shell

---

## 🏁 Challenge Complete

50 days of modern web development completed using standard browser technologies.

Built with:

HTML + CSS + JavaScript

No framework required.