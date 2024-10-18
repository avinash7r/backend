import bcrypt from "bcrypt";

export const genHash = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const checkPassword = async (password, hashPassword) => {
  const match = await bcrypt.compare(password, hashPassword);
  return match;
};
