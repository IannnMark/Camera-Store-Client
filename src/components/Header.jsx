import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaUserAlt } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-white shadow-lg py-3">
      <div className="flex items-center max-w-6xl mx-auto p-3">
        <Link to="/" className="absolute left-0 flex-shrink-0">
          <h1 className="font-bold text-lg sm:text-xl">
            <span className="text-slate-950">ProCapture</span>
          </h1>
        </Link>
        <div className="flex-grow flex justify-center">
          <ul className="inline-flex gap-20">
            <li className="hidden sm:inline text-slate-950 hover:shadow-lg transition-shadow duration-200 font-semibold">
              Home
            </li>
            <li className="hidden sm:inline text-slate-950 hover:shadow-lg transition-shadow duration-200 font-semibold">
              Shop
            </li>
            <li className="hidden sm:inline text-slate-950 hover:shadow-lg transition-shadow duration-200 font-semibold">
              Deals
            </li>
            <li className="hidden sm:inline text-slate-950 hover:shadow-lg transition-shadow duration-200 font-semibold">
              Brands
            </li>
            <li className="hidden sm:inline text-slate-950 hover:shadow-lg transition-shadow duration-200 font-semibold">
              Blog
            </li>
            <li className="hidden sm:inline text-slate-950 hover:shadow-lg transition-shadow duration-200 font-semibold">
              Support
            </li>
          </ul>
        </div>
        <div className="absolute right-0 flex gap-6 items-center pr-3">
          <FaSearch
            className="text-slate-950 hover:text-gray-500 cursor-pointer"
            size={20}
          />
          <FaUserAlt
            className="text-slate-950 hover:text-gray-500 cursor-pointer"
            size={20}
          />
          <FaShoppingCart
            className="text-slate-950 hover:text-gray-500 cursor-pointer"
            size={20}
          />
        </div>
      </div>
    </header>
  );
}
