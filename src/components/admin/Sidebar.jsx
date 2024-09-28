import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="h-screen w-40 bg-black text-white flex flex-col justify-between">
      <nav className="flex flex-col space-y-3 p-6">
        <Link className="hover:bg-gray-700 py-2 px-3 rounded font-semibold">
          Dashboard
        </Link>
        <Link
          to="/admin/products"
          className="hover:bg-gray-700 py-2 px-3 rounded font-semibold"
        >
          Products
        </Link>
        <Link
          to="/users"
          className="hover:bg-gray-700 py-2 px-3 rounded font-semibold"
        >
          Users
        </Link>
      </nav>
    </div>
  );
}
