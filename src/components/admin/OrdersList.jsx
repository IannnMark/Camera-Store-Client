import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import DataTable from "react-data-table-component";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      console.log(data);

      setOrders(data.orders || []);
      setFilteredOrders(data.orders || []);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching Orders", error);
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
    return <p className="text-center text-white text-xl">Loading Orders...</p>;
  }

  const columns = [
    {
      name: "Username",
      selector: (row) => row.user?.username || "N/A", // Handle null user
      sortable: true,
    },
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
          <Link to={`/update-order/${row._id}`}>
            <button className="text-green-800 uppercase">Edit</button>
          </Link>
          <button
            className="text-red-800 uppercase ml-4"
            onClick={() => handleDeleteOrder(row._id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col border-r shadow-lg z-40">
        <Sidebar />
      </div>
      <h1 className="text-3xl text-black font-semibold mb-4 text-center">
        All Orders
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
