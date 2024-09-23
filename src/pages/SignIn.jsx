import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignIn() {
  return (
    <div className="flex">
      <div className="max-w-lg p-10">
        <h1 className="text-7xl text-left font-bold my-12 text-blue-950">
          Login
        </h1>
        <p className="text-1xl">
          Welcome to Pro Capture – Capture every moment with the latest <br />{" "}
          gear at your fingertips. Log in to explore exclusive deals, track{" "}
          <br /> your orders, and enhance your photography journey.
        </p>

        <form className="mt-7 flex flex-col">
          <h6 className="text-gray-700">Username</h6>
          <input
            type="email"
            placeholder="yourname@gmail.com"
            className="border p-3 rounded-lg w-96"
          />
          <h6 className="text-gray-700">Password</h6>
          <input
            type="password"
            placeholder="*******"
            className="border p-3 rounded-lg w-96"
          />
          <div className="flex gap-40 mt-5">
            <p className="text-gray-700">Remember me</p>
            <p className="font-semibold">Forgot Password</p>
          </div>
          <button
            className="bg-black text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-96 mt-5"
          >
            Login now
          </button>
          <div className="mt-3">
            <OAuth />
          </div>
          <div className="flex gap-3 mt-5">
            <p className="text-gray-700">Dont have an account?</p>
            <Link to={"/sign-up"}>
              <span className="text-black font-semibold">Create one now</span>
            </Link>
          </div>
        </form>
      </div>
      <div
        className="flex-grow bg-cover bg-right"
        style={{
          backgroundImage: "url('../../images/Picture1.png')",
        }}
      ></div>
    </div>
  );
}
