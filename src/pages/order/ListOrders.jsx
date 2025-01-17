import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEye } from "react-icons/fa";

// Set the API base URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api"; // Use proxy in development

export default function ListOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${apiUrl}/orders/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      setOrders(data.orders || []);
      setFilteredOrders(data.orders || []);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching orders", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const filtered = orders.filter((order) => {
      const modelNames =
        order.orderItems?.map((item) => item.modelName.trim()) || [];

      return modelNames.some((modelName) =>
        modelName.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    });
    setFilteredOrders(filtered);
  }, [searchQuery, orders]);

  if (loading) {
    return (
      <p className="text-center text-black text-xl">Loading Orders.....</p>
    );
  }

  const columns = [
    {
      name: "Ordered Products",
      selector: (row) =>
        row.orderItems.map((item) => item.modelName).join(", "),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.totalPrice.toLocaleString(),
      sortable: true,
    },
    {
      name: "Ordered Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.orderStatus,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link to={`/order/${row._id}`}>
            <button>
              <FaEye size={20} />
            </button>
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-black font-semibold mb-4 text-center">
        My Orders
      </h1>

      <DataTable
        columns={columns}
        data={filteredOrders}
        pagination
        progressPending={loading}
        persistTableHead
        highlightOnHover
        striped
        subHeader
        subHeaderComponent={
          <input
            type="text"
            className="border border-gray-400 rounded px-3 py-1"
            placeholder="Search...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        }
      />
    </div>
  );
}
