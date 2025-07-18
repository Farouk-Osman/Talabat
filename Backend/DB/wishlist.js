const mongoose  = require("mongoose");
const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true }],
  createdAt: { type: Date, default: Date.now },
});