const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../DB/users');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({ username, email, password: hash });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin }, token });
  } catch (err) {
    console.error('registerUser error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin }, token });
  } catch (err) {
    console.error('loginUser error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { registerUser, loginUser };
