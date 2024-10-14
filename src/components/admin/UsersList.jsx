import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DataTable from "react-data-table-component";

// Set the API base URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api"; // Use proxy in development

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${apiUrl}/user/admin/users`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      setUsers(data.users || []);
      setFilteredUsers(data.users || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Users", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  if (loading) {
    return <p className="text-center text-white text-xl">Loading Users...</p>;
  }

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(`${apiUrl}/user/admin/delete/${userId}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }
        alert("User deleted successfully");
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const columns = [
    {
      name: "Avatar",
      selector: (row) => (
        <img
          src={
            row.avatar ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu9zuWJ0xU19Mgk0dNFnl2KIc8E9Ch0zhfCg&s"
          }
          alt={row.username}
          className="w-10 h-10 object-cover"
        />
      ),
      sortable: false,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button className="text-green-800 uppercase">Edit</button>
          <button
            className="text-red-800 uppercase ml-4"
            onClick={() => handleDeleteUser(row._id)}
          >
            Delete
          </button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-3xl text-black font-semibold text-center mb-4">
          Users List
        </h1>
        <DataTable
          columns={columns}
          data={filteredUsers}
          pagination
          progressPending={loading}
          persistTableHead
          highlightOnHover
          striped
          subHeader
          subHeaderComponent={
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-3 py-1"
              placeholder="Search...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          }
        />
      </div>
    </div>
  );
}
