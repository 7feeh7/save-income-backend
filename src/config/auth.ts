import dotenv from "dotenv"

dotenv.config()

export const auth = {
  secretKey: process.env.AUTH_SECRET_KEY || "",
  expiresIn: "1d",
}

export const bcryptSettings = { salts: 10 }
