import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../api/api";

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await API.post("/login", loginData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);

      if (res.data.role === "ADMIN") {
        navigate("/dashboard");
      } else if (res.data.role === "TEACHER") {
        navigate("/dashboard");
      } else if (res.data.role === "STUDENT") {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Invalid Username or Password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen  flex items-center justify-center px-5">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <div className="text-center">

          <div className="text-6xl">🎓</div>

          <h1 className="text-3xl font-bold mt-3 text-gray-800">
            Student Management
          </h1>

          <p className="text-gray-500 mt-2">
            Login to Continue
          </p>

        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <div>
            <label className="font-semibold block mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={loginData.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {error && (
            <div className="text-red-600 text-center font-semibold">
              {error}
            </div>
          )}

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition"
            disabled={loading}
          >
            {loading ? "Logging..." : "Login"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Login;