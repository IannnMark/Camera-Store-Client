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

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/admin/products`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      setProducts(data.products || []);
      setFilteredProducts(data.products || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  if (loading) {
    return (
      <p className="text-center text-white text-xl">Loading Products...</p>
    );
  }

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to archive this product?"
    );
    if (confirmDelete) {
      try {
        const res = await fetch(
          `${apiUrl}/admin/product/soft-delete/${productId}`,
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

        alert("Product soft-deleted successfully");
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const columns = [
    {
      name: "Image",
      selector: (row) => (
        <img
          src={row.imageUrls}
          alt={row.brand}
          className="w-10 h-10 object-cover"
        />
      ),
      sortable: false,
    },
    {
      name: "Model Name",
      selector: (row) => row.modelName,
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true,
    },
    {
      name: "Regular Price",
      selector: (row) => row.regularPrice,
      sortable: true,
    },
    {
      name: "Discount Price",
      selector: (row) => row.discountPrice,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: "Offer",
      selector: (row) => (row.offer ? "Yes" : "No"),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Link to={`/update-product/${row._id}`}>
            {" "}
            <button className="text-green-800 uppercase">
              <FontAwesomeIcon icon={faEdit} className="mr-1 h-5" />
            </button>
          </Link>
          <button
            className="text-red-800 uppercase ml-4"
            onClick={() => handleDeleteProduct(row._id)}
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
        Products List
      </h1>

      <DataTable
        columns={columns}
        data={filteredProducts}
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
