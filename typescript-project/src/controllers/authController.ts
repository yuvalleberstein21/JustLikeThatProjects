import { Request, RequestHandler, Response } from "express";
import users from "../data/mockUser";
import { generateTokens } from "../utils/tokenUtils";
import jwt from "jsonwebtoken";

export const loginPage = (_req: Request, res: Response) => {
  res.send(`<form method="post" action="/login">
    <input name="username" placeholder="Username" />
    <input name="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>`);
};

export const login = (req: Request, res: Response): void => {
    const { username, password } = req.body;
  
    const user = users.find(u => u.username === username && u.password === password);
  
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return; 
    }
  
    const payload = { id: user.id, name: user.name };
    const { accessToken, refreshToken } = generateTokens(payload);
  
    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
  
    res.json({ success: true, message: "Logged in" });
  };

export const logout = (_req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ success: true, message: "Logged out" });
};

export const refreshToken = (req: Request, res: Response): void => {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }
  
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, (err: any, user: any) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
  
      const payload = { id: user.id, name: user.name };
      const { accessToken } = generateTokens(payload);
  
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
      });
  
      res.json({ message: "Access token refreshed" });
    });
  };

export const getMe = (req: Request, res: Response) => {
    res.json({ message: "You are authenticated", user: req.user });
  };