import type React from "react";
import { SearchContext } from "./SearchContext";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};
const SearchContextProvider = ({ children }: Props) => {
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [location, setLocation] = useState<string>("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const setSearch = (
    location: string,
    adultCount: number,
    childCount: number,
    startDate: Date,
    endDate: Date,
  ) => {
    setAdultCount(adultCount);
    setChildCount(childCount);
    setStartDate(startDate);
    setEndDate(endDate);
    setLocation(location);
  };

  return (
    <SearchContext.Provider
      value={{
        adultCount: adultCount,
        childCount: childCount,
        endDate: endDate,
        startDate: startDate,
        location: location,
        setSearch: setSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
