import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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
     
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        loginData
      );
      console.log("Login Response:", res.data);


      // Save JWT Token
      localStorage.setItem(
        "token",
        res.data.token
      );


      // Save User Details
      localStorage.setItem(
        "username",
        res.data.username
      );

      localStorage.setItem(
        "role",
        res.data.role
      );


      alert("Login Successful");


      // Role Based Navigation

      if(res.data.role === "Admin"){

        navigate("/dashboard");

      }
      // else if(res.data.role === "TEACHER"){

      //   navigate("/teacher/dashboard");

      // }
      else if(res.data.role === "STUDENT"){

        navigate("/student/sidebar");

      }
      else{

        navigate("/sidebar");

      }


    } catch (err) {

      console.error(err);


      if(err.response){

        setError(
          err.response.data.message ||
          "Invalid Username or Password"
        );

      }
      else{

        setError("Server Error");

      }

    }


    setLoading(false);

  };



  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">


      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">


        <h1 className="text-3xl font-bold text-center mb-6">
          Student Management
        </h1>



        <form onSubmit={handleLogin}>


          <input
            type="text"
            name="username"
            placeholder="Username"
            value={loginData.username}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-4"
            required
          />



          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="border w-full p-3 rounded mb-4"
            required
          />



          {error && (

            <p className="text-red-600 mb-3">
              {error}
            </p>

          )}



          <button
            className="bg-blue-600 text-white w-full p-3 rounded"
            disabled={loading}
          >

            {
              loading 
              ? "Logging..." 
              : "Login"
            }

          </button>


        </form>



        <p className="text-center mt-5">

          Don't have an account?{" "}


          <Link
            to="/register"
            className="text-blue-600 font-bold"
          >
            Register
          </Link>


        </p>



      </div>


    </div>

  );

};


export default Login;