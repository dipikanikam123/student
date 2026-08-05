import React, { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  CalendarCheck,
  IndianRupee,
  Bell,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {

  const navigate = useNavigate();

  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [attendance, setAttendance] = useState(0);
  const [totalFee, setTotalFee] = useState(0);
  const [pendingFee, setPendingFee] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const [
        studentRes,
        teacherRes,
        attendanceRes,
        feeRes,
      ] = await Promise.all([
        axios.get("http://localhost:8080/api/students"),
        axios.get("http://localhost:8080/api/teachers"),
        axios.get("http://localhost:8080/api/attendance"),
        axios.get("http://localhost:8080/api/fees"),
      ]);

      // Student Count
      setStudentCount(studentRes.data.length);

      // Teacher Count
      setTeacherCount(teacherRes.data.length);

      // Attendance %
      const attendanceList = attendanceRes.data;

      const totalAttendance = attendanceList.length;

      const presentCount = attendanceList.filter(
        (a) => a.status === "PRESENT"
      ).length;

      const percentage =
        totalAttendance === 0
          ? 0
          : Math.round((presentCount / totalAttendance) * 100);

      setAttendance(percentage);

      // Fees
      const fees = feeRes.data;

      let paid = 0;
      let pending = 0;

      fees.forEach((fee) => {
        paid += Number(fee.paidAmount || 0);
        pending += Number(fee.pendingAmount || 0);
      });

      setTotalFee(paid);
      setPendingFee(pending);

    } catch (error) {
      console.log(error);
    }
  };

  const stats = [
    {
      title: "Total Students",
      value: studentCount,
      icon: <Users size={30} />,
      color: "bg-blue-500",
    },
    {
      title: "Teachers",
      value: teacherCount,
      icon: <GraduationCap size={30} />,
      color: "bg-green-500",
    },
    // {
    //   title: "Classes",
    //   value: "30",
    //   icon: <BookOpen size={30} />,
    //   color: "bg-purple-500",
    // },
    {
      title: "Attendance",
      value: attendance + "%",
      icon: <CalendarCheck size={30} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}

      <div className="bg-blue-700 text-white shadow-lg">

        <div className="flex justify-between items-center px-8 py-4">

          <div>

            <h1 className="text-3xl font-bold">
              School Management System
            </h1>

            <p className="text-blue-100">
              Welcome Admin 👋
            </p>

          </div>

          <div className="flex items-center gap-4">

            <Bell size={22} />

            <img
              src="https://i.pravatar.cc/40"
              alt=""
              className="rounded-full"
            />

          </div>

        </div>

      </div>

      <div className="p-6">

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl"
            >

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>

                </div>

                <div
                  className={`${item.color} p-3 rounded-lg text-white`}
                >
                  {item.icon}
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Quick Actions */}

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <button
                onClick={() => navigate("/addstudent")}
                className="bg-blue-600 text-white py-3 rounded-lg"
              >
                Add Student
              </button>

              <button
                onClick={() => navigate("/addteacher")}
                className="bg-green-600 text-white py-3 rounded-lg"
              >
                Add Teacher
              </button>

              <button
                onClick={() => navigate("/attendance")}
                className="bg-orange-500 text-white py-3 rounded-lg"
              >
                Mark Attendance
              </button>

              <button
                onClick={() => navigate("/addfee")}
                className="bg-purple-600 text-white py-3 rounded-lg"
              >
                Collect Fees
              </button>

            </div>

          </div>

          {/* Fee */}

          <div className="bg-white rounded-xl shadow-md p-6">

            <h2 className="text-xl font-semibold mb-4">
              Fee Collection
            </h2>

            <div className="flex justify-between items-center bg-green-50 rounded-lg p-4">

              <div>

                <p className="text-gray-500">
                  Total Collection
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                  ₹ {totalFee}
                </h2>

              </div>

              <IndianRupee
                size={40}
                className="text-green-600"
              />

            </div>

            <div className="mt-4">

              <p className="text-red-500 font-semibold">
                Pending Fees : ₹ {pendingFee}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;