import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutSteps({ confirmOrder, payment }) {
  return (
    <div className="flex justify-center items-center mt-8 space-x-32">
      {confirmOrder ? (
        <Link to="/confirm" className="text-center">
          <div className="relative">
            <div className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-black hover:bg-gray-800"></div>
            <div className="mt-2 text-black font-semibold hover:bg-gray-800">
              Confirm Order
            </div>
          </div>
        </Link>
      ) : (
        <div className="text-center">
          <div className="relative">
            <div className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-gray-400"></div>
            <div className="mt-2 text-black hover:bg-gray-800">
              Confirm Order
            </div>
          </div>
        </div>
      )}
      {payment ? (
        <Link to="/payment" className="text-center">
          <div className="relative">
            <div className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-black hover:bg-gray-800"></div>
            <div className="mt-2 text-black font-semibold hover:bg-gray-800">
              Payment
            </div>
          </div>
        </Link>
      ) : (
        <div className="text-center">
          <div className="relative">
            <div className="absolute right-[-15px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-gray-400 hover:bg-gray-800"></div>
            <div className="mt-2 text-black hover:bg-gray-800">Payment</div>
          </div>
        </div>
      )}
    </div>
  );
}
