import mongoose from "mongoose";
import { genHash, checkPassword } from "../utils/hash.js";
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

export const deleteUser = async (req, res) => {
  const { mail, password } = req.body;
  if (!mail || !password) {
    return console.log("please provide all the fields");
  }
  try {
    var curUser = await users.findOne({ mail });
    if (!curUser) {
      return res.status(404).json({ message: `no user with mail:${mail}` });
    }
    const match = await checkPassword(password, curUser.password);
    if (!match) {
      return res.status(400).json({ message: "check mail or password" });
    }
    await users.findOneAndDelete({ mail });
    return res.status(200).json({
      success: true,
      message: "user was deleted",
      data: { name: curUser.name, mail },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal error", error });
  }
};
