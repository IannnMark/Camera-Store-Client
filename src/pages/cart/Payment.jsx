import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearCart } from "../../redux/cart/cartSlice";
import {
  orderCreateRequest,
  orderCreateSuccess,
  orderCreateFail,
} from "../../redux/order/orderSlice";

export default function Payment() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [paymentInfo, setPaymentInfo] = useState("Cash");
  const [referenceNum, setReferenceNum] = useState("");
  const [referenceNumError, setReferenceNumError] = useState("");
  const [screenShot, setScreenShot] = useState([]);
  const [screenShotPreview, setScreenShotPreview] = useState([]);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || {};
  const totalPrice = parseFloat(orderInfo.totalPrice) || 0; // Ensure totalPrice is a number

  const validateReferenceNum = () => {
    if (paymentInfo === "GCash" && referenceNum.length !== 13) {
      setReferenceNumError("Reference # must be exactly 13 digits");
      return false;
    } else {
      setReferenceNumError("");
      return true;
    }
  };

  const handleScreenshotChange = (e) => {
    const files = Array.from(e.target.files);
    setScreenShotPreview([]);
    setScreenShot([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setScreenShotPreview((prev) => [...prev, reader.result]);
          setScreenShot((prev) => [...prev, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  //     document.querySelector("#pay_btn").disabled = true;

  //     if (!validateReferenceNum()) {
  //       document.querySelector("#pay_btn").disabled = false;
  //       return;
  //     }

  //     if (paymentInfo === "GCash" && screenShot.length === 0) {
  //       toast.error("Screenshot is required for GCash payment");
  //       document.querySelector("#pay_btn").disabled = false;
  //       return;
  //     }

  //     const orderData = {
  //       orderItems: cartItems,
  //       paymentInfo,
  //       referenceNumber: referenceNum,
  //       screenshots: screenShot,
  //       itemsPrice: orderInfo.itemsPrice,
  //       shippingPrice: orderInfo.shippingPrice,
  //       totalPrice,
  //     };

  //     try {
  //       dispatch(orderCreateRequest());

  //       const response = await fetch(`/api/order/new`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(orderData),
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         dispatch(orderCreateSuccess(data.order));
  //         dispatch(clearCart());
  //         navigate("/success");
  //       } else {
  //         throw new Error(data.message || "Failed to create order");
  //       }
  //     } catch (error) {
  //       toast.error(error.message);
  //       dispatch(orderCreateFail(error.message));
  //     } finally {
  //       document.querySelector("#pay_btn").disabled = false;
  //     }
  //   };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;

    if (!validateReferenceNum()) {
      document.querySelector("#pay_btn").disabled = false;
      return;
    }

    if (paymentInfo === "GCash" && screenShot.length === 0) {
      toast.error("Screenshot is required for GCash payment");
      document.querySelector("#pay_btn").disabled = false;
      return;
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item._id, // Ensure product field is included
        modelName: item.modelName,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      paymentInfo,
      referenceNumber: referenceNum,
      screenshots: screenShot,
      itemsPrice: orderInfo.itemsPrice,
      shippingPrice: orderInfo.shippingPrice,
      totalPrice: orderInfo.totalPrice,
    };

    try {
      dispatch(orderCreateRequest());

      const response = await fetch(`/api/order/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(orderCreateSuccess(data.order));
        dispatch(clearCart());
        navigate("/success");
      } else {
        throw new Error(data.message || "Failed to create order");
      }
    } catch (error) {
      toast.error(error.message);
      dispatch(orderCreateFail(error.message));
    } finally {
      document.querySelector("#pay_btn").disabled = false;
    }
  };

  return (
    <Fragment>
      <CheckoutSteps shipping confirmOrder payment />
      <div className="flex justify-center items-center py-10">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Payment Method:
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentInfo"
                    value="Cash"
                    checked={paymentInfo === "Cash"}
                    onChange={(e) => setPaymentInfo(e.target.value)}
                    className="form-radio text-indigo-600"
                  />
                  <span>Cash</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentInfo"
                    value="GCash"
                    checked={paymentInfo === "GCash"}
                    onChange={(e) => setPaymentInfo(e.target.value)}
                    className="form-radio text-indigo-600"
                  />
                  <span>GCash</span>
                </label>
              </div>
            </div>

            {paymentInfo === "GCash" && (
              <>
                <div className="text-center">
                  <img
                    src="../../images/gcashqr.jpg"
                    alt="GCash QR Code"
                    className="w-1/2 mx-auto mb-4"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Reference Number:
                  </label>
                  <input
                    type="text"
                    className={`block w-full p-2 border rounded-md focus:outline-none focus:ring ${
                      referenceNumError ? "border-red-500" : "border-gray-300"
                    }`}
                    value={referenceNum}
                    onChange={(e) => setReferenceNum(e.target.value)}
                    onBlur={validateReferenceNum}
                    placeholder="Enter 13-digit Reference Number"
                  />
                  {referenceNumError && (
                    <p className="text-red-500 text-sm">{referenceNumError}</p>
                  )}
                </div>

                <div className="mt-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Upload Screenshot:
                  </label>
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer"
                    onChange={handleScreenshotChange}
                    multiple
                  />
                  <div className="flex mt-4 space-x-2">
                    {screenShotPreview.map((img) => (
                      <img
                        src={img}
                        alt="Screenshot Preview"
                        key={img}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    ))}
                  </div>
                </div>
                
              </>
            )}

            <div className="mt-6">
              <button
                id="pay_btn"
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-md text-lg font-semibold"
              >
                ORDER - ₱{totalPrice.toFixed(2)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
