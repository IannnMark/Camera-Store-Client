import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// Set the API base URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api"; // Use proxy in development

export default function UpdateOrder() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orderId = params.orderId;
        const res = await fetch(`${apiUrl}/order/${orderId}`);
        const data = await res.json();

        if (!res.ok || data.success === false) {
          setError(data.message || "Failed to fetch the order");
        } else {
          setOrder(data.order);
          setStatus(data.order.orderStatus);
        }
      } catch (err) {
        setError("Error fetching order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const res = await fetch(`${apiUrl}/admin/order/${params.orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to update order");
      } else {
        console.log("Order updated successfully");
        navigate("/admin/orders");
      }
    } catch (err) {
      setError("Error updating order");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-semibold text-center my-7">Update Order</h1>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-md shadow-md">
        {loading ? (
          <p>Loading order details...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <table className="min-w-full text-left text-gray-600">
              <tbody>
                <tr>
                  <td className="py-2 font-semibold">Username:</td>
                  <td>{order?.user?.username || "N/A"}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Ordered Products:</td>
                  <td>
                    {order?.orderItems?.length > 0
                      ? order.orderItems
                          .map((item) => item.modelName)
                          .join(", ")
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Amount:</td>
                  <td>₱{order?.totalPrice?.toLocaleString() || "N/A"}</td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Ordered Date:</td>
                  <td>
                    {new Date(order?.createdAt).toLocaleDateString() || "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 font-semibold">Status:</td>
                  <td>
                    <select
                      className="p-2 border border-gray-300 rounded-md"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Received">Received</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="mt-6 text-center">
              <button
                type="submit"
                className={`px-4 py-2 rounded-md ${
                  uploading ? "bg-gray-400" : "bg-black hover:bg-gray-500"
                } text-white`}
                disabled={uploading}
              >
                {uploading ? "Updating..." : "Update Status"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
