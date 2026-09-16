import { Router, type Request, type Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth.js";

const router = Router();

router.post(
  "/login",
  [
    check("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email should be an email")
      .bail()
      .isString()
      .withMessage("Email should be in string format"),
    check("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isString()
      .withMessage("Password should be in string format"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        },
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 8600000,
      });

      res.json({
        user: user._id,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "SERVER ERROR" });
    }
  },
);

router.post("/validate-cookie", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ userId: req.userId });
});

router.post('/logout', (req:Request, res:Response) => {
  res.clearCookie('auth_token');
  res.send();
})

export default router;
