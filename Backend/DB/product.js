const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
    imagesUrl: [{ type: String , required: true }],
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;