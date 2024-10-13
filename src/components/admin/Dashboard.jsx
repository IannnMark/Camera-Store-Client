import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

// Set the API base URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api"; // Use proxy in development

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${apiUrl}/user/admin/users`, {
          method: "GET",
          credentials: "include",
        });
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
        const res = await fetch(`${apiUrl}/admin/products`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        setProducts(data.products || []);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${apiUrl}/admin/orders`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        setOrders(data.orders || []);
      } catch (error) {
        console.log("Error fetching Orders", error);
      }
    };
    fetchOrders();
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
          <div className="bg-red-700 text-white shadow-lg rounded-lg overflow-hidden h-full transition transform hover:scale-105">
            <div className="p-6 text-center">
              <h2 className="text-xl font-semibold">Products</h2>
              <p className="text-2xl mt-2">
                <b>{orders && orders.length}</b>
              </p>
            </div>
            <Link
              to={"/admin/orders"}
              className="bg-red-950 hover:bg-gray-950 transition-colors text-white py-3 px-4 flex justify-center items-center space-x-2"
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
