import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/students"
      );

      setStudents(response.data);
    } catch (error) {
      console.error("Error loading students:", error);
      alert("Failed to load students.");
    }
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/students/${id}`
      );

      alert("Student deleted successfully.");

      loadStudents();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Unable to delete student.");
    }
  };

  const filteredStudents = students.filter((student) => {
    const keyword = search.toLowerCase();

    return (
      student.firstName?.toLowerCase().includes(keyword) ||
      student.lastName?.toLowerCase().includes(keyword) ||
      student.email?.toLowerCase().includes(keyword) ||
      student.studentCode?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Students</h2>

          <Link
            to="/addstudent"
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            + Add Student
          </Link>
        </div>

        <input
          type="text"
          placeholder="Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3 mb-5"
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
                <th className="p-3">Semester</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-5">
                    No Students Found
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b">
                    <td className="p-3">{student.id}</td>
                    <td className="p-3">{student.studentCode}</td>
                    <td className="p-3">
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3">{student.phone}</td>
                    <td className="p-3">{student.department}</td>
                    <td className="p-3">{student.semester}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Link
                          to={`/addstudent/edit/${student.id}`}
                          className="bg-blue-600 text-white px-3 py-2 rounded"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="bg-red-600 text-white px-3 py-2 rounded"
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

export default StudentList;