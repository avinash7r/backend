import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./src/configs/connectDB.js";
import userRouter from "./src/routes/userRoutes.js";
import authRouter from "./src/routes/authRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", authRouter);

const PORT = process.env.PORT || 5060;

app.listen(PORT, () => {
  console.log(`server running on PORT:${PORT}`);
  connectDB();
});
