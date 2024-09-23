import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex">
      <div className="max-w-lg p-10">
        <h1 className="text-7xl text-left font-bold my-12 text-blue-950">
          Login
        </h1>
        <p className="text-1xl">
          Welcome to Pro Capture – Capture every moment with the latest gear at
          your fingertips. Log in to explore exclusive deals, track your orders,
          and enhance your photography journey.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col">
          <h6 className="text-gray-700">Username</h6>
          <input
            type="email"
            placeholder="yourname@gmail.com"
            className="border p-3 rounded-lg w-96"
            id="email"
            onChange={handleChange}
          />
          <h6 className="text-gray-700">Password</h6>
          <input
            type="password"
            placeholder="*******"
            className="border p-3 rounded-lg w-96"
            id="password"
            onChange={handleChange}
          />
          <div className="flex gap-40 mt-5">
            <p className="text-gray-700">Remember me</p>
            <p className="font-semibold">Forgot Password</p>
          </div>
          <button
            className="bg-black text-white p-3
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-96 mt-5"
          >
            {loading ? "Loading..." : "Login now"}
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
          {error && <p className="text-red-700">{error}</p>}
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
