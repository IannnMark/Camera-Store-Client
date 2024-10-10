import { Fragment, useState } from "react";
import { app } from ".././../firebase";
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
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

// Set the API base URL based on the environment
const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://camera-store-api.vercel.app/api"
    : "/api"; // Use proxy in development

export default function Payment() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    screenShot: [],
  });
  const [paymentInfo, setPaymentInfo] = useState("Cash");
  const [referenceNum, setReferenceNum] = useState("");
  const [referenceNumError, setReferenceNumError] = useState("");
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo")) || {};
  const totalPrice = parseFloat(orderInfo.totalPrice) || 0;

  const validateReferenceNum = () => {
    if (paymentInfo === "GCash" && referenceNum.length !== 13) {
      setReferenceNumError("Reference # must be exactly 13 digits");
      return false;
    } else {
      setReferenceNumError("");
      return true;
    }
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    if (files.length > 0 && files.length + formData.screenShot.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData((prevState) => ({
            ...prevState,
            screenShot: prevState.screenShot.concat(urls),
          }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          console.log("Image upload error", error);
          setImageUploadError("Image upload failed (2 mb max per image)");
        });
    } else {
      setImageUploadError("You can only upload 6 images per screenshot");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      screenShot: formData.screenShot.filter((_, i) => i !== index),
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#pay_btn").disabled = true;

    if (!validateReferenceNum()) {
      document.querySelector("#pay_btn").disabled = false;
      return;
    }

    if (paymentInfo === "GCash" && formData.screenShot.length === 0) {
      toast.error("Screenshot is required for GCash payment");
      document.querySelector("#pay_btn").disabled = false;
      return;
    }

    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item._id,
        modelName: item.modelName,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
        regularPrice: item.regularPrice || 0,
        discountPrice: item.discountPrice || 0,
      })),
      paymentInfo,
      referenceNumber: referenceNum,
      screenShot: formData.screenShot,
      itemsPrice: orderInfo.itemsPrice || 0,
      totalPrice: orderInfo.totalPrice || 0,
    };

    try {
      dispatch(orderCreateRequest());

      const response = await fetch(`${apiUrl}/order/new`, {
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
        toast.success("Order created successfully!");
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
      <CheckoutSteps confirmOrder payment />
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
                    src="../../images/G_Cash_QR_Template.png"
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

                <div className="flex gap-4">
                  <input
                    onChange={(e) => setFiles(e.target.files)}
                    className="p-3 border border-gray-300 rounded-full"
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                  />
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={handleImageSubmit}
                    className="p-3 text-green-800 border border-green-600 rounded uppercase
                  hover:shadow-lg disabled:opacity-80"
                  >
                    {uploading ? "Uploading" : "Upload"}
                  </button>
                </div>
                <p className="text-red-800 text-sm">
                  {imageUploadError && imageUploadError}
                </p>
                {formData.screenShot.length > 0 &&
                  formData.screenShot.map((url, index) => (
                    <div
                      key={url}
                      className="flex justify-between p-3 border items-center"
                    >
                      <img
                        src={url}
                        alt="Uploaded screenshot"
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="p-2 text-xs text-red-700 rounded-full
                    hover:shadow-sm hover:bg-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
              </>
            )}

            <button
              type="submit"
              id="pay_btn"
              className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            >
              Pay $
              {Number(totalPrice).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
