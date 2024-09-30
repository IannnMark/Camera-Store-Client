import { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/user/admin/users");
      const data = await res.json();
      console.log(data);

      setUsers(data.users || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Users", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center text-white text-xl">Loading Users...</p>;
  }

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/user/admin/delete/${userId}`, {
          method: "DELETE",
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-black font-semibold mb-4 text-center">
        Users List
      </h1>
      <div className="overflow-x-auto my-7">
        <table className="min-w-full bg-gray-100 text-black">
          <thead>
            <tr className="w-full border-b border-white">
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Avatar</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-white">
                <td className="py-3 px-6">
                  <img
                    src={
                      user.avatar ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu9zuWJ0xU19Mgk0dNFnl2KIc8E9Ch0zhfCg&s"
                    }
                    alt={user.username}
                    className="w-10 h-10 object-cover"
                  />
                </td>
                <td className="py-3 px-6 text-black font-normal">
                  {user.username}
                </td>
                <td className="py-3 px-6 text-black font-normal">
                  {user.email}
                </td>
                <td className="py-3 px-6 text-black font-normal">
                  {user.role}
                </td>
                <td className="py-3 px-6 text-black font-normal">
                  <button className="text-green-800 uppercase">Edit</button>
                  <button
                    className="text-red-800 uppercase ml-6"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
