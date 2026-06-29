# WeatherGuard Admin

WeatherGuard Admin is a full-stack weather alert management system built with **NestJS**, **React**, and **MongoDB**. It provides an invite-only workflow where users authenticate using Google, request access, and are manually approved by an administrator. Once approved, users can link their Telegram account and automatically receive weather alerts.

## Features

* Google OAuth Authentication
* JWT-based Authorization
* Admin Approval Workflow
* User Management Dashboard
* Telegram Bot Integration
* Weather API Integration
* Automated Weather Alert Scheduler
* MongoDB Database

---

# Tech Stack

### Backend

* NestJS
* MongoDB
* Mongoose
* Passport.js
* JWT
* Node Telegram Bot API
* WeatherAPI

### Frontend

* React
* React Router
* Tailwind CSS

---

# System Design

                Google OAuth
                     │
                     ▼
             React Admin Panel
                     │
                     ▼
               NestJS Backend
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
    MongoDB      WeatherAPI    Telegram Bot
                     │
                     ▼
           Automated Weather Alerts

## User Schema

```text
User
├── _id
├── name
├── email
├── role
├── status
├── telegramChatId
├── createdAt
└── updatedAt
```

### Field Description

| Field          | Description             |
| -------------- | ----------------------- |
| _id            | MongoDB User ID         |
| name           | User's name             |
| email          | Google email            |
| role           | admin / user            |
| status         | pending / approved      |
| telegramChatId | Linked Telegram chat ID |

---

# Application Flow

## Authentication

1. User signs in using Google OAuth.
2. If the user does not exist, a new user document is created.
3. New users are assigned:

   * role = user
   * status = pending
4. JWT token is generated.

---

## Approval Workflow

1. Admin logs into the dashboard.
2. Admin views pending users.
3. Admin clicks **Approve**.
4. User status changes from **pending** to **approved**.
5. Pending users automatically detect approval and navigate to the Approved page.

---

## Telegram Integration

1. Approved user opens the Telegram bot.
2. User sends:

```
/start <MongoDB_User_ID>
```

3. Bot stores the user's Telegram Chat ID.
4. Bot sends the current weather.
5. User is now subscribed to weather alerts.

---

## Automated Weather Alerts

A scheduled cron job periodically checks the configured city's weather.

If severe weather conditions (Rain, Storm, Snow) are detected:

* Fetch all approved users
* Verify Telegram Chat ID exists
* Send Telegram weather alert

Only approved users with linked Telegram accounts receive notifications.

# Project Structure

```
weatherguard/

├── api/
│   ├── auth/
│   ├── users/
│   ├── telegram/
│   ├── weather/
│   └── ...
│
├── admin/
│   ├── pages/
│   ├── components/
│   └── ...
```

---

# Setup Instructions

## Clone Repository

```bash
git clone 
cd weatherguard
```

---

## Backend

```bash
cd api

npm install

npm run start:dev
```

Backend runs on:

```
http://localhost:3000
```

---

## Frontend

```bash
cd admin

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside the `api` folder using the provided `.env.example`.

---

# Demo Workflow

1. Login using Google.
2. User enters Pending state.
3. Admin approves the user.
4. User connects Telegram using `/start <MongoDB_User_ID>`.
5. Telegram account is linked.
6. Scheduled weather checks send automated alerts to approved users.

