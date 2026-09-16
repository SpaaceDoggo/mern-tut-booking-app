import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
} 

const verifyToken = (req: Request, res: Response, next: NextFunction) =>  {
  const cookie = req.cookies["auth_token"];

  if (!cookie) {
    return res.status(401).json({ message: "Unauthorized11" });
  }

  try {
    const decoded = jwt.verify(cookie, process.env.JWT_SECRET_KEY as string);
    req.userId = (decoded as JwtPayload).userId;
    next();
    
  } catch (error) {
    return res.status(401).json({
        message: "Unauthorized"
    })
  }
};

export default verifyToken;