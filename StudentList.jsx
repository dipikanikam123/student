import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import API from "../../api/api";

const StudentList = () => {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {
        loadStudents();
    }, []);



    const loadStudents = async () => {

        try {

            const response = await API.get("/students");

            setStudents(response.data);

        } catch (error) {

            console.log(error);

        }

    };




    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );


        if (!confirmDelete) return;



        try {

            await API.delete(`/students/${id}`);

            alert("Student Deleted Successfully");

            loadStudents();


        } catch (error) {

            console.log(error);

            alert("Unable to delete student.");

        }

    };





    const filteredStudents = students.filter((student) =>

        student.firstName?.toLowerCase().includes(search.toLowerCase()) ||

        student.lastName?.toLowerCase().includes(search.toLowerCase()) ||

        student.email?.toLowerCase().includes(search.toLowerCase()) ||

        student.studentCode?.toLowerCase().includes(search.toLowerCase())

    );





    return (


        <div className="min-h-screen bg-gray-100 p-6">


            <div className="max-w-7xl mx-auto">



                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-center mb-6">


                    <h2 className="text-3xl font-bold text-gray-800">
                        Students
                    </h2>



                    <Link
                        to="/students/add"
                        className="mt-3 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
                    >
                        + Add Student
                    </Link>


                </div>






                {/* Search Box */}

                <div className="mb-5">


                    <input

                        type="text"

                        placeholder="Search Student..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"

                    />


                </div>







                {/* Table */}


                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">


                    <table className="w-full text-left">


                        <thead className="bg-gray-800 text-white">


                            <tr>


                                <th className="px-6 py-4">
                                    ID
                                </th>

                                <th className="px-6 py-4">
                                    Code
                                </th>


                                <th className="px-6 py-4">
                                    Name
                                </th>


                                <th className="px-6 py-4">
                                    Email
                                </th>


                                <th className="px-6 py-4">
                                    Phone
                                </th>


                                <th className="px-6 py-4">
                                    Department
                                </th>


                                <th className="px-6 py-4">
                                    Semester
                                </th>


                                <th className="px-6 py-4">
                                    Action
                                </th>


                            </tr>


                        </thead>





                        <tbody>


                            {
                                filteredStudents.length === 0 ? (


                                    <tr>


                                        <td
                                            colSpan="8"
                                            className="text-center py-6 text-gray-500"
                                        >

                                            No Students Found

                                        </td>


                                    </tr>



                                ) : (



                                    filteredStudents.map((student)=>(



                                        <tr
                                            key={student.id}
                                            className="border-b hover:bg-gray-50"
                                        >



                                            <td className="px-6 py-4">
                                                {student.id}
                                            </td>



                                            <td className="px-6 py-4 font-medium">
                                                {student.studentCode}
                                            </td>




                                            <td className="px-6 py-4">
                                                {student.firstName} {student.lastName}
                                            </td>




                                            <td className="px-6 py-4">
                                                {student.email}
                                            </td>




                                            <td className="px-6 py-4">
                                                {student.phone}
                                            </td>




                                            <td className="px-6 py-4">
                                                {student.department}
                                            </td>




                                            <td className="px-6 py-4">
                                                {student.semester}
                                            </td>





                                            <td className="px-6 py-4 flex gap-2">



                                                <Link

                                                    to={`/students/edit/${student.id}`}

                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"

                                                >

                                                    Edit

                                                </Link>





                                                <button

                                                    onClick={() => deleteStudent(student.id)}

                                                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"

                                                >

                                                    Delete

                                                </button>




                                            </td>



                                        </tr>



                                    ))


                                )
                            }



                        </tbody>



                    </table>



                </div>



            </div>


        </div>


    );

};


export default StudentList;