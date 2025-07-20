const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name : { type: String, required: true },
  shortDescription : { type: String, required: true },
  description : { type: String, required: true },
  price : { type: Number, required: true },
  discount : { type: Number, default: 0 },
  images : [{ type: String, required: false }],
  category : { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
  brand : { type: mongoose.Schema.Types.ObjectId, ref: 'brands', required: true },
});

const Product = mongoose.model('products', productSchema);
module.exports = Product;
