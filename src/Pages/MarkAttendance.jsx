import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const STUDENT_API = "http://localhost:8080/api/students";
const ATTENDANCE_API = "http://localhost:8080/api/attendance";

const MarkAttendance = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  const [attendance, setAttendance] = useState({
    studentId: "",
    date: "",
    status: "PRESENT",
    remarks: "",
  });

  useEffect(() => {
    loadStudents();
  }, []);

  // Load Students
  const loadStudents = async () => {
  try {
    const response = await axios.get(STUDENT_API);

    console.log(response.data);

    setStudents(response.data);
  } catch (error) {
    console.error(error);
  }
};

  // Handle Form Change
  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value,
    });
  };

  // Save Attendance
  const saveAttendance = async (e) => {
    e.preventDefault();

    try {
      const attendanceData = {
        studentId: Number(attendance.studentId),
        date: attendance.date,
        status: attendance.status,
        remarks: attendance.remarks,
      };

      await axios.post(ATTENDANCE_API, attendanceData);

      alert("Attendance Marked Successfully");

      navigate("/attendance");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Unable to save attendance.");
      } else {
        alert("Server not responding.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg">

        {/* Header */}
        <div className="bg-green-600 text-white px-6 py-4 rounded-t-xl">
          <h3 className="text-2xl font-bold">Mark Attendance</h3>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={saveAttendance}>

            {/* Student */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Student
              </label>

              <select
                name="studentId"
                value={attendance.studentId}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Select Student</option>

                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Attendance Date
              </label>

              <input
                type="date"
                name="date"
                value={attendance.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Status */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Status
              </label>

              <select
                name="status"
                value={attendance.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="PRESENT">Present</option>
                <option value="ABSENT">Absent</option>
              </select>
            </div>

            {/* Remarks */}
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2">
                Remarks
              </label>

              <textarea
                rows="3"
                name="remarks"
                value={attendance.remarks}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Save Attendance
              </button>

              <button
                type="button"
                onClick={() => navigate("/attendance")}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default MarkAttendance;