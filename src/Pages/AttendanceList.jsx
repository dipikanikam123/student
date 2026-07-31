import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import API from "../../api/api";

const AttendanceList = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      const response = await API.get("/attendance");
      setAttendanceList(response.data);
    } catch (error) {
      console.error(error);
      alert("Unable to load attendance.");
    }
  };

  const deleteAttendance = async (id) => {
    if (!window.confirm("Delete this attendance record?")) return;

    try {
      await API.delete(`/attendance/${id}`);
      alert("Attendance Deleted Successfully");
      loadAttendance();
    } catch (error) {
      console.error(error);
      alert("Unable to delete attendance.");
    }
  };

  const filteredAttendance = attendanceList.filter(
    (attendance) =>
      attendance.studentName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      attendance.date?.includes(search)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-4 border-b">

          <h2 className="text-2xl font-bold text-gray-800">
            Attendance List
          </h2>

          <Link
            to="/attendance/add"
            className="mt-3 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
          >
            + Mark Attendance
          </Link>

        </div>

        {/* Search */}
        <div className="p-6">

          <input
            type="text"
            placeholder="Search by Student Name or Date"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-800 text-white">

              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Remarks</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {filteredAttendance.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500"
                  >
                    No Attendance Records Found
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((attendance) => (
                  <tr
                    key={attendance.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">{attendance.id}</td>

                    <td className="px-4 py-3">
                      {attendance.studentName}
                    </td>

                    <td className="px-4 py-3">
                      {attendance.date}
                    </td>

                    <td className="px-4 py-3">
                      {attendance.status === "PRESENT" ? (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Present
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                          Absent
                        </span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {attendance.remarks}
                    </td>

                    <td className="px-4 py-3 text-center">

                      <button
                        onClick={() =>
                          deleteAttendance(attendance.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                      >
                        Delete
                      </button>

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

export default AttendanceList;