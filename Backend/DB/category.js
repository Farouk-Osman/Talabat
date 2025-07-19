const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name: { type: String, required: false, unique: true }
});

const Category = mongoose.model('categories', categorySchema);
module.exports = Category;