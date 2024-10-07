import ProductItem from "../components/ProductItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Deals() {
  const [offerProducts, setOfferProducts] = useState([]);

  useEffect(() => {
    const fetchOfferProducts = async () => {
      try {
        const res = await fetch("/api/get?offer=true&limit=3");
        const data = await res.json();
        setOfferProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferProducts();
  }, []);

  return (
    <div>
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
    </div>
  );
}
