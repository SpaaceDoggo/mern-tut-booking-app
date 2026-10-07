import { Router, type Request, type Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/Hotels.js";
import type { HotelImage, HotelType } from "../shared/types.js";
import verifyToken from "../middleware/auth.js";
import { check, validationResult } from "express-validator";
import { ListCollectionsCursor } from "mongodb";

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
      console.log("RESTRT")
      const error = validationResult(req);
      if (!error.isEmpty) {
        return res.status(400).json({
          message: error.array(),
        });
      }

      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;

      const now = new Date();
      newHotel.lastUpdated = now;

      const uploadPromises = imageFiles.map(async (img) => {
        const b64 = Buffer.from(img.buffer).toString("base64");
        const imgURI = "data:" + img.mimetype + ";base64," + b64;
        console.log("test1");
        const res = await cloudinary.v2.uploader.upload(imgURI, {
          folder: "hotelImgs",
        });

        return res;
      });

      const images = await Promise.all(uploadPromises);

      newHotel.imageUrls = images.map((res) => ({
        publicId: res.public_id,
        url: res.url,
      }));
      console.log("TEST");
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

router.get("/get-hotels", verifyToken, async (req: Request, res: Response) => {
  try {
    console.log("RESTRT")
    const myHotels = await Hotel.find({ userId: req.userId });
    res.json(myHotels);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "SERVER ERROR",
    });
  }
});

router.get("/:id", verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      message: "Please provide hoted id",
    });
  }

  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });

    res.json(hotel);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "SERVER ERROR",
    });
  }
});

router.put(
  "/edit-hotel/:id",
  verifyToken,
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {

    let uploadImages:cloudinary.UploadApiResponse[] = [];
    try {
      const hotelId = req.params.id as string;
      const userId = req.userId;
      const updatedHotel: HotelType = req.body;

      console.log(updatedHotel);
      const hotel = await Hotel.findOne({ _id: hotelId });

      if (!hotel) {
        return res.status(401).json({
          message: "No hotel found",
        });
      }

      hotel.lastUpdated = new Date();

      const imgUrls: HotelImage[] = JSON.parse(req.body.imageUrls);
      updatedHotel.imageUrls = imgUrls;

      const files = req.files as Express.Multer.File[];

      if (files.length != 0) {
        const uploadImages = await uploadImage(files);

        uploadImages.forEach((img) => {
          updatedHotel.imageUrls.push({
            publicId: img.public_id,
            url: img.url,
          });
        });
      }

      const deletedImgUrls = req.body.deletedImgUrls;

      hotel.set(updatedHotel);

      hotel.save();

      if (deletedImgUrls) {
        const deleteFromCloudinary = deletedImgUrls?.map(
          async (url: string) => {
            const publicId = url.split("/").pop()?.split(".")[0];

            if (!publicId) {
              return;
            }
            const res = await cloudinary.v2.uploader.destroy(
              `hotelImgs/${publicId}`,
            );
            return res;
          },
        );

        Promise.all(deleteFromCloudinary);
      }

      res.status(200).json(hotel);
    } catch (error) {
      
      uploadImages.forEach((img) => {
        cloudinary.v2.uploader.destroy(img.public_id);
      })

      res.status(500).json({
        message: "SERVER ERROR",
      });
    }
  },
);

async function uploadImage(images: Express.Multer.File[]) {
  const uploadPromise = images.map(async (imgUrl) => {
    const b64 = imgUrl.buffer.toString("base64");
    const imgURI = "data:" + imgUrl.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(imgURI, {
      folder: "hotelImgs",
    });

    return res;
  });

  const imgUrls = await Promise.all(uploadPromise);

  return imgUrls;
}

export default router;
