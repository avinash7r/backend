import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
      unique: true, //still unable to insert only unique mail
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ mail: 1 }, { unique: true });

const users = mongoose.model("users", userSchema);

export default users;
