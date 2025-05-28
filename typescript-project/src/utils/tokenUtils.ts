import jwt, { SignOptions, Secret } from "jsonwebtoken";

interface Payload {
  id: number;
  name: string;
}

export const generateTokens = (payload: Payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as jwt.Secret, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"] || "15m",
    });
  
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as jwt.Secret, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"] || "7d",
    });
  
    return { accessToken, refreshToken };
  };