import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/admin/users");
        const data = await res.json();

        setUsers(data.users || []);
      } catch (error) {
        console.log("Error fetching users", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products");
        const data = await res.json();

        setProducts(data.products || []);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-3 flex flex-col md:flex-row">
      <div className="fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col border-r shadow-lg z-40">
        <Sidebar />
      </div>

      <div className="flex-1 ml-44 md:ml-64">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white shadow-lg rounded-lg overflow-hidden h-full transition transform hover:scale-105">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold">Users</h2>
              <p className="text-2xl mt-2">
                <b>{users && users.length}</b>
              </p>
            </div>
            <Link
              to="/admin/users"
              className="bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 px-4 flex justify-center items-center space-x-2"
            >
              <span className="font-semibold">View Details</span>
              <span className="text-xl">
                <i className="fa fa-angle-right"></i>
              </span>
            </Link>
          </div>

          <div className="bg-gray-500 text-white shadow-lg rounded-lg overflow-hidden h-full transition transform hover:scale-105">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold">Products</h2>
              <p className="text-2xl mt-2">
                <b>{products && products.length}</b>
              </p>
            </div>
            <Link
              to={"/admin/products"}
              className="bg-gray-700 hover:bg-gray-950 transition-colors text-white py-3 px-4 flex justify-center items-center space-x-2"
            >
              <span className="font-semibold">View Details</span>
              <span className="text-xl">
                <i className="fa fa-angle-right"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}