const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`Server is running on port ${port}`);
});

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