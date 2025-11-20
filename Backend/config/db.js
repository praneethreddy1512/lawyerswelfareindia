const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI =
      process.env.MONGODB_URI ||
      process.env.MONGO_URI ||
      process.env.DATABASE_URL ||
      process.env.DB_URL ||
      process.env.MONGO_URL;

    if (!MONGO_URI) {
      throw new Error(
        'Missing MongoDB connection string. Set MONGODB_URI (or MONGO_URI/DATABASE_URL/DB_URL/MONGO_URL) in your environment/.env.'
      );
    }
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
