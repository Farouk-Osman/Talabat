const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');

const categoryRoutes = require("./routes/category");
// const cartRoutes = require("./routes/cart");
// const wishlistRoutes = require("./routes/wishlist");
// const userRoutes = require("./routes/user");
// const productRoutes = require("./routes/product");
// const orderRoutes = require("./routes/order");

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(`Server is running on port ${port}`);
});
app.use("/category",categoryRoutes);
// app.use("/cart", cartRoutes);
// app.use("/wishlist", wishlistRoutes);
// app.use("/user", userRoutes);
// app.use("/product", productRoutes);
// app.use("/order", orderRoutes);

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017', {
      dbName: 'Talabat-DB',
    });
    console.log('Connected to MongoDB');
}
connectDB().catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});