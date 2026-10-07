import { createContext, useContext } from "react";

type SearchType = {
  location: string;
  childCount: number;
  adultCount: number;
  startDate: Date;
  endDate: Date;
  setSearch: (
    location: string,
    childCount: number,
    adultCount: number,
    startDate: Date,
    endDate: Date,
  ) => void;
};

export const SearchContext = createContext<SearchType | undefined>(undefined);

export const useSearchContext = () => {
    const searchContext = useContext(SearchContext);

    return searchContext as SearchType
}
