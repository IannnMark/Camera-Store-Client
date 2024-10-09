import ProductItem from "../components/ProductItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import aboutImage from "../../images/about-image.png";
import contactImage from "../../images/contact-image.png";

export default function Home() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [offerProducts, setOfferProducts] = useState([]);

  useEffect(() => {
    const recentOfferProducts = async () => {
      try {
        const res = await fetch("/api/get?limit=&&sort=createdAt&order=desc");
        const data = await res.json();
        setRecentProducts(data);
        fetchOfferProducts();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOfferProducts = async () => {
      try {
        const res = await fetch("/api/get?offer=true&limit=3");
        const data = await res.json();
        setOfferProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    recentOfferProducts();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center gap-6 p-28 max-w-6xl mx-auto">
        <h1 className="text-black font-bold text-6xl lg:text-7xl text-center">
          Capture Every Moment
        </h1>
        <p className="font-medium text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <button className="bg-black text-white px-3 py-2 rounded-sm mt-6">
          Call to Action
        </button>
        <div
          className="relative w-[1128px] h-[720px] flex justify-center items-end rounded-md"
          style={{
            backgroundImage: "url('../../images/hero-image.png')",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {recentProducts && recentProducts.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-black">
                Recent Upload
              </h2>
            </div>
            <div className="flex flex-wrap gap-8">
              {recentProducts.map((product) => (
                <ProductItem product={product} key={product._id} />
              ))}
            </div>
          </div>
        )}
        {offerProducts && offerProducts.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-black">
                Latest Offers with Discounts
              </h2>
              <Link
                className="text-sm text-blue-900 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerProducts.map((product) => (
                <ProductItem product={product} key={product._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex my-24">
        <div className="max-w-lg p-10">
          <h1 className="text-4xl font-bold text-left my-10 text-black">
            Your One-Stop Shop for All Your Camera Needs
          </h1>
          <p className="text-left font-normal my-7 text-black">
            Whether you're a professional photographer, aspiring enthusiast, or
            simply capturing life's moments, we offer the latest and most
            advanced camera gear to suit your specific needs. Our inventory
            spans a wide range of high-resolution DSLRs, compact mirrorless
            models, and everything in between. Whether you need something for
            intricate, high-detail landscape photography or fast-action sports
            shots, we have a solution for every style of shooting.
          </p>
          <p className="text-left font-normal my-7 text-black">
            We take pride in offering a comprehensive selection of cameras and
            accessories from top brands like Canon, Nikon, Sony, Fujifilm, and
            more. Our extensive collection includes not only cameras but also
            lenses, tripods, memory cards, and a variety of lighting solutions
            to perfect every shot. For those who demand the very best, we also
            offer premium professional gear.
          </p>
          <p className="text-left font-normal my-7 text-black">
            Not sure where to start or need advice on which gear fits your
            goals? Our team of expert photographers is here to assist you in
            selecting the perfect equipment. We understand that every
            photographer’s needs are unique, and we’ll help you find the right
            tools to take your photography to the next level.
          </p>
        </div>

        <div
          className="flex-grow bg-cover bg-right rounded-lg"
          style={{
            backgroundImage: `url(${aboutImage})`,
          }}
        ></div>
      </div>
      <div
        className="h-64 bg-cover mt-10"
        style={{
          backgroundImage: `url(${contactImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}
