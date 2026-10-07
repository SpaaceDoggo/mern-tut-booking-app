import { useState } from "react";
import { useSearchContext } from "../context/search/SearchContext";
import { Map } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const { adultCount, childCount, endDate, startDate, location, setSearch } =
    useSearchContext();

  const [adultNum, setAdultCount] = useState<number>(adultCount);
  const [childNum, setChildCount] = useState<number>(childCount);
  const [loc, setLocation] = useState<string>(location);
  const [startDt, setStartDate] = useState<Date>(startDate);
  const [endDt, setEndDate] = useState<Date>(endDate);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const navigate = useNavigate();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    console.log("first")
    event.preventDefault();
    setSearch(loc, childNum, adultNum, startDt, endDt);
    navigate("/search");
  };

  const handleClearBtn = () => {
    setAdultCount(1)
    setChildCount(0);
    setLocation("");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <form
      className="w-14/15  mx-auto grid grid-cols-1 md:grid-cols-5 gap-2 p-3 bg-orange-400 -mt-8 rounded-md shadow"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center bg-white rounded-md">
        <Map className="w-5 h-5 text-black font-bold ml-3" />
        <input
          type="text"
          placeholder="Where are you going?"
          className="w-full p-2 outline-none text-lg"
          value={loc}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
      </div>

      <div className="flex items-center gap-1 bg-white rounded-md text-lg">
        <label className="flex items-center px-1">
          Adult:
          <input
            type="number"
            className="w-full p-2 outline-none font-bold"
            value={adultNum}
            min={1}
            onChange={(e) => {
              setAdultCount(parseInt(e.target.value));
            }}
          />
        </label>

        <label className="flex items-center px-1">
          Child:
          <input
            type="number"
            className="w-full p-2 outline-none font-bold"
            value={childNum}
            min={0}
            onChange={(e) => {
              setChildCount(parseInt(e.target.value));
            }}
          />
        </label>
      </div>

      <div className="">
        <DatePicker
          selected={startDt}
          onChange={(date: Date | null) => {
            if (date) {
              setStartDate(date);
            }
          }}
          selectsStart
          startDate={startDt}
          endDate={endDt}
          minDate={minDate}
          maxDate={maxDate}
          className="min-w-full p-2 focus:outline-none bg-white rounded-md text-lg"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={endDt}
          onChange={(date: Date | null) => {
            if (date) {
              setEndDate(date);
            }
          }}
          selectsStart
          startDate={startDt}
          endDate={endDt}
          minDate={minDate}
          maxDate={maxDate}
          className="min-w-full p-2 focus:outline-none bg-white rounded-md text-lg"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button
          type="submit"
          className="text-lg bg-blue-500 flex-1 text-white font-bold rounded-md cursor-pointer hover:bg-blue-500/70 active:scale-95 transition-all duration-150"
        >
          Search
        </button>

        <button
          type="button"
          onClick={handleClearBtn}
          className="text-lg bg-red-500  text-white font-bold rounded-md px-4 cursor-pointer hover:bg-red-500/70 active:scale-95 transition-all duration-150"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
