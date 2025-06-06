import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AuthLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://devsenti-dev.onrender.com/auth/login/",
        formData
      );

      
      const { access_token, refresh_token, profile } = response.data;
      
      // Store tokens in localStorage or secure cookies
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("user", JSON.stringify(profile[0]));

      navigate("/dashboard"); 

    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        if (err.response.status === 400) {
          setError("Invalid email or password");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response from server. Please check your connection.");
      } else {
        // Something happened in setting up the request
        setError("Error setting up request. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center">
      <div className="mx-auto max-w-md w-full bg-white">
        {/* Logo Section */}
        <div className="flex mb-5 justify-center">
          <img src={assets.logo} alt="Logo" className="h-12 md:h-14 w-auto" />
        </div>

        {/* Welcome Text */}
        <h1 className="mt-6 md:mt-8 text-center text-xl md:text-2xl text-brightblue md:ml-4">
          Welcome Back!
        </h1>

        {/* Error Message */}
        {error && (
          <div className="px-4 md:px-6 mt-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="mt-6 w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="px-4 md:px-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Password Field */}
            <div className="px-4 md:px-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex flex-col md:flex-row justify-between px-4 md:px-6 text-sm">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="remember" className="text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to={"/forgot-password"}
                className="text-brightblue hover:text-blue-700"
              >
                <button
                  type="button"
                  className="text-brightblue hover:text-blue-700 mt-2 md:mt-0"
                >
                  Forgot password?
                </button>
              </Link>
            </div>

            {/* Submit Button */}
            <div className="px-4 md:px-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-textBlue text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Logging in..." : "Continue"}
              </button>
            </div>
          </form>
        </div>

        {/* Other Login Methods */}
        <div className="mt-4 text-center">
          <h1 className="text-gray-600">or login with</h1>
        </div>

        <div className="px-4 md:px-6 mt-4">
          <button className="w-full justify-center flex px-6 py-2 border-2 border-blue-500 text-darkblue rounded-lg transition-all hover:bg-blue-200">
            <img src={assets.google} alt="google" className="w-5 h-5 mr-2" />
            Google
          </button>
        </div>

        {/* Sign-up Prompt */}
        <div className="mt-6 text-center">
          <h1 className="text-gray-600">
            Don't have an account? {""}
            <Link
              to={"/signup"}
              className="text-textBlue cursor-pointer hover:underline"
            >
              Create account
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default AuthLogin;