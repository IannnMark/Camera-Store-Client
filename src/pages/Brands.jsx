import { useEffect, useState } from "react";
import Footer from "../components/Footer";

// Set the API base URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api"; // Use proxy in development

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch(`${apiUrl}/brands`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setBrands(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching brands.");
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

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
          Our Top Camera Brands
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {brands.map((brand) => (
            <div
              key={brand._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
            >
              {brand.products[0]?.imageUrls && (
                <img
                  src={brand.products[0]?.imageUrls[0]}
                  alt={brand._id}
                  className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
                />
              )}
              <h3 className="text-xl font-bold text-gray-800 mb-2 hover:scale-105 transition-scale duration-300">
                {brand._id}
              </h3>
              <p className="text-gray-600 hover:scale-105 transition-scale duration-300">
                {brand.products.length} models available
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
