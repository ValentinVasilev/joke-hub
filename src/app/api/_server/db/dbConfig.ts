import mongoose from 'mongoose';

export async function connect() {
  try {
    // mongoose.connect(process.env.MONGO_URI!);
    mongoose.connect('mongodb://localhost/joke-hub');

    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log("MongoDB connected successfully")
    })
    connection.on('error', (err) => {
      console.log('MongoDB connection error' + err);
      process.exit();
    })
  } catch (error) {
    console.log(error);
  }
}