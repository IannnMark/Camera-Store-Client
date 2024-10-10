import ProductItem from "../components/ProductItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

// Set the API base URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api"; // Use proxy in development

export default function Shop() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const recentOfferProducts = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/get?limit=&&sort=createdAt&order=desc`
        );
        const data = await res.json();
        setRecentProducts(data);
        fetchOfferProducts();
        fetchAllProducts();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOfferProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/get?offer=true&limit=3`);
        const data = await res.json();
        setOfferProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/get`);
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    recentOfferProducts();
  }, []);

  return (
    <div>
      <div className="max-w-6xl mx-auto flex flex-col gap-8 my-10">
        {recentProducts && recentProducts.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-black">
                Latest Products
              </h2>
            </div>
            <div className="flex flex-wrap gap-8">
              {recentProducts.map((product) => (
                <ProductItem product={product} key={product._id} />
              ))}
            </div>
          </div>
        )}

        {offerProducts && offerProducts.length > 0 && (
          <div>
            <div className="text-2xl font-semibold text-black">
              <h2>Latest Offers with Discount</h2>
              <Link
                className="text-sm text-blue-900 hover:underline"
                to={"/search?offer=true"}
              >
                Show more Offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-8">
              {offerProducts.map((product) => (
                <ProductItem product={product} key={product._id} />
              ))}
            </div>
          </div>
        )}
        {allProducts && allProducts.length > 0 && (
          <div>
            <div className="text-2xl font-semibold text-black">
              <h2>All Products</h2>
            </div>
            <div className="flex flex-wrap gap-8">
              {allProducts.map((product) => (
                <ProductItem product={product} key={product._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
