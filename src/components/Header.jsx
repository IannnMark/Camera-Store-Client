import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaUserAlt,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-white shadow-lg py-3 text-sm">
      <div className="flex justify-between items-center bg-black text-white p-2 font-thin">
        <div className="flex items-center">
          <FaPhone className="mr-2" />
          <span>+123-456-789</span>
        </div>
        <p className="text-center mx-auto absolute left-1/2 transform -translate-x-1/2">
          Open everyday 9am to 10pm
        </p>
        <div className="flex items-center">
          <FaMapMarkerAlt />
          <span>1257 Shutter Street, Lensville, CA 90210, United States</span>
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
          <FaUserAlt
            className="text-black hover:text-gray-500 cursor-pointer"
            size={20}
          />
          <FaShoppingCart
            className="text-black hover:text-gray-500 cursor-pointer"
            size={20}
          />
        </div>
      </div>
    </header>
  );
}
