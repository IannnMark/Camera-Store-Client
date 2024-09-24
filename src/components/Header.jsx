import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-white shadow-lg py-3 text-sm">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-black text-white p-2 font-thin">
        <div className="flex items-center mb-2 sm:mb-0">
          <FaPhone className="mr-2" />
          <span className="text-sm sm:text-base">+123-456-789</span>
        </div>
        <p className="flex-grow text-center sm:text-base text-sm">
          Open everyday 9am to 10pm
        </p>

        <div className="flex items-center">
          <FaMapMarkerAlt className="hidden sm:inline" />
          <span className="text-sm sm:text-base">
            1257 Shutter Street, Lensville, CA 90210, United States
          </span>
        </div>
      </div>
      <div className="flex items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="absolute left-0 flex-shrink-0">
          <h1 className="font-bold text-lg sm:text-xl">
            <span className="text-black">ProCapture</span>
          </h1>
        </Link>
        <div className="flex-grow flex justify-center">
          <ul className="inline-flex gap-20">
            <li className="hidden sm:inline text-black hover:shadow-lg transition-shadow duration-200 font-semibold">
              Home
            </li>
            <li className="hidden sm:inline text-black hover:shadow-lg transition-shadow duration-200 font-semibold">
              Shop
            </li>
            <li className="hidden sm:inline text-black hover:shadow-lg transition-shadow duration-200 font-semibold">
              Deals
            </li>
            <li className="hidden sm:inline text-black hover:shadow-lg transition-shadow duration-200 font-semibold">
              Brands
            </li>
            <li className="hidden sm:inline text-black hover:shadow-lg transition-shadow duration-200 font-semibold">
              Blog
            </li>
            <li className="hidden sm:inline text-black hover:shadow-lg transition-shadow duration-200 font-semibold">
              Support
            </li>
          </ul>
        </div>
        <div className="absolute right-0 flex gap-6 items-center pr-3">
          <FaSearch
            className="text-black hover:text-gray-500 cursor-pointer"
            size={20}
          />
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-black hover:shadow-lg font-semibold">
                Sign In
              </li>
            )}
          </Link>
          <FaShoppingCart
            className="text-black hover:text-gray-500 cursor-pointer"
            size={20}
          />
        </div>
      </div>
    </header>
  );
}
