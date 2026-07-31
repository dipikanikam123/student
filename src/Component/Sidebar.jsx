import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  CalendarCheck,
  Wallet
} from "lucide-react";

const Sidebar = ({ open }) => {
  const location = useLocation();

  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Students",
      icon: <GraduationCap size={20} />,
      path: "/studentList",
    },
    {
      name: "Teachers",
      icon: <Users size={20} />,
      path: "/teacherList",
    },
    {
      name: "Attendance",
      icon: <CalendarCheck size={20} />,
      path: "/markattendance",
    },
    {
      name: "Fees",
      icon: <Wallet size={20} />,
      path: "/feelist",
    },
  ];

  return (
    <aside
      className={`fixed lg:static top-0 left-0 h-screen w-64 bg-blue-700 text-white transition-transform duration-300 z-50
      ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="text-center py-6 border-b border-blue-500">
        <h2 className="text-2xl font-bold">SMS</h2>
      </div>

      <nav className="mt-6">

        {menus.map((menu) => (

          <Link
            key={menu.name}
            to={menu.path}
            className={`flex items-center gap-3 px-6 py-4 hover:bg-blue-800 transition
            ${
              location.pathname === menu.path
                ? "bg-blue-900"
                : ""
            }`}
          >
            {menu.icon}
            {menu.name}
          </Link>

        ))}

      </nav>

    </aside>
  );
};

export default Sidebar;