import jwt from "jsonwebtoken";
import { hash, compare } from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export const generateToken = (payload: {
  userId: string;
  email: string;
  role: string;
}) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const hashPassword = async (password: string) => {
  const hashed = await hash(password, 10);
  return hashed;
};

export const verifyPassword = async (password: string, hashed: string) => {
  return await compare(password, hashed);
};
