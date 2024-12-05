import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    try {
      const response = await loginUser(data).unwrap();
      const { token, user } = response;
      dispatch(setUser({ user }));
      alert("Login successful");
      navigate("/");
    } catch (error) {
      setMessage("Please provide a valid email and password");
    }
  };

  return (
    <div className="h-screen md:flex">
      <div
        className="relative overflow-hidden md:flex w-1/2 justify-around items-center hidden"
        style={{ background: "linear-gradient(135deg, #ff5722, #ffa726)" }}
      >
        <Link to="/" className="absolute top-6 left-6">
          <img src="/sambhaar.png" alt="Logo" className="h-8 md:h-12 " />
        </Link>
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-white font-bold text-5xl mb-4">Sambhaar</h1>
          <p className="text-white font-normal text-lg">
            Fresh Finds for Your Pantry and Home
          </p>
        </div>
        <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form
          onSubmit={handleLogin}
          className="space-y-5 max-w-sm mx-auto pt-8"
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Hello Again!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:ring-0.5 focus:ring-orange-400 transition"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:ring-0.5 focus:ring-orange-400 transition"
          />
          {message && <p className="text-red-500 text-center">{message}</p>}
          <button
            type="submit"
            className="w-full mt-5 text-white font-medium py-3 rounded-md bg-gradient-to-r from-orange-600 to-orange-400 hover:opacity-90 transition"
          >
            Login
          </button>
          <p className="my-5 italic text-sm text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-orange-600 font-semibold underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
