import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  throw new Error('MONGO_URL is required. Set it in the .env file.');
}

export async function connectMongo() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(mongoUrl);
  } else if (mongoose.connection.readyState === 2) {
    await mongoose.connection.asPromise();
  }

  return mongoose.connection;
}
