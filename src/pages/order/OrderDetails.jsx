import React, { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// Set the API base URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api"; // Use proxy in development

export default function OrderDetails() {
  const params = useParams();
  const [order, setOrder] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { orderItems, orderStatus } = order;

  // Function to calculate total amount
  const calculateTotal = () => {
    let total = 0;
    if (orderItems) {
      orderItems.forEach((item) => {
        total += item.price * item.quantity;
      });
    }
    return total.toFixed(2);
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const orderId = params.orderId;
        const res = await fetch(`${apiUrl}/order/${orderId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch order details");
        }

        setOrder(data.order);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [params.orderId]);

  const contentArea = useRef(null);

  // Function to generate PDF
  const generatePDF = () => {
    const content = contentArea.current;
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const padding = 20;
      pdf.addImage(
        imgData,
        "PNG",
        padding,
        padding,
        imgWidth - 2 * padding,
        imgHeight - 2 * padding
      );
      pdf.save("order_receipt.pdf");
    });
  };

  return (
    <Fragment>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="w-full max-w-2xl bg-white shadow-lg p-8 rounded mt-8">
            <div ref={contentArea}>
              <div className="text-center">
                <img
                  src="../../images/logo.png"
                  alt="Company Logo"
                  className="mx-auto mb-4 w-32 h-auto"
                />
                <h1 className="font-bold text-xl">Order Details</h1>
                <p className="text-sm">Order Number: {order._id}</p>
              </div>

              <div className="my-4">
                <h4 className="font-semibold">Customer:</h4>
                <p>{order.user?.username}</p>
              </div>

              <div className="my-4">
                <h4 className="font-semibold">Payment Info:</h4>
                <p>{order.paymentInfo || "N/A"}</p>
              </div>

              <div className="my-4">
                <h4 className="font-semibold">Order Status:</h4>
                <p
                  className={`${
                    orderStatus === "Received"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {orderStatus}
                </p>
              </div>
              <div className="my-4">
                <h4 className="font-semibold">Ordered Items:</h4>
                {orderItems && orderItems.length > 0 ? (
                  orderItems.map((item) => (
                    <div
                      key={item.product}
                      className="flex justify-between my-2 border-b pb-2"
                    >
                      <p>{item.modelName}</p>
                      <p>
                        {item.quantity} x $
                        {item.discountPrice > 0
                          ? item.discountPrice.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : item.regularPrice.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                        {item.discountPrice > 0 && (
                          <span className="text-red-500 ml-2">
                            (Regular Price: $
                            {item.regularPrice.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                            )
                          </span>
                        )}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No items found</p>
                )}
              </div>

              <div className="my-4">
                <h4 className="font-semibold">Total Amount:</h4>
                <p className="font-bold">
                  $
                  {order.totalPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <button
              onClick={generatePDF}
              className="p-3 bg-black text-white rounded-lg
        uppercase hover:opacity-95 disabled:opacity-80 w-full"
            >
              Download Receipt
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
}
