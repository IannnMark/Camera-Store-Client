import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutSteps({ confirmOrder, payment }) {
  return (
    <div className="flex justify-center items-center mt-8 space-x-4">
      {confirmOrder ? (
        <Link to="/confirm" className="text-center">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-blue-500 mx-auto"></div>
          <div className="mt-2 text-blue-500 font-semibold">Confirm Order</div>
        </Link>
      ) : (
        <div className="text-center">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-400 mx-auto"></div>
          <div className="mt-2 text-gray-400">Confirm Order</div>
        </div>
      )}

      {payment ? (
        <Link to="/payment" className="text-center">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-blue-500 mx-auto"></div>
          <div className="mt-2 text-blue-500 font-semibold">Payment</div>
        </Link>
      ) : (
        <div className="text-center">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-gray-400 mx-auto"></div>
          <div className="mt-2 text-gray-400">Payment</div>
        </div>
      )}
    </div>
  );
}
