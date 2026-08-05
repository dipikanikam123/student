import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/teachers"
      );

      setTeachers(response.data);
    } catch (error) {
      console.error("Error loading teachers:", error);
      alert("Failed to load teachers");
    }
  };

  const deleteTeacher = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/teachers/${id}`
      );

      alert("Teacher deleted successfully");

      loadTeachers();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete teacher");
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const keyword = search.toLowerCase();

    return (
      teacher.firstName?.toLowerCase().includes(keyword) ||
      teacher.lastName?.toLowerCase().includes(keyword) ||
      teacher.email?.toLowerCase().includes(keyword) ||
      teacher.teacherCode?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Teachers
          </h2>

          <Link
            to="/addteacher"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
          >
            + Add Teacher
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search by name, email or teacher code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Code</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Department</th>
                <th className="p-3">Qualification</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredTeachers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-5">
                    No Teachers Found
                  </td>
                </tr>
              ) : (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{teacher.id}</td>
                    <td className="p-3">{teacher.teacherCode}</td>
                    <td className="p-3">
                      {teacher.firstName} {teacher.lastName}
                    </td>
                    <td className="p-3">{teacher.email}</td>
                    <td className="p-3">{teacher.phone}</td>
                    <td className="p-3">{teacher.department}</td>
                    <td className="p-3">{teacher.qualification}</td>

                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link
                          to={`/teachers/edit/${teacher.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deleteTeacher(teacher.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default TeacherList;