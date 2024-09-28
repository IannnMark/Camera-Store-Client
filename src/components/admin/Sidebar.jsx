import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {!open && (
        <div className="fixed top-5 left-5 z-50 my-24">
          <button
            onClick={toggleDrawer}
            className="p-2 bg-black text-white rounded focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      )}

      {/* Sidebar */}
      {open && (
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 h-screen w-64 bg-black text-white flex flex-col shadow-lg z-40"
        >
          <div className="flex justify-between items-center p-4">
            <h2 className="text-lg font-bold">ProCapture</h2>
            <button
              onClick={toggleDrawer}
              className="text-white focus:outline-none"
            >
              <FontAwesomeIcon icon={faBars} size="lg" />
            </button>
          </div>
          <nav className="flex flex-col space-y-3 p-6">
            <Link
              to="/dashboard"
              className="hover:bg-gray-700 py-2 px-3 rounded font-semibold transition duration-200"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/admin/products"
              className="hover:bg-gray-700 py-2 px-3 rounded font-semibold transition duration-200"
              onClick={() => setOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/users"
              className="hover:bg-gray-700 py-2 px-3 rounded font-semibold transition duration-200"
              onClick={() => setOpen(false)}
            >
              Users
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
