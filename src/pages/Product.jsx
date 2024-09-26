import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Product() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/get/${params.productId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setProduct(data);
        setLoading(false);
        setError(false);
        console.log(data.imageUrls);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.productId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went Wrong</p>
      )}
      {product && !loading && !error && (
        <div>
          <Carousel>
            {product.imageUrls.map((url) => (
              <div
                key={url}
                className="h-[500px] border border-gray-800"
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: "contain",
                  height: "500px",
                  width: "100%",
                }}
              ></div>
            ))}
          </Carousel>
          <div className="">
            <p className="text-2xl font-semibold">
              {product.modelName} - ${" "}
              {product.offer && product.discountPrice
                ? product.discountPrice.toLocaleString("en-US")
                : product.regularPrice
                ? product.regularPrice.toLocaleString("en-US")
                : "N/A"}
            </p>
            <p className="text-black font-semibold">
              <span className="font-semibold text-black">Description -</span>
              {product.description}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
