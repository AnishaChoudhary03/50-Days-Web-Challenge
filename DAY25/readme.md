# 🚀 Day 25 – Application Engine & Modular Architecture

Welcome to **Day 25 of my 50-Day Web Development Challenge!**

Today, I focused on **refactoring and orchestrating JavaScript functionality** into a centralized Application Engine. After building multiple features across Phase 2, the goal was to organize the code into a cleaner, modular, and conflict-free architecture.

## 📌 What I Learned

* Code refactoring and modular architecture
* Creating a centralized `app.js`
* Initialization functions
* Using `DOMContentLoaded`
* Managing global and local application state
* Preventing duplicate event listeners
* SPA lifecycle management
* Re-initializing features after route changes
* Integrating multiple JavaScript modules
* Working with the Browser History API
* Managing DOM elements dynamically

## 🏗️ Application Architecture

The application was reorganized around a central initialization engine:

```text
index.html
    ↓
app.js
    ↓
initApp()
    ├── initThemeToggle()
    ├── initMobileMenu()
    └── router()
          ├── Home
          ├── Team
          │    └── initScrollObserver()
          ├── Membership
          │    └── initFormValidation()
          └── Dashboard
               └── initKanbanBoard()
```

## 🛠️ Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)
* DOM API
* LocalStorage API
* History API
* Intersection Observer API
* Drag & Drop API
* VS Code
* Git & GitHub

## 🎯 Day 25 Goal

The goal was to merge the JavaScript functionality developed throughout Phase 2 into a **single Application Engine**.

Instead of allowing scripts and event listeners to run independently, each feature is now controlled through dedicated initialization functions and executed only when required.

## ✨ Key Features

### ⚙️ Centralized Application Engine

Created a master `app.js` file responsible for initializing and coordinating application features.

### 🧩 Modular Initialization

Features were wrapped inside dedicated functions such as:

```javascript
function initThemeToggle() {
    // Theme logic
}

function initKanbanBoard() {
    // Kanban logic
}
```

### 🧭 SPA Router Integration

The router now initializes page-specific functionality whenever a new route is rendered.

### 🌙 Global Features

Features such as the **theme toggle** and **mobile navigation** are initialized once through `initApp()`.

### 📋 Local Features

Features such as form validation, scroll observers, and the Kanban board are initialized only when their corresponding SPA view is loaded.

### 💾 Kanban Persistence

As a bonus challenge, the Kanban board state is stored in **LocalStorage** whenever a task is dropped and restored when the relevant route loads.



## 💡 Outcome

Successfully refactored the application into a **centralized and modular JavaScript architecture**.

The project now has better separation of concerns, controlled initialization, SPA-compatible event handling, and persistent Kanban state.

This marks an important step from simply building features to understanding **how real applications are structured and maintained**.

### 🔥 Progress

**Day 25 / 50 — Refactor. Orchestrate. Build Smarter. ⚙️**

#50DayChallenge #WebDevelopment #JavaScript #CodeRefactoring #ModularArchitecture #SPA #DOM #LocalStorage #FrontendDevelopment #GitHub #LearningInPublic
