import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo } from "@fortawesome/free-solid-svg-icons";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api";

export default function ArchivedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${apiUrl}/admin/soft-delete-products`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);

      setProducts(data.products || []);
      setFilteredProducts(data.products || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Products", error);
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
    return <p className="text-center text-white text-xl">Loading Products</p>;
  }

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      try {
        const res = await fetch(`${apiUrl}/admin/product/delete/${productId}`, {
          method: "DELETE",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }

        alert("Product Deleted Successfully");
        window.location.reload();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleRestoreProduct = async (productId) => {
    const confirmRestore = window.confirm(
      "Are you sure you want to restore this product?"
    );

    if (confirmRestore) {
      try {
        const res = await fetch(
          `${apiUrl}/admin/product/restore-product/${productId}`,
          {
            method: "PUT",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.success === false) {
          console.log(data.message);
          return;
        }

        alert("Product Restored Successfully");
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
          <button
            className="text-green-800 uppercase"
            onClick={() => handleRestoreProduct(row._id)}
          >
            <FontAwesomeIcon icon={faUndo} className="mr-1 h-5" />
          </button>

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
        Archived Products
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
