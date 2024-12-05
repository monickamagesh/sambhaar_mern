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
    //console.log(data);

    try {
      await registerUser(data).unwrap();
      alert("Registration is successful!");
      navigate("/login");
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <div class="h-screen md:flex">
      <div
        class="relative overflow-hidden md:flex w-1/2 justify-around items-center hidden"
        style={{ background: "linear-gradient(135deg, #ff5722, #ffa726)" }}
      >
        <Link to="/" className="absolute top-6 left-6">
              <img src="/sambhaar.png" alt="Logo" className="h-8 md:h-12 " />
        </Link>
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-white font-bold text-5xl mb-4">Sambhaar</h1>
          <p className="text-white font-normal text-lg">
          Your Trusted Source for Everyday Groceries
          </p>
        </div>
        <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form
          onSubmit={handleRegister}
          className="space-y-5 max-w-sm mx-auto pt-8 "
        >
          <h1 className="text-gray-800 font-bold text-2xl mb-1">
            Register now!
          </h1>
          <p className="text-sm font-normal text-gray-600 mb-7">
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
