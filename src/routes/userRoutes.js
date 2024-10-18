import express from "express";
import { createUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/user", createUser);
router.delete("/user", deleteUser);

export default router;
