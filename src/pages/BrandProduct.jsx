import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cart/cartSlice";

import Footer from "../components/Footer";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api";

export default function BrandProducts() {
  const { brandId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

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
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleAddToCart = (product) => {
    if (product.stock > 0) {
      dispatch(
        addItemToCart({
          _id: product._id,
          modelName: product.modelName,
          brand: product.brand,
          price:
            product.offer && product.discountPrice
              ? product.discountPrice
              : product.regularPrice,
          image: product.imageUrls[0],
          stock: product.stock,
          regularPrice: product.regularPrice,
          discountPrice: product.discountPrice,
        })
      );
    } else {
      alert("Sorry, this product is out of stock!");
    }
  };

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
                className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2 hover:scale-105 transition-scale duration-300">
                {product.modelName}
              </h3>
              <p className="text-gray-700 font-semibold mt-2 hover:scale-105 transition-scale duration-300">
                $
                {product.offer && product.discountPrice
                  ? product.discountPrice.toLocaleString("en-US")
                  : product.regularPrice
                  ? product.regularPrice.toLocaleString("en-US")
                  : "N/A"}{" "}
                USD
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                className="text-xl text-white bg-black rounded-md hover:bg-gray-800 px-2 mt-4"
              >
                Add to Cart
              </button>
              {product.stock <= 0 && (
                <p className="text-red-500 text-center mt-2">
                  Sorry, this product is out of stock!
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
