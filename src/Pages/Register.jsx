import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "Student",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        user
      );

      console.log(response.data);

      alert("Registration Successful");

      navigate("/login");

    } catch (err) {

      console.error(err);

      if (err.response) {
        alert(err.response.data.message || "Registration Failed");
      } else {
        alert("Server Error");
      }

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white shadow-lg p-8 rounded-xl w-[450px]">

        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={register}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={user.username}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-4"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-4"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-4"
            required
          />

          <select
    name="role"
    value={user.role}
    onChange={handleChange}
    className="border w-full p-3 rounded mb-5"
>
    <option value="Student">Student</option>
    <option value="Admin">Admin</option>
</select>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
};

export default Register;