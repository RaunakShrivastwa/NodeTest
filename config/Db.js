const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_API)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
