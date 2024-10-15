import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

// Set the API base URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api"; // Use proxy in development

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${apiUrl}/admin/orders`, {
        method: "GET",
        credentials: "include",
      });
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
    return <p className="text-center text-black text-xl">Loading Orders...</p>;
  }

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to archive this order?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch(
          `${apiUrl}/admin/order/soft-delete/${orderId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }

        alert("Order archived successfully");
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const columns = [
    {
      name: "Username",
      selector: (row) => row.user?.username || "N/A",
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
            <button className="text-green-800 uppercase">
              <FontAwesomeIcon icon={faEdit} className="mr-1 h-5" />
            </button>
          </Link>
          <button
            className="text-red-800 uppercase ml-4"
            onClick={() => handleDeleteOrder(row._id)}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-1 h-5" />
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
