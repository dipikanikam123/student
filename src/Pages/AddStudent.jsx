import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStudent = () => {
  const navigate = useNavigate();

  const [student, setStudent] = useState({
    studentCode: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    course: "",
    department: "",
    semester: "",
    admissionDate: "",
    active: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:8080/api/students",
      student
    );

    console.log(response.data);

    alert("Student Added Successfully");

    // Go to Student List page
    navigate("/studentList");

    // OR if you want to clear the form instead of navigating:
    /*
    setStudent({
      studentCode: "",
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      email: "",
      phone: "",
      address: "",
      course: "",
      department: "",
      semester: "",
      admissionDate: "",
      active: true,
    });
    */

  } catch (error) {
    console.error(error);

    if (error.response) {
      alert(error.response.data.message || "Unable to save student.");
    } else {
      alert("Server is not running or network error.");
    }
  } finally {
    setLoading(false);
  }
};

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl">

        <div className="bg-blue-600 text-white px-6 py-4 rounded-t-xl">
          <h2 className="text-2xl font-bold">
            Add Student
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Student Code
              </label>
              <input
                type="text"
                name="studentCode"
                value={student.studentCode}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={student.firstName}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={student.lastName}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Gender
              </label>
              <select
                name="gender"
                value={student.gender}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={student.dob}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={student.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Course
              </label>
              <input
                type="text"
                name="course"
                value={student.course}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={student.department}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Semester
              </label>
              <input
                type="number"
                name="semester"
                value={student.semester}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Admission Date
              </label>
              <input
                type="date"
                name="admissionDate"
                value={student.admissionDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 font-medium">
                Address
              </label>
              <textarea
                rows="4"
                name="address"
                value={student.address}
                onChange={handleChange}
                className={inputClass}
              ></textarea>
            </div>

            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={student.active}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600"
              />

              <label className="ml-3 font-medium">
                Active Student
              </label>
            </div>

          </div>

          <div className="flex gap-4 mt-8">

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Saving..." : "Save Student"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/students")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddStudent;