"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { LogIn } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    // Process login with email and password
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);

    // Add your login logic here
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function to handle "Forgot Password" click
  const handleForgotPassword = () => {
    // Implement forgot password logic here
    console.log("Forgot Password clicked");
  };

  return (
    <div className="w-full h-full animate-slide-down">
      <h2 className="text-3xl text-black text-center mb-8 font-semibold">
        Login!
      </h2>
      <div className="w-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col items-center "
        >
          <div className="mb-4 w-full">
            <label
              htmlFor="email"
              className="block text-black text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:ring-white focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-6 w-full relative overflow-hidden">
            <label
              htmlFor="password"
              className="block text-black text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full px-3 py-2 text-black border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring focus:ring-white focus:ring-opacity-50"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-gray-600"
            >
              {showPassword ? <Eye width={20} /> : <EyeOff width={20} />}
            </button>
          </div>
          <div className="w-full flex flex-row justify-end items-center">
           
            <button
              type="button"
              onClick={handleForgotPassword}
              className="mb-4 text-blue-500 hover:text-blue-700 text-sm text-nowrap"
            >
              Forgot Password?
            </button>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              type="submit"
              className=" flex items-center gap-3 py-2 px-5 text-white bg-[#f0d464] rounded-md  hover:bg-[#c5ae51] transition-colors duration-300"
            >
              Login <LogIn />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
