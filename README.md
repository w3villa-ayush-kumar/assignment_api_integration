# Furniture Store Checkout Demo

A minimal demo landing page that integrates **Stripe Checkout** using **Node.js**, **vanilla JavaScript**, and **Bootstrap**.

## 🚀 Features

- Minimal single-page furniture store UI
- Product selection + quantity
- Auto-calculated total price
- Stripe Checkout with India-compliant billing
- Clean success message handling
- Pure Node.js backend (no frameworks)

## 📁 Project Structure

```
project/
├─ server.js
├─ .env
├─ .gitignore
├─ public/
│  ├─ index.html
│  └─ script.js
```

## ⚙ Requirements

- Node.js installed
- Stripe test secret key (`sk_test_...`)

## 🔧 Setup

```
npm install
```

Create a `.env` file:

```
STRIPE_SECRET_KEY=your_test_key_here
```

## ▶ Run Server

```
node server.js
```

Visit:

```
http://localhost:4242
```

## 💳 Test Cards

Use any Stripe test card, e.g.:

```
4242 4242 4242 4242
```
