import mongoose, { Connection } from 'mongoose';

export async function initMongoose(): Promise<Connection> {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB connection already established");
      return mongoose.connection;
    }
    const connection = await mongoose.connect(process.env.MONGODB_URL as string);
    return connection.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
