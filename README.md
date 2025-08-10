# Talabat

**Talabat** is a full‑stack e-commerce web application developed with the **MEAN** stack (MongoDB, Express, Angular, Node.js). The platform enables users to browse products, manage carts, place orders, and includes an admin dashboard for managing items—delivering a seamless shopping experience.

---

##  Technology Stack

| Layer        | Technology       |
|--------------|------------------|
| Database     | MongoDB          |
| Server/API   | Node.js & Express |
| Client       | Angular           |
| Styling      | SCSS, HTML        |
| Language     | TypeScript, JavaScript |

---

##  Features

- **User Interface (Angular):**
  - Browse product listings.
  - Detailed view per product.
  - Add to cart, update quantities, and checkout.
  - User authentication and profile management.

- **Backend (Express & Node.js):**
  - RESTful APIs for user, product, order, and cart operations.
  - Secure endpoints with authentication middleware.
  - Admin controls for product and order management.

- **Database (MongoDB):**
  - Persistent storage for products, users, carts, and orders.
  - Schema modeling and indexing for performance.

---

##  Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Farouk-Osman/Talabat.git
   cd Talabat
   ```

2. **Backend setup:**
   ```bash
   cd Backend
   npm install
   ```
   Configure your MongoDB connection URI in the `.env` file:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   ```

3. **Frontend setup:**
   ```bash
   cd ../webapp
   npm install
   ```

---

##  Running the Application

- **Start the backend server:**
  ```bash
  cd Backend
  npm start
  ```
  The server runs on `http://localhost:3000` (or another configured port).

- **Start the frontend (Angular app):**
  ```bash
  cd ../webapp
  ng serve
  ```
  Access the web app via `http://localhost:4200`.

---

##  Environment Variables

Make sure to set the following in your `.env` file (in the Backend folder):

```
MONGODB_URI=<your_mongodb_connection_string>
PORT=3000
JWT_SECRET=<your_secret_key>
```

---

##  Project Structure

```
Talabat/
├── Backend/
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── controllers/      # Business logic
│   └── index.js          # App entry point
└── webapp/
    ├── src/
    │   ├── app/
    │   ├── assets/
    │   └── environments/
    └── angular.json
```

---

##  Contributing

Contributions are welcome! Whether it's bug fixes, additional features, or performance improvements, feel free to open an issue or submit a pull request.

---

##  License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

##  Contact

Made by **Farouk Osman**. For questions or feedback, reach me at: **[faroukosman53@gmail.com]**

---

Thanks for exploring Talabat!
