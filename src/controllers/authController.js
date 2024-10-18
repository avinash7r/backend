import mongoose from "mongoose";
import users from "../modules/users.js";

export const userLogin = async (req, res) => {
  const user = req.body;
  if (!user.mail || !user.password) {
    return res
      .status(404)
      .json({ message: "please provide mail and password" });
  }
  try {
    const curUser = await users.findOne({ mail: user.mail });
    if (curUser.password === user.password) {
      res
        .status(200)
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
