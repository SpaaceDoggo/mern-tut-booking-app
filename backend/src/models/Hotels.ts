import mongoose from "mongoose";
import type { HotelType } from "../shared/types.js";

const hotelSchema = new mongoose.Schema<HotelType>({
    userId:{
        type:String,
        required:true
    },
    name:{
        type: String, 
        required: true
    },
    city:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true,
        min: 1
    },
    adultCount: {
        type: Number,
        required: true
    },
    childCount: {
        type: Number, 
        default: 0
    },
    facilities: [
        {
            type: String,
            required: true
        }
    ],
    starRating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    imageUrls: [
        {
            type: String
        }
    ],
    lastUpdated: {
        type: Date,
        required: true
    }

});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;