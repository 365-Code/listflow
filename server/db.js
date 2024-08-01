import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "";
    await mongoose.connect(uri);
    console.log("database connected");
  } catch (error) {
    throw Error(error);
  }
};


export default connectDB