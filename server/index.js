import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import authRoute from "./routes/authRoute.js";
import todoRoute from "./routes/todoRoute.js";
import connectDB from "./db.js";
import cookieParser from "cookie-parser";

const app = express();

const PORT = 3000;
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is listening");
});

app.get("/test", (req, res) => {
  res.send({
    msg: "This is a test route",
  });
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user/todo", todoRoute);

connectDB()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

module.exports = app;
