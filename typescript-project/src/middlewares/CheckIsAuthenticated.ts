import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies?.accessToken;
  
    if (!token) {
      res.sendStatus(401);
      return;
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
  
      req.user = user;
      next();
    });
  };