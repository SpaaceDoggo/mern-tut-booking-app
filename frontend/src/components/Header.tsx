import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Logout from "./Logout";

const Header = () => {
  const { isLogin, isAuthLoading } = useAppContext();

  if (isAuthLoading) {
    return (
      <header className="bg-blue-700 p-6">
        <div className="container mx-auto flex items-center justify-center"></div>
      </header>
    );
  }

  return (
    <header className="bg-blue-700 p-6">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-lg sm:text-2xl font-bold text-white">
          MernHolidays.com
        </span>
        {isLogin ? (
          <div className="space-x-8">
            <Link to={"/idkk"} className="px-2 py-1 rounded-sm text-md font-bold text-white hover:bg-white hover:text-blue-700 transition-all duration-150">
              My Bookings
            </Link>
            <Link to={"/my-hotels"} className="px-2 py-1 rounded-sm text-md font-bold text-white hover:bg-white hover:text-blue-700 transition-all duration-150">
              My Hotels
            </Link>
            <Logout />
          </div>
        ) : (
          <div className="space-x-5">
            <Link to={"/register"}>
              <button className="bg-white text-blue-700 px-3 py-1 rounded-sm text-sm md:text-base font-medium hover:bg-white/75 active:scale-95 transition-all duration-150 cursor-pointer">
                Sign up
              </button>
            </Link>
            <Link to={"/sign-in"}>
              <button className="bg-white text-blue-700 px-3 py-1 rounded-sm text-sm md:text-base font-medium hover:bg-white/75 active:scale-95 transition-all duration-150 cursor-pointer">
                Sign in
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
