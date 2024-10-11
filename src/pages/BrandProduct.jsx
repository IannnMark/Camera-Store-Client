import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";

// Set the API base URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api"; // Use proxy in development

export default function BrandProducts() {
  const { brandId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByBrand = async () => {
      try {
        const res = await fetch(`${apiUrl}/brand?brand=${brandId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching products.");
        setLoading(false);
      }
    };

    fetchProductsByBrand();
  }, [brandId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="container mx-auto py-10">
        <h2 className="text-3xl text-center font-semibold mb-8">
          Products for {brandId} Brand
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <img
                src={product.imageUrls[0]}
                alt={product.modelName}
                className="h-[320px] sm:h-[220px] w-full object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {product.modelName}
              </h3>
              <p className="text-gray-700 font-semibold mt-2">
                $
                {product.offer && product.discountPrice
                  ? product.discountPrice.toLocaleString("en-US")
                  : product.regularPrice
                  ? product.regularPrice.toLocaleString("en-US")
                  : "N/A"}{" "}
                USD
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
