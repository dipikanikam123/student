import React from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  IndianRupee,
  Bell,
} from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,250",
      icon: <Users size={30} />,
      color: "bg-blue-500",
    },
    {
      title: "Teachers",
      value: "85",
      icon: <GraduationCap size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Classes",
      value: "30",
      icon: <BookOpen size={30} />,
      color: "bg-purple-500",
    },
    {
      title: "Attendance",
      value: "95%",
      icon: <CalendarCheck size={30} />,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-700 text-white shadow-lg">
        <div className="flex items-center justify-between px-8 py-4">
          <div>
            <h1 className="text-3xl font-bold">
              School Management System
            </h1>
            <p className="text-sm text-blue-100">
              Welcome Admin 👋
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Bell size={22} />
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{item.title}</p>
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
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Quick Actions
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <button   onClick={() => navigate("/studentList")} className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                Add Student
              </button>

              <button className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Add Teacher
              </button>

              <button className="bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600">
                Mark Attendance
              </button>

              <button className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700">
                Collect Fees
              </button>
            </div>
          </div>

          {/* Fee Collection */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Fee Collection
            </h2>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-gray-500">
                  Total Collection
                </p>
                <h2 className="text-3xl font-bold text-green-600">
                  ₹2,45,000
                </h2>
              </div>

              <IndianRupee
                size={40}
                className="text-green-600"
              />
            </div>

            <div className="mt-4">
              <p className="text-red-500 font-medium">
                Pending Fees: ₹58,000
              </p>
            </div>
          </div>
        </div>

        {/* Activities & Notice Board */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Recent Activities
            </h2>

            <ul className="space-y-3">
              <li>✅ New student admitted</li>
              <li>✅ Attendance updated</li>
              <li>✅ Fee received</li>
              <li>✅ Teacher added</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Notice Board
            </h2>

            <ul className="space-y-3">
              <li>📢 Independence Day Celebration</li>
              <li>📢 Parent Meeting on Friday</li>
              <li>📢 Unit Test starts next week</li>
              <li>📢 Annual Sports Day Registration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;