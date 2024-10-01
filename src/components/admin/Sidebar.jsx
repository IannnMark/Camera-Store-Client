import { ChevronFirst, ChevronLast } from "lucide-react";
import logo from "../../../images/logo.png"; // Ensure this path is correct
import { createContext, useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTachometerAlt,
  faBox,
  faUsers,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const SidebarContext = createContext();

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const [open, setOpen] = useState(false);
  const [showProductsSubmenu, setShowProductsSubmenu] = useState(false);
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
            className="p-2 bg-gray-400 text-black rounded focus:outline-none"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      )}

      {open && (
        <aside
          ref={sidebarRef}
          className="fixed top-0 left-0 h-screen w-64 bg-white text-black flex flex-col border-r shadow-lg z-40"
        >
          <nav className="h-full flex flex-col">
            <div className="p-4 pb-2 flex justify-between items-center">
              <img
                src={logo}
                className={`transition-all ${expanded ? "w-32" : "w-0"}`}
              />
              <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                {expanded ? <ChevronFirst /> : <ChevronLast />}
              </button>
            </div>

            <SidebarContext.Provider value={{ expanded }}>
              <ul className="flex-1 px-3 space-y-2">
                <SidebarItem
                  icon={<FontAwesomeIcon icon={faTachometerAlt} />}
                  text="Dashboard"
                  to="/dashboard"
                />

                <li className="relative">
                  <button
                    onClick={() => setShowProductsSubmenu((prev) => !prev)}
                    className="flex items-center py-2 px-3 my-1 font-medium rounded-md text-gray-500 w-full"
                  >
                    <FontAwesomeIcon icon={faBox} className="mr-2" />
                    <span>Products</span>
                  </button>

                  {showProductsSubmenu && (
                    <ul className="pl-4">
                      <SidebarItem
                        icon={<FontAwesomeIcon icon={faBox} />}
                        text="Products"
                        to="/admin/products"
                      />
                      <SidebarItem
                        icon={<FontAwesomeIcon icon={faPlus} />}
                        text="Create Product"
                        to="/create-product"
                      />
                    </ul>
                  )}
                </li>
                <SidebarItem
                  icon={<FontAwesomeIcon icon={faUsers} />}
                  text="Users"
                  to="/admin/users"
                />
              </ul>
            </SidebarContext.Provider>
          </nav>
        </aside>
      )}
    </>
  );
}

export function SidebarItem({ icon, text, to }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600`}
    >
      {icon}
      <Link
        to={to}
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </Link>
    </li>
  );
}

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
