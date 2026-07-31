import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">

     
      {/* Navbar */}
      <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold">
          Student Management System
        </h1>

        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>

          <Link to="/login" className="hover:text-gray-200">
            Login
          </Link>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-5xl font-bold mb-6">
              Manage Students Easily & Efficiently
            </h2>

            <p className="text-lg mb-8 text-gray-200">
              A complete student management solution to manage
              students, teachers, attendance, fees and academic records.
            </p>

            <Link
              to="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              Get Started
            </Link>
          </div>


          <div className="bg-white rounded-xl p-8 shadow-xl text-gray-800">

            <h3 className="text-2xl font-bold mb-5">
              System Features
            </h3>

            <ul className="space-y-3">
              <li>✅ Student Management</li>
              <li>✅ Teacher Management</li>
              <li>✅ Attendance Tracking</li>
              <li>✅ Fee Management</li>
              <li>✅ Secure Login System</li>
            </ul>

          </div>

        </div>
      </section>



      {/* Statistics */}
      <section className="py-12 px-8">

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-3xl font-bold text-blue-600">
              500+
            </h3>
            <p>Students</p>
          </div>


          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-3xl font-bold text-green-600">
              50+
            </h3>
            <p>Teachers</p>
          </div>


          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-3xl font-bold text-purple-600">
              1000+
            </h3>
            <p>Attendance Records</p>
          </div>


          <div className="bg-white p-6 rounded-xl shadow text-center">
            <h3 className="text-3xl font-bold text-red-600">
              100%
            </h3>
            <p>Secure System</p>
          </div>

        </div>

      </section>



      {/* Role Cards */}
      <section className="py-12 bg-white">

        <h2 className="text-3xl font-bold text-center mb-10">
          User Roles
        </h2>


        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-8">


          <div className="p-8 rounded-xl shadow-lg border hover:scale-105 transition">

            <h3 className="text-2xl font-bold text-blue-600 mb-3">
              Admin
            </h3>

            <p>
              Manage students, teachers, fees and system settings.
            </p>

          </div>



          <div className="p-8 rounded-xl shadow-lg border hover:scale-105 transition">

            <h3 className="text-2xl font-bold text-green-600 mb-3">
              Teacher
            </h3>

            <p>
              Manage attendance, student records and academic details.
            </p>

          </div>



          <div className="p-8 rounded-xl shadow-lg border hover:scale-105 transition">

            <h3 className="text-2xl font-bold text-purple-600 mb-3">
              Student
            </h3>

            <p>
              View profile, attendance and fee information.
            </p>

          </div>


        </div>

      </section>



      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white text-center py-5">

        <p>
          © 2026 Student Management System. All Rights Reserved.
        </p>

      </footer> */}


    </div>
  );
};

export default Home;