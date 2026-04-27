# Frontend Application (React + Vite + Redux)

This project is the frontend for a matchmaking platform.  
It is built using React, TypeScript, Redux Toolkit, and Vite.

The application handles user authentication, profile management, real-time communication, notifications, and dashboard features.

---

## Overview

This frontend provides:

- User authentication (email, OTP, WhatsApp)
- Profile creation and management
- Real-time chat and notifications
- Subscription and dashboard system
- SEO optimized landing pages
- Progressive web features (service worker)

---

## Architecture

The application is divided into:

- UI Layer (React components)
- State Management (Redux Toolkit + Persist)
- API Layer (RTK Query)
- Services (Socket, Firebase)
- Routing (React Router)
- SEO Layer (Helmet)

---

## Project Flow (Brick by Brick)

### 1. Entry Point

The app starts from:

```
main.tsx
```

Steps:

1. Wrap app with providers:
   - Redux Provider
   - PersistGate (state persistence)
   - HelmetProvider (SEO)

2. Mount React app to DOM

---

### 2. HTML Structure (SEO Optimized)

The base HTML file includes:

- Google Analytics integration  
- Meta tags for SEO  
- Open Graph tags for social sharing  
- Twitter meta tags  
- Canonical URL  

This ensures:

- better search ranking  
- proper link previews  
- tracking support  

---

### 3. Routing System

Uses React Router.

Main routes:

#### Public Routes
- /
- /login
- /register
- /about-us
- /contact-us
- /terms-conditions

#### Protected Routes
- /user-dashboard
- /profile/:name/:userId
- /chats
- /chat/:id

Route protection is handled using:

```
<ProtectedRoute />
```

---

### 4. Authentication Flow

1. User logs in  
2. Tokens stored in Redux + localStorage  
3. App checks authentication state  
4. Redirects based on login status  

Logic:

```
if (!accessToken && !refreshToken) → logout
else → authenticated
```

---

### 5. State Management (Redux)

Global state includes:

```
userReducer:
  accessToken
  refreshToken
  user
  userType

notificationReducer:
  notifications

connectionReducer:
  connection status
```

Persistence is handled using:

```
redux-persist
```

---

### 6. API Layer (RTK Query)

All API calls go through:

```
baseQueryWithReauth
```

Features:

- attaches access token  
- handles 401 errors  
- automatically refreshes token  
- retries failed requests  

Flow:

```
request → 401 → refresh token → retry request
```

---

### 7. Socket Integration

Used for real-time updates.

Features:

- connection requests  
- live notifications  
- connection status updates  

Flow:

1. Connect socket when token exists  
2. Listen to events:
   - notification
   - connection_request
   - connection_status  
3. Dispatch updates to Redux  

---

### 8. Firebase Push Notifications

Uses Firebase Cloud Messaging (FCM).

Flow:

1. Request notification permission  
2. Generate FCM token  
3. Store token locally  
4. Send token to backend  
5. Listen for foreground messages  

Deduplication is handled using a Set to prevent duplicate notifications.

---

### 9. Service Worker

Registers:

```
/firebase-messaging-sw.js
```

Used for:

- background notifications  
- offline support  

---

### 10. Notification System

Two sources:

#### 1. Firebase (Push)
- Works even when app is inactive  

#### 2. Socket (Realtime)
- Instant updates when user is active  

Both are normalized into a single format before storing.

---

### 11. User Dashboard

After login:

- user is redirected to dashboard  
- subscription status is fetched  
- UI adapts based on user type  

---

### 12. Lazy Loading

All major pages are lazy loaded:

```
const Home = lazy(() => import(...))
```

This improves:

- performance  
- initial load time  

---

### 13. Forms & Profile Flow

User completes profile step by step:

- personal details  
- qualification  
- location  
- photos  
- other details  

Each step is routed separately.

---

### 14. Chat System

Includes:

- chat list (/chats)
- individual chat (/chat/:id)

Powered by:

- Socket.IO
- real-time updates

---

### 15. SEO Handling

Uses:

```
react-helmet-async
```

Features:

- dynamic meta tags  
- page-specific SEO  
- social preview optimization  

---

## Tech Stack

- React (with TypeScript)
- Vite
- Redux Toolkit
- RTK Query
- React Router
- Firebase (FCM)
- Socket.IO Client
- Tailwind CSS

---

## Environment Variables

Do not commit real values.

Example:

```
VITE_BASE_URL=your_api_url
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_PROJECT_ID=your_project
```

---

## How to Run

### Install dependencies
```
npm install
```

### Start development server
```
npm run dev
```

---

## Developer Notes

- Do not store sensitive data in localStorage  
- Always use RTK Query for API calls  
- Handle token refresh globally  
- Normalize all notification data  
- Avoid duplicate socket connections  
- Always disconnect socket on logout  

---

## Limitations

- No offline caching strategy implemented  
- No role-based routing  
- Some components tightly coupled with API responses  

---

## Future Improvements

- Add PWA support  
- Add role-based access control  
- Improve caching  
- Add error boundary per route  
- Optimize bundle size  

---

## Summary

This frontend application provides:

- secure authentication  
- real-time communication  
- scalable state management  
- optimized performance  

It is designed to work seamlessly with the backend and deliver a complete user experience.

---
