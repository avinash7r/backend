import mongoose from "mongoose";
import { checkPassword } from "../utils/hash.js";
import users from "../modules/users.js";

export const userLogin = async (req, res) => {
  const { mail, password } = req.body;
  if (!mail || !password) {
    return res
      .status(404)
      .json({ message: "please provide mail and password" });
  }
  try {
    const curUser = await users.findOne({ mail: mail });
    if (!curUser) {
      return res
        .status(404)
        .json({ message: "please provide mail and password" });
    }
    const match = await checkPassword(password, curUser.password);
    if (match) {
      res
        .status(201)
        .json({ success: true, message: "you just logged in", data: curUser });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "provided wrong mail or password" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "internal error" });
  }
};
