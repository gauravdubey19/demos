import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    await mongoose.connect(mongoUri, {
      dbName: "TSKEcommerce",
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
  // finally {
  //   // closing the connection in case of any issues or after successful connection
  //   if (mongoose.connection.readyState !== 0) {
  //     await mongoose.disconnect();
  //     isConnected = false;
  //     console.log("MongoDB connection closed");
  //   }
  // }
};
