# 🚀 Day 34 – Network Resilience

Welcome to **Day 34 of my 50-Day Web Development Challenge!**

Today, I focused on **Network Resilience** and learned how to make API requests more reliable by automatically retrying failed requests using **Exponential Backoff**.

## 📌 What I Learned

* Understanding network failures
* Handling failed API requests
* Implementing automatic retries
* Using `async/await` with error handling
* Understanding Exponential Backoff
* Adding delays between retry attempts
* Limiting the maximum number of retries
* Handling temporary network failures
* Improving reliability of API communication

## 🔄 Retry Flow

```text
API Request
     ↓
  Success?
   ↙     ↘
 YES      NO
  ↓        ↓
Return   Retry?
Data    ↙     ↘
       YES     NO
        ↓       ↓
   Wait with   Show
   Backoff     Error
        ↓
   Retry Request
```

## ⏱️ Exponential Backoff

Instead of retrying immediately, the delay increases after each failed attempt.

```text
Attempt 1 → Request
Attempt 2 → Wait → Retry
Attempt 3 → Wait longer → Retry
Attempt 4 → Wait even longer → Retry
```

This prevents the application from sending too many requests in a short period.

## ✨ Key Features

* 🔄 Automatic request retries
* ⏱️ Exponential backoff delay
* 🔢 Maximum retry limit
* ⚠️ Error handling
* 🌐 Improved API reliability
* 🚫 Prevents unnecessary rapid requests
* 📱 Better experience during temporary network failures

## 🛠️ Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)
* Fetch API
* Async/Await
* Promises
* Error Handling
* REST API
* VS Code
* Git & GitHub

## 🎯 Day 34 Goal

The goal was to build a more **resilient API layer** that doesn't immediately fail when a temporary network problem occurs.

## 📂 Project Structure

```text
Day-34/
│── index.html
│── style.css
│── app.js
│── README.md
```

## 💡 Outcome

Successfully implemented a retry mechanism with **Exponential Backoff**, improving the application's ability to recover from temporary network failures.

This strengthened my understanding of **error handling, asynchronous JavaScript, API reliability, and resilient application design**.

### 🔥 Progress

**Day 34 / 50 — Retry. Recover. Stay Resilient. 🔄**

#50DayChallenge #WebDevelopment #JavaScript #NetworkResilience #ExponentialBackoff #API #FetchAPI #AsyncJavaScript #FrontendDevelopment #GitHub #LearningInPublic
