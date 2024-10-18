import mongoose from "mongoose";
import { genHash } from "../utils/hash.js";
import users from "../modules/users.js";

export const createUser = async (req, res) => {
  const { name, mail, password } = req.body;
  if (!name || !mail || !password) {
    return console.log("please provide all the fields");
  }
  try {
    const tem = await users.findOne({ mail });
    if (tem) {
      return res
        .status(400)
        .json({ message: "user already exists with provided mail" });
    }
    const hashPassword = await genHash(password);
    const newUser = new users({
      name,
      mail,
      password: hashPassword,
    });
    await newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "new user created", data: newUser });
  } catch (error) {
    console.error("error message:", error);
    return res.status(500).json({ message: error });
  }
};
