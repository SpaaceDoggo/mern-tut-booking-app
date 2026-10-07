import type { HotelType } from "../../../backend/src/shared/types";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  data: HotelType;
};

function HotelCard({ data }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 p-4 border border-gray-200 shadow-lg rounded-lg">
      <div className=" overflow-hidden rounded-lg">
        <img
          src={data.imageUrls[0].url}
          className="w-full h-[300px] object-cover object-center"
        />
      </div>

      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center gap-1 mb-1">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 text-amber-300  ${data.starRating > i ? "fill-amber-300" : ""}`}
                />
              ))}
            </div>

            <p className="text-gray-700">{data.type}</p>
          </div>

          <p className="text-xl font-bold capitalize mb-4">
            {data.name.toLocaleLowerCase()}
          </p>
        </div>

        <div>
          <p className="line-clamp-4">{data.description}</p>
        </div>

        <div className="flex items-end gap-2">
          <div className="flex flex-1 gap-1 items-center">
            {data.facilities.slice(0, 3).map((facility) => (
              <span className="p-2 border border-blue-300 rounded-sm text-gray-800">
                {facility}
              </span>
            ))}

            {data.facilities.length > 3 && (
              <span className="p-2 border border-blue-300 rounded-sm text-gray-800">
                +{data.facilities.length - 3} More
              </span>
            )}
          </div>
          <div className="flex flex-col items-start">
            <p className="font-medium">${data.price} per night</p>

            <Link
              to={`/detail/${data._id}`}
              className="py-2 px-4 bg-blue-500 text-white font-medium rounded-md"
            >
              View hotel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
