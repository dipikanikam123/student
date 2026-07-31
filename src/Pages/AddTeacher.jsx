import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../../api/api";

const AddTeacher = () => {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState({
    teacherCode: "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phone: "",
    qualification: "",
    specialization: "",
    experience: "",
    salary: "",
    joiningDate: "",
    address: "",
    active: true,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setTeacher((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveTeacher = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post("/teachers", teacher);

      alert("Teacher Added Successfully");

      navigate("/teachers");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Unable to Save Teacher"
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg">

        <div className="bg-green-600 text-white rounded-t-xl px-6 py-4">
          <h2 className="text-2xl font-bold">Add Teacher</h2>
        </div>

        <form onSubmit={saveTeacher} className="p-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 font-medium">
                Teacher Code
              </label>
              <input
                type="text"
                name="teacherCode"
                value={teacher.teacherCode}
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
                value={teacher.firstName}
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
                value={teacher.lastName}
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
                value={teacher.gender}
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
                Email
              </label>

              <input
                type="email"
                name="email"
                value={teacher.email}
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
                value={teacher.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Qualification
              </label>

              <input
                type="text"
                name="qualification"
                value={teacher.qualification}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Specialization
              </label>

              <input
                type="text"
                name="specialization"
                value={teacher.specialization}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Experience (Years)
              </label>

              <input
                type="number"
                name="experience"
                value={teacher.experience}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Salary
              </label>

              <input
                type="number"
                name="salary"
                value={teacher.salary}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Joining Date
              </label>

              <input
                type="date"
                name="joiningDate"
                value={teacher.joiningDate}
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
                value={teacher.address}
                onChange={handleChange}
                className={inputClass}
              ></textarea>
            </div>

            <div className="md:col-span-2 flex items-center">

              <input
                type="checkbox"
                name="active"
                checked={teacher.active}
                onChange={handleChange}
                className="h-5 w-5 text-green-600 rounded"
              />

              <label className="ml-3 font-medium">
                Active Teacher
              </label>

            </div>

          </div>

          <div className="flex gap-4 mt-8">

            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Saving..." : "Save Teacher"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/teachers")}
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

export default AddTeacher;