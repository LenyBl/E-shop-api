require('dotenv').config()

const dbHost = process.env.DB_HOST
const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(dbHost);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;

