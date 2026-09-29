import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, UserRound } from "lucide-react";

const MyHotel = () => {
  const { data: myHotels, isLoading } = useQuery({
    queryKey: ["fetchHotels"],
    queryFn: apiClient.fetchHotels,
  });

  useEffect(() => {
    console.log(myHotels);
  }, []);

  if (isLoading) {
    return <div>Loading....</div>;
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold mar">My Hotels</h1>

      <Link to={'/add-hotel'}>
       <span className="px-3 py-1 bg-blue-500 font-semibold text-white text-md rounded-md">Add Hotel</span>
      </Link>
      </div>
      

      <div className="space-y-4">
        {myHotels?.map((hotel, i) => (
          <div
            key={i}
            className="border border-gray-300 rounded-md p-4 shadow-md"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <p className="text-lg font-medium uppercase">{hotel?.name}</p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                     key={i} 
                     className={`h-4 w-4 text-amber-300 ${(i < hotel.starRating ) ? 'fill-amber-300' : ''}`}
                    />
                  ))}
                </div>
              </div>

              <Link to={`/edit-hotel/${hotel._id}`}>
                <span className="px-4 py-1 bg-blue-500 rounded-md text-white font-semibold">
                  View details
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-6 mb-3">
              <p className="text-sm text-green-600 font-medium">
                ${hotel.price} per night
              </p>

              <div className="flex gap-1 text-sm items-center">
                <MapPin className="h-4 w-4 text-gray-500" />
                <p>{hotel.city},</p>
                <p>{hotel.country}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-blue-400 mb-5 ">
              {
                hotel.facilities.map((facility) => (
                  <span className="px-4 py-1 rounded-sm border border-blue-400">
                    {facility}
                  </span>
                ))
              }
            </div>

            <p className="line-clamp-3 mb-5">{hotel.description}</p>

            <div className="flex items-center gap-1">
              <span className="px-4 py-1 flex items-center gap-1 border border-gray-300 shadow-sm rounded-xs">
                <UserRound className="h-4 w-4 text-gray-400" />
                Adult: {hotel.adultCount}
              </span>

              <span className="px-4 py-1 flex items-center gap-1 border border-gray-300 shadow-sm rounded-xs">
                <UserRound className="h-4 w-4 text-gray-400" />
                Child: {hotel.childCount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotel;
