import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ConfirmOrder() {
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalPrice = itemsPrice.toFixed(2);

  const processToPayment = () => {
    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <Fragment>
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Confirm Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <h2 className="text-xl font-semibold mb-4">Your Cart Items:</h2>

            {cartItems.map((item) => (
              <Fragment key={item.product}>
                <div className="flex items-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product}`}
                      className="text-blue-600 hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-700">
                      {item.quantity} x ${item.price} ={" "}
                      <b>${(item.quantity * item.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
                <hr className="my-2" />
              </Fragment>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="mb-4">
              <p className="text-gray-600">
                Subtotal: <span className="font-semibold">${itemsPrice}</span>
              </p>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">
                Total: <span className="font-semibold">${totalPrice}</span>
              </p>
            </div>

            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              onClick={processToPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
