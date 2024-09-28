import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      console.log(data);

      setProducts(data.products || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <p className="text-center text-white text-xl">Loading Products...</p>
    );
  }

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/admin/product/delete/${productId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }

        alert("Product deleted successfully");
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Sidebar />
      <h1 className="text-3xl text-black font-semibold mb-4 text-center">
        Products List
      </h1>
      <div className="overflow-x-auto my-7">
        <table className="min-w-full bg-gray-400 text-white">
          <thead>
            <tr className="w-full border-b border-white">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Model Name</th>
              <th className="py-3 px-6 text-left">Brand</th>
              <th className="py-3 px-6 text-left">Regular Price</th>
              <th className="py-3 px-6 text-left">Discount Price</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Stock</th>
              <th className="py-3 px-6 text-left">Offer</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b border-white">
                <td className="py-3 px-6">
                  <img
                    src={
                      product.imageUrls[0] ||
                      "https://www.google.com/url?sa=i&url=http%3A%2F%2Fwww.sitech.co.id%2Fdetail%2F49&psig=AOvVaw3n_wa_f1cHVFMVuCmODV6s&ust=1727585795598000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIjskt_s5IgDFQAAAAAdAAAAABAE"
                    }
                    alt={product.modelName}
                    className="w-10 h-10 object-cover"
                  />
                </td>
                <td className="py-3 px-6">{product.modelName}</td>
                <td className="py-3 px-6">{product.brand}</td>
                <td className="py-3 px-6">
                  ${product.regularPrice.toLocaleString()}
                </td>
                <td className="py-3 px-6">
                  {product.offer
                    ? `$${product.discountPrice.toLocaleString()}`
                    : "N/A"}
                </td>
                <td className="py-3 px-6">{product.description}</td>
                <td className="py-3 px-6">{product.stock}</td>
                <td className="py-3 px-6">{product.offer ? "Yes" : "No"}</td>
                <td className="py-3 px-6">
                  <Link to={`/update-product/${product._id}`}>
                    <button className="text-green-800 uppercase">Edit</button>
                  </Link>
                  <button
                    className="text-red-800 uppercase"
                    onClick={() => handleDeleteProduct(product._id)}
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
