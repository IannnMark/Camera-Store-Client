import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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
          <h1 className="font-bold text-lg sm:text-xl transition duration-300">
            <span className="text-black hover:text-gray-500 hover:underline">
              ProCapture
            </span>
          </h1>
        </Link>
        <div className="flex-grow flex justify-center mr-10">
          <ul className="flex gap-8 items-center">
            <Link to={"/"}>
              <li className="hidden sm:inline text-black transition duration-300 font-semibold hover:bg-gray-500 hover:text-black px-4 py-2 rounded">
                Home
              </li>
            </Link>
            <Link to={"/shop"}>
              <li className="hidden sm:inline text-black transition duration-300 font-semibold hover:bg-gray-500 hover:text-black px-4 py-2 rounded">
                Shop
              </li>
            </Link>
            <Link to={"/deals"}>
              <li className="hidden sm:inline text-black transition duration-300 font-semibold hover:bg-gray-500 hover:text-black px-4 py-2 rounded">
                Deals
              </li>
            </Link>
            <Link to={"/brands"}>
              <li className=" hidden sm:inline text-black transition duration-300 font-semibold hover:bg-gray-500 hover:text-black px-4 py-2 rounded">
                Brands
              </li>
            </Link>
            <li className="hidden sm:inline text-black transition duration-300 font-semibold hover:bg-gray-500 hover:text-black px-4 py-2 rounded">
              Blog
            </li>
            <li className="hidden sm:inline text-black transition duration-300 font-semibold hover:bg-gray-500 hover:text-black px-4 py-2 rounded">
              Support
            </li>
          </ul>
        </div>

        <div className="absolute right-0 flex gap-6 items-center pr-3">
          <form
            onSubmit={handleSubmit}
            className="hidden lg:inline border border-gray-400 font-semibold"
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch
                className="transition duration-300 font-semibold hover:bg-gray-500 hover:text-black cursor-pointer"
                size={20}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </button>
          </form>

          <Link to="/cart">
            {currentUser && currentUser.role !== "admin" ? (
              <div className="relative">
                <FaShoppingCart
                  className="text-black transition duration-300 font-semibold hover:bg-gray-500 hover:text-black rounded"
                  size={20}
                />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                    {totalQuantity}
                  </span>
                )}
              </div>
            ) : (
              !currentUser && (
                <div className="relative">
                  <FaShoppingCart
                    className="text-black transition duration-300 font-semibold hover:bg-gray-500 hover:text-black rounded"
                    size={20}
                  />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                      {totalQuantity}
                    </span>
                  )}
                </div>
              )
            )}
          </Link>
          <Link to={"/dashboard"}>
            {currentUser && currentUser.role === "admin" && (
              <span className=" hidden lg:inline text-black transition duration-300 font-semibold hover:bg-gray-500 hover:text-black px-4 py-2 rounded">
                Dashboard
              </span>
            )}
          </Link>
          <Link to={"/profile"}>
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <ul>
                <li className="text-black transition duration-300 font-semibold hover:bg-gray-500 hover:text-black px-4 py-2 rounded">
                  Sign In
                </li>
              </ul>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
