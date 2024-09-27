

export default function UpdateProduct() {

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1
        className="text-3xl font-semibold
      text-center my-7"
      >
        Update Product
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Model Name"
            className="border p-3 rounded-lg"
            id="modelName"
            required
          />
          <input
            type="text"
            placeholder="Brand"
            className="border p-3 rounded-lg"
            id="brand"
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                required
                className="p-3 border border-gray-400 rounded-lg"
                id="stock"
              />
              <p className="font-semibold">Stocks</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" className="w-5" id="offer" />
              <span className="my-3 font-semibold">Offer</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="100"
                max="500000"
                required
                className="p3 border border-gray-400 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p className="font-semibold">Regular Price</p>
              </div>
            </div>
            {/* {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  required
                  className="p-3 border border-gray-400 rounded-lg"
                />
                <div className="flex flex-col items-center">
                  <p className="font-semibold">Discounted Price</p>
                </div>
              </div>
            )} */}
          </div>
        </div>
      </form>
    </main>
  );
}
