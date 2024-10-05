export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2l4-4m0 6a9 9 0 11-18 0a9 9 0 0118 0z"
          />
        </svg>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-600 mb-4">
          Thank you for your purchase. We will process your order shortly.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
