import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
//utils
import connectDB from "./config/db.js";

import userRoute from "./routes/userRoute.js";

dotenv.config();

const port = process.env.PORT || 8000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  cors({
    origin: ["http://localhost:5173/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send("BACKEND RUNNING");
});

app.listen(port, () => {
  console.log("SERVER RUNNING ON PORT");
});
