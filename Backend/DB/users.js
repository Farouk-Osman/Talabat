const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: false },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false }
});

const User = mongoose.model('users', userSchema);

module.exports = User;