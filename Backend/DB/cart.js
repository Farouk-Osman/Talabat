const { default: mongoose } = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true }],
  totalAmount: { type: Number, required: true },
});

const Cart = mongoose.model('carts', cartSchema);
module.exports = Cart;