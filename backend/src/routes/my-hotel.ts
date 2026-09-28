import { Router, type Request, type Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel, { type HotelType } from "../models/Hotels.js";
import verifyToken from "../middleware/auth.js";
import { check, validationResult } from "express-validator";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/",
  verifyToken,
  upload.array("imageFiles", 6),
  [
    check("name").isString().withMessage("Name should be in string"),
    check("city").isString().withMessage("City should be in string"),
    check("country").isString().withMessage("Country should be in string"),
    check("description")
      .isString()
      .withMessage("Description should be in string"),
    check("type").isString().withMessage("Type should be in string"),
    check("adultCount")
      .isNumeric()
      .withMessage("Adult Count should be in number"),
    check("facilities")
      .isString()
      .withMessage("Facilities should be in string")
      .bail()
      .isArray()
      .withMessage("Facilities should be in array"),
    check("price")
      .isNumeric()
      .withMessage("Price should be in number")
      .bail()
      .isLength({ min: 1 })
      .withMessage("Price should be 1 or more"),
    check("starRating")
      .isNumeric()
      .withMessage("Star rating should be in number")
      .bail()
      .isLength({ min: 1, max: 5 })
      .withMessage("Star rating is minimum of 1 and maximum of 5"),
  ],
  async (req: Request, res: Response) => {
    try {
      const error = validationResult(req);
      if(!error.isEmpty){
        return res.status(400).json({
            message: error.array()
        })
      }

      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const now = new Date();
      newHotel.lastUpdated = now;

      const uploadPromises = imageFiles.map(async (img) => {
        const b64 = Buffer.from(img.buffer).toString("base64");
        const imgURI = "data:" + img.mimetype + ";base64," + b64;
        console.log("test1")
        const res = await cloudinary.v2.uploader.upload(imgURI);
        
        return res.url;
      });

      const images = await Promise.all(uploadPromises);

      newHotel.imageUrls = images;
      console.log("TEST")
      newHotel.userId = req.userId;

      const hotel = await Hotel.create(newHotel);

      res.status(201).send(hotel);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "SERVER ERROR",
      });
    }
  },
);

export default router;
