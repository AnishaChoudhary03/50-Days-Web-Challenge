# 🚀 Day 35 – API Security & Authentication

Welcome to **Day 35 of my 50-Day Web Development Challenge!**

Today, I focused on **API Security and Authentication** and learned how protected API endpoints use authentication tokens to verify whether a request is authorized.

## 📌 What I Learned

* Understanding API authentication
* Bearer Token authentication
* Using the `Authorization` HTTP header
* Attaching tokens to API requests
* Sending authenticated `GET`, `POST`, `PUT`, and `DELETE` requests
* Storing and retrieving authentication tokens
* Handling unauthorized requests
* Understanding HTTP `401` and `403` responses
* Protecting sensitive API operations
* Separating authentication logic from application logic

## 🔐 Authentication Flow

```text
User Authentication
        ↓
  Receive Token
        ↓
 Store Token Safely
        ↓
Create API Request
        ↓
Authorization: Bearer <token>
        ↓
   Server Verifies
      ↙       ↘
 Authorized   Unauthorized
    ↓              ↓
 Return Data    Return Error
```

## ✨ Key Features

* 🔑 Bearer Token authentication
* 🛡️ Protected API requests
* 📡 Authorization headers
* 🚫 Unauthorized request handling
* ⚠️ Authentication error handling
* 🔄 Reusable authenticated request logic
* 🔐 Secure request pipeline

## 🛠️ Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript (ES6+)
* Fetch API
* REST API
* HTTP Headers
* Bearer Tokens
* Async/Await
* Local Storage
* VS Code
* Git & GitHub

## 🎯 Day 35 Goal

The goal was to understand how authentication tokens are attached to API requests and how a frontend application can communicate with **protected endpoints**.

## 📂 Project Structure

```text id="m7k4pz"
Day-35/
│── index.html
│── style.css
│── app.js
│── README.md
```

## 💡 Outcome

Successfully implemented an authenticated API request flow using **Bearer Tokens** and learned how authentication and authorization protect sensitive API operations.

This strengthened my understanding of **API security, HTTP authentication, protected endpoints, and secure frontend-to-backend communication**.

### 🔥 Progress

**Day 35 / 50 — Authenticate. Authorize. Secure. 🔐**

#50DayChallenge #WebDevelopment #JavaScript #APISecurity #Authentication #BearerToken #RESTAPI #FetchAPI #FrontendDevelopment #GitHub #LearningInPublic


