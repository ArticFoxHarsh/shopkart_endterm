# ShopKart

ShopKart is a full-stack online shopping application. It includes customer
registration and login, product browsing, a shopping cart, a wishlist, and
order checkout with Razorpay integration.

## Features

- Customer registration, login, and cookie-based authentication
- Product catalog and product details
- Cart management and wishlist
- Checkout, payment verification, and order history
- Razorpay integration, with a mock payment mode when Razorpay credentials
  are not configured
- MongoDB persistence, with an in-memory MongoDB fallback for local
  development when no database URI is provided

## Technology

- **Frontend:** React, Vite, React Router, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Payments:** Razorpay

## Project structure

```text
Client/   React frontend
Server/   Express API, database models, and payment integration
```

## Requirements

- Node.js and npm
- MongoDB, if you want data to persist between server restarts
- Razorpay API credentials, if you want to use Razorpay instead of mock
  checkout

## Run locally

1. Install frontend dependencies:

   ```bash
   cd Client
   npm install
   ```

2. Install backend dependencies:

   ```bash
   cd ../Server
   npm install
   ```

3. Configure the backend environment. Create `Server/.env` and set at least a
   private JWT signing secret:

   ```dotenv
   jwt_secret=replace-with-a-long-random-secret
   ```

   To use a MongoDB deployment, also set its connection URI. The variable name
   is case-sensitive:

   ```dotenv
   MongoDB_URI=mongodb://127.0.0.1:27017/shopkart
   ```

   Without `MongoDB_URI`, the server starts an in-memory MongoDB instance.
   Data in that instance is temporary and is lost when the server stops.

   To enable real Razorpay checkout, add your Razorpay credentials:

   ```dotenv
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

   If these payment credentials are omitted, the server uses its mock payment
   flow. Mock checkout is for development only and does not process a real
   payment.

4. Start the backend from `Server/`:

   ```bash
   npm start
   ```

   The API listens on `http://localhost:8001`.

5. In a second terminal, start the frontend from `Client/`:

   ```bash
   cd Client
   npm run dev
   ```

   Open `http://localhost:5173`. The frontend is configured to call the API at
   `http://localhost:8001`.

## Available scripts

Run these commands from `Client/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

Run `npm start` from `Server/` to start the API with Nodemon.

## Application pages

| Path | Page |
| --- | --- |
| `/register` | Create an account |
| `/login` | Sign in |
| `/home` | Home |
| `/products` | Browse products |
| `/products/:id` | Product details |
| `/wishlist` | Saved products |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/orders` | Order history |
| `/orders/:id` | Order details |
| `/order-success/:id` | Order confirmation |

## API overview

The backend base URL is `http://localhost:8001`.

| Prefix | Purpose |
| --- | --- |
| `/users` | Registration, login, current user, and logout |
| `/products` | List, retrieve, and create products |
| `/wishlist` | Retrieve and update the signed-in user's wishlist |
| `/cart` | Retrieve and update the signed-in user's cart |
| `/orders` | Create payment orders, verify payment, and retrieve orders |

Cart, wishlist, and order endpoints require authentication. Authentication
uses an HTTP-only cookie; API requests are configured to send credentials.

## Security and configuration

- Keep `Server/.env` and all API secrets private; do not commit credentials.
- Use a unique, strong `jwt_secret` outside local development.
- The current server CORS configuration allows the Vite development origin
  `http://localhost:5173`.
