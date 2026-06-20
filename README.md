# Exclusive – E-Commerce Web App

A responsive e-commerce web application built with **React** and **Vite**, featuring user authentication, product browsing by category, a shopping cart, and order management.

## Features

- 🔐 **Authentication** — Sign up, login, and password reset powered by Firebase Authentication
- 🛍️ **Product Catalog** — Browse products and categories pulled from the FakeStore API
- 🛒 **Shopping Cart** — Add, update quantities, and remove items (persisted in local storage)
- 📦 **Order Checkout** — Place orders with shipping address and phone number
- 👤 **User Profile** — View account details and order history
- 📱 **Fully Responsive** — Optimized layout for mobile, tablet, and desktop

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Bootstrap 5 + custom CSS
- **Authentication:** Firebase Auth
- **Data Source:** [FakeStore API](https://fakestoreapi.com)
- **Routing:** React Router
- **Form Validation:** Yup
- **Notifications:** React Toastify
- **Carousel:** Swiper

## Getting Started

### Prerequisites
- Node.js installed on your machine

### Installation

```bash
# Clone the repository
git clone https://github.com/qusaihm/ecommarce.git

# Navigate into the project
cd ecommarce

# Install dependencies
npm install
```

### Firebase Setup

Create a `src/firebase.js` file with your own Firebase project configuration:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
```

Then enable **Email/Password** sign-in in your Firebase Console under **Authentication → Sign-in method**.

### Run Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── auth/              # Protected & unprotected route guards
├── components/        # Shared components (Navbar, Footer, etc.)
├── context/            # User & Cart context providers
├── pages/
│   ├── home/
│   ├── login/
│   ├── register/
│   ├── products/
│   ├── categories/
│   ├── cart/
│   ├── order/
│   └── profile/
├── routes/             # App routing
├── firebase.js         # Firebase configuration
└── App.jsx
```

## Deployment

This project is deployed on [Vercel](https://vercel.com).

## License

This project is for educational purposes.
