import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";
import Logout from "./Logout";

const Header = () => {
  const { isLogin } = useAppContext();

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);
  return (
    <header className="bg-blue-700 p-6">
      <div className="container mx-auto flex items-center justify-between">
        <span className="text-lg sm:text-2xl font-bold text-white">
          MernHolidays.com
        </span>
        {isLogin ? (
          <>
            <Link to={"/idkk"}>My Bookings</Link>
            <Link to={"/idkk2"}>My Hotels</Link>
            <Logout />
          </>
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
