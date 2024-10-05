import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../redux/cart/cartSlice";

export default function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
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
      })
    );
  };

  return (
    <div
      className="bg-gray-300 shadow-md hover:shadow-lg
    transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]"
    >
      <Link to={`/product/${product._id}`}>
        <img
          src={product.imageUrls[0]}
          alt="Product Cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2">
          <p className="truncate text-lg font-semibold text-black">
            {product.modelName}
          </p>
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
      </Link>
      <button
        onClick={handleAddToCart}
        className="text-xl text-white bg-black rounded-md ml-28 hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
}
