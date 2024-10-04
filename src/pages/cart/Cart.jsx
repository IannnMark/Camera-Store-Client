import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  increaseQty,
  decreaseQty,
} from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const handleIncreaseQty = (id) => {
    dispatch(increaseQty(id));
  };

  const handleDecreaseQty = (id) => {
    dispatch(decreaseQty(id));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkOutHandler = () => {
    if (currentUser) {
      navigate("/confirm");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <Fragment>
      <h1 className="text-2xl font-semibold text-center mt-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-10">
          <h2 className="text-lg font-medium">Your Cart is Empty</h2>
          <button
            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
            onClick={() => navigate("/shop")}
          >
            Buy Products
          </button>
        </div>
      ) : (
        <Fragment>
          <h2 className="text-lg font-medium my-6">
            Product List: <b>{cartItems.length}</b>
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="col-span-2">
              {cartItems.map((item) => (
                <Fragment key={item._id}>
                  <div className="p-4 border border-gray-300 rounded mb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image ? item.image : "fallback-image-url"}
                        alt={item.modelName}
                        className="w-20 h-20"
                      />

                      <div>
                        <h3 className="font-medium">{item.modelName}</h3>
                        <p>Brand: {item.brand}</p>
                        <p>
                          Price: ${item.price ? item.price.toFixed(2) : "N/A"}
                        </p>
                        <p>Stock: {item.stock}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => handleDecreaseQty(item._id)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-12 text-center border border-gray-300"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                          onClick={() => handleIncreaseQty(item._id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleRemoveItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>

            <div className="p-4 border border-gray-300 rounded">
              <h4 className="text-lg font-medium">Order Summary</h4>
              <p className="mt-2">
                Number of purchases:{" "}
                <span className="font-semibold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </p>
              <p className="mt-2">
                Est. total:{" "}
                <span className="font-semibold">
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.quantity * item.price, 0)
                    .toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                </span>
              </p>
              <button
                className="bg-green-500 text-white py-2 px-4 mt-4 rounded w-full hover:bg-green-600"
                onClick={checkOutHandler}
              >
                Check out
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
