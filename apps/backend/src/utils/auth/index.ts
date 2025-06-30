import bcrypt from "bcrypt";
import { decodedUser } from "../../types";
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "@repo/zod";
import crypto from "crypto"

export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const passwordMatch = async (
  currPassword: string,
  storedPassword: string
) => await bcrypt.compare(currPassword, storedPassword);

export const generateAccessToken = (user: decodedUser) =>
  jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email,
    },
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: env.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"] }
  );

export const generateRefreshToken = (user: decodedUser) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: env.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"] }
  );

  export const createHash = (token: string) => crypto.createHash("sha256").update(token).digest("hex");

  export const generateToken = () => {
  const unHashedToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = createHash(unHashedToken);
  const tokenExpiry = new Date(Date.now() + 30 * 60 * 1000);

  return { unHashedToken, hashedToken, tokenExpiry };
};