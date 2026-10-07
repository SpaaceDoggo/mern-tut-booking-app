import React, { useState } from "react";
import { useSearchContext } from "../context/search/SearchContext";
import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import HotelCard from "../components/HotelCard";
import Pagination from "../components/Pagination";
import StarRating from "../components/StarRating";
import FacilityRating from "../components/FacilityRating";
import TypeFilter from "../components/TypeFilter";

type Props = {};

const Search = ({}: Props) => {
  const search = useSearchContext();

  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState("");

  const queryParams = {
    location: search.location,
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    startDate: search.startDate.toISOString(),
    endDate: search.endDate.toISOString(),
    page: page.toString(),
    stars: selectedStars,
    facilities: selectedFacilities,
    types: selectedTypes,
    sortOptions: selectedSortOption
  };

  const { data: dataHotel } = useQuery({
    queryKey: ["searchHotel", queryParams],
    queryFn: () => apiClient.searchHotel(queryParams),
  });

  const handleStarFiltering = (event: React.ChangeEvent<HTMLInputElement>) => {
    const star = event.target.value;

    setSelectedStars((prev) =>
      event.target.checked
        ? [...prev, star]
        : prev.filter((prevStar) => prevStar !== star),
    );
  };

  const handleFacilityFiltering = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const facility = event.target.value;

    setSelectedFacilities((prev) =>
      event.target.checked
        ? [...prev, facility]
        : prev.filter((prevFacility) => prevFacility !== facility),
    );
  };

  const handleTypesFiltering = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;

    setSelectedTypes((prev) =>
      event.target.checked
        ? [...prev, type]
        : prev.filter((prevType) => prevType !== type),
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 items-start">
      <div className="sticky top-10 border border-gray-200 rounded-md p-4 shadow-sm">
        <p className="text-lg font-medium text-gray-600 mb-5">Filter by:</p>

        <div className="space-y-3">
          <StarRating
            selectedStars={selectedStars}
            onChange={handleStarFiltering}
          />
          <FacilityRating
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityFiltering}
          />

          <TypeFilter
            selectedTypes={selectedTypes}
            onChange={handleTypesFiltering}
          />
        </div>
      </div>

      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-1 text-lg font-medium text-gray-800 mb-4 capitalize">
            {dataHotel?.pagination.total ? dataHotel?.pagination.total : 0}
            <p>Hotels found</p>
            in {search.location}
          </div>

          <select 
           className="border border-slate-200 rounded-md p-1 text-gray-600 shadow-sm"
           onChange={(e) => setSelectedSortOption(e.target.value)}
          >
            <option value={""}>Sort By</option>
            <option value={"pricePerNightDesc"}>Price per night (High to Low)</option>
            <option value={"pricePerNightAsc"}>Price per night (Low to High)</option>
            <option value={"starRating"}>By star rating</option>
          </select>
        </div>

        <div className="space-y-6 mb-4">
          {dataHotel?.data &&
            dataHotel.data.map((hotel) => <HotelCard data={hotel} />)}
        </div>

        <Pagination
          page={dataHotel?.pagination.page || 1}
          pages={dataHotel?.pagination.pages || 1}
          onChangePage={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default Search;
