import { Router, type Request, type Response } from "express";
import Hotel from "../models/Hotels.js";
import type { HotelPagination } from "../shared/types.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  console.log("test/seardch");
  const limit = 5;
  const page = parseInt(
    req.query?.pagination ? req.query?.pagination.toString() : "1",
  );
  const skip = (page - 1) * limit;

  const query = constructQueryParams(req.query);

  let sortOptions = {};

  switch (req.query.sortOptions) {
    case "starRating":
      sortOptions = { starRating: -1 };
      break;
    case "pricePerNightAsc":
      sortOptions = { price: 1 };
      break;
    case "pricePerNightDesc":
      sortOptions = { price: -1 };
      break;
  }

  try {
    const hotel = await Hotel.find(query)
      .sort(sortOptions)
      .limit(limit)
      .skip(skip);

    const total = await Hotel.find(query).countDocuments();
    console.log(query);
    const response: HotelPagination = {
      data: hotel,
      pagination: {
        total: total,
        page: page,
        pages: Math.ceil(total / limit),
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "SERVER ERROR",
    });
  }
});

function constructQueryParams(queries: any) {
  const queryParams: any = {};

  if (queries.location) {
    queryParams.$or = [
      { city: new RegExp(queries.location, "i") },
      { country: new RegExp(queries.location, "i") },
    ];
  }

  if (queries.adultCount) {
    queryParams.adultCount = {
      $gte: parseInt(queries.adultCount),
    };
  }

  if (queries.childCount) {
    queryParams.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if (queries.facilities) {
    queryParams.facilities = {
      $all: Array.isArray(queries.facilities)
        ? queries.facilities
        : [queries.facilities],
    };
  }

  if (queries.types) {
    console.log(queries.types)
    queryParams.type = {
      $in: Array.isArray(queries.types)
        ? queries.types
        : [queries.types],
    };
  }

  if (queries.stars) {
    console.log(queries.stars);
    const ratings = Array.isArray(queries.stars)
      ? queries.stars.map((star: string) => parseInt(star))
      : parseInt(queries.stars);

    queryParams.starRating = {
      $in: ratings,
    };
  }

  if (queries.priceMax) {
    queryParams.price = {
      $lte: parseInt(queries.priceMax),
    };
  }

  return queryParams;
}

export default router;
