import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";

const Register = () => {
  const [message, setMessage] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };

    try {
      await registerUser(data).unwrap();
      alert("Registration is successful!");
      navigate("/login");
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div
        className="relative overflow-hidden flex w-full md:w-1/2 justify-around items-center bg-gradient-to-r from-orange-600 to-orange-400"
      >
        <Link to="/" className="absolute top-6 left-6">
          <img src="/sambhaar.png" alt="Logo" className="h-8 md:h-12" />
        </Link>
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
            Sambhaar
          </h1>
          <p className="text-white font-normal text-lg sm:text-xl md:text-2xl">
            Your Trusted Source for Everyday Groceries
          </p>
        </div>
      </div>

      {/* Right Section (Form) */}
      <div className="flex justify-center py-10 px-6 md:px-10 items-center bg-white w-full md:w-1/2">
        <form
          onSubmit={handleRegister}
          className="space-y-5 max-w-sm mx-auto pt-8 w-full"
        >
          <h1 className="text-gray-800 font-bold text-2xl sm:text-3xl md:text-4xl mb-1 text-center">
            Register now!
          </h1>
          <p className="text-sm sm:text-base font-normal text-gray-600 mb-7 text-center">
            Enter your information to register
          </p>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            name="username"
            id="username"
            placeholder="User Name"
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3 rounded-full border-2 border-gray-300 focus:border-primary focus:ring-0.5 focus:ring-orange-400 transition"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
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
            Register
          </button>

          <p className="my-5 italic text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-600 font-semibold underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
