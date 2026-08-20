# 🚀 Day 36 – Deep Linking & URL Search Parameters

Welcome to **Day 36 of my 50-Day Web Development Challenge!**

Today, I explored **Deep Linking and URL Search Parameters** and learned how to synchronize application state with the browser's address bar.

A user should be able to filter data or search for specific content, copy the URL, and share the exact application state with someone else.

## 📌 What I Learned

* Understanding Deep Linking
* Working with URL search parameters
* Using the `URLSearchParams` API
* Reading values from the URL
* Updating the browser URL dynamically
* Synchronizing UI state with URL parameters
* Preserving search and filter state
* Supporting page refresh without losing state
* Creating shareable application URLs
* Integrating URL parameters with SPA routing

## 🔄 Application Flow

```text
User Searches / Filters Data
            ↓
Update Application State
            ↓
Update URL Parameters
            ↓
URL Can Be Copied & Shared
            ↓
User Opens Shared URL
            ↓
Read URL Parameters
            ↓
Restore Search / Filter State
```

## ✨ Key Features

* 🔗 Shareable application URLs
* 🔍 Search state stored in the URL
* 🗂️ Filter state stored in the URL
* 🔄 State restored after page refresh
* ↩️ Browser navigation support
* ⚡ Dynamic URL updates
* 🧭 Integration with SPA routing

## 🛠️ Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)
* `URLSearchParams`
* History API
* `history.pushState()`
* `history.replaceState()`
* DOM API
* VS Code
* Git & GitHub

## 🎯 Day 36 Goal

The goal was to bridge the gap between **JavaScript application state and the browser URL**.

Instead of keeping search and filter information only in JavaScript memory, the application now stores important state in the URL, allowing users to refresh, bookmark, or share the exact view they are using.

## 📂 Project Structure

```text
Day-36/
│── index.html
│── style.css
│── app.js
│── README.md
```

## 💡 Outcome

Successfully implemented **Deep Linking and URL Search Parameters** to create a more shareable and persistent web application experience.

This strengthened my understanding of **state management, browser APIs, SPA routing, URL synchronization, and user-friendly application design**.

### 🔥 Progress

**Day 36 / 50 — Search. Share. Restore. 🔗**

#50DayChallenge #WebDevelopment #JavaScript #DeepLinking #URLSearchParams #SPA #HistoryAPI #StateManagement #FrontendDevelopment #GitHub #LearningInPublic
