import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
 import Navbar from "./Component/Navbar";
import Register from "./Pages/Register";
// import './App.css'
import PrivateRoute from "./Component/PrivateRoute";
import Sidebar from "./Component/Sidebar";
import AddFee from "./Pages/AddFee";
import AddStudent from "./Pages/AddStudent";
import AddTeacher from "./Pages/AddTeacher";
import AttendanceList from "./Pages/AttendanceList";
import Dashboard from "./Pages/Dashboard";
import EditStudent from "./Pages/EditStudent";
import EditTeacher from "./Pages/EditTeacher";
import FeeList from "./Pages/FeeList";
import MarkAttendance from "./Pages/MarkAttendance";
import StudentList from "./Pages/StudentList";
import TeacherList from "./Pages/TeacherList";
import  Home  from "./Pages/Home";



function App() {
  
  return (
    <>
      <Navbar /> 
     <BrowserRouter>
     <Routes>
      
      {/* <Route path="/" element={<Navigate to ="/Login"/>}/> */}
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
       {/* <Route path="/Navbar" element={<Navbar />}/>  */}
      <Route path="/PrivateRoute" element={<PrivateRoute />} />
      <Route path="/sidebar" element={<Sidebar/>}/>
      <Route path="/addfee" element={<AddFee/>}/>
      <Route path="/addstudent" element={<AddStudent />}/>
      <Route path="/addteacher" element={<AddTeacher/>}/>
      <Route path="/attendance" element={<AttendanceList/>}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      {/* <Route path="/editstudent" element={<EditStudent />} /> */}
      {/* <Route path="/editteacher" element={<EditTeacher />}/> */}
      <Route path="/feelist" element={<FeeList />}/>
      <Route path="/markattendance" element={<MarkAttendance />}/>
      <Route path="/studentList" element={<StudentList />}/>
      <Route path="/teacherlist" element={<TeacherList />}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
