// import mongoose from "mongoose";


//  const connectDB = async () => {
//   mongoose.connection.on('connected',()=>{
//     console.log("connection established")
//   })
//   await mongoose
//     .connect(
//       `${process.env.MONGODB_URI}/tastebuds`
//     )
    
// };

// export default connectDB

import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Connection established");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error while connecting to MongoDB:", error);
  }
};

export default connectDB;
