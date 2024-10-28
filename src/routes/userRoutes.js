import express from "express";
import {
  createUser,
  deleteUser,
  getUser,
  updatePass,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/user", createUser);
router.delete("/user", deleteUser);
router.get("/user", getUser);
router.put("/user", updatePass);

export default router;
