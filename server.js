import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./src/configs/connectDB.js"

const app = express();
app.use(express.json());
dotenv.config();

const PORT = process.env.PORT || 5060;

app.listen(PORT, () => {
  console.log(`server running on PORT:{PORT}`);
  connectDB();
});
