import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

// Load environment variables from .env file
import 'dotenv/config'
import foodRouter from "./routes/foodRoute.js";

// App config
const app = express();
const port = process.env.PORT||4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))


app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

