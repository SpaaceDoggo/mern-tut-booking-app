import { Router, type Request, type Response } from "express";
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import { check, validationResult} from "express-validator";


const router = Router();

router.post('/register', [
    check("email").notEmpty().withMessage("Email is required").bail().isEmail().withMessage("Email should be in email format").bail().isString().withMessage("Email should be in string format"),
    check("firstName").notEmpty().withMessage("Firstname is required").bail().isString().withMessage("Firstname should be in string format"),
    check("lastName").notEmpty().withMessage("Lastname is required").bail().isString().withMessage("Lastname should be in string format"),
    check("password").notEmpty().withMessage("Password is required").bail().isLength({min: 6}).withMessage("Password should be 6 or more characters")
], async (req: Request, res: Response) =>  {
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            message: errors.array()
        })
    }
    try {
        let user = await User.findOne({
            email: req.body.email
        });

        if(user){
            return res.status(400).json({
                message: "User already existing"
            });
        }

        user = new User(req.body);
        user.save();

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET_KEY as string,
            {expiresIn: '1d'}
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "process",
            maxAge: 86400000
        })

        return res.status(201).json({
            message: "Registration OK"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Something went wrong."});
    }
})



export default router;