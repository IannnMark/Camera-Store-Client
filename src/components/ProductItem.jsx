import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProductItem({ product }) {
  return (
    <div
      className="bg-white shadow-md hover:shadow-lg
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
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    userRef: PropTypes.string.isRequired,
    _id: PropTypes.number.isRequired,
    imageUrls: PropTypes.array.isRequired,
    modelName: PropTypes.string.isRequired,
    offer: PropTypes.bool.isRequired,
    discountPrice: PropTypes.number.isRequired,
    regularPrice: PropTypes.number.isRequired,
  }).isRequired,
};
