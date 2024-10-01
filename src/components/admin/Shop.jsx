import ProductItem from "../ProductItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Shop() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const recentOfferProducts = async () => {
      try {
        const res = await fetch("/api/get?limit=&&sort=createdAt&order=desc");
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
        const res = await fetch("/api/get?offer=true&limit=3");
        const data = await res.json();
        setOfferProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const res = await fetch("/api/get");
        const data = await res.json();
        setAllProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    recentOfferProducts();
  });

  return (
    <div>
      <div className="flex flex-col items-center gap-6 p-28 max-w-6xl mx-auto">
        <h1 className="text-black font-bold text-6xl lg:text-7xl text-center">
          Capture Every Moment
        </h1>
        <p className="font-medium text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <button className="bg-black text-white px-3 py-2 rounded-sm mt-6">
          Call to Action
        </button>
      </div>

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
                <ProductItem product={product} key={product.id} />
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
                <ProductItem product={product} key={product.id} />
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
                <ProductItem product={product} key={product.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
