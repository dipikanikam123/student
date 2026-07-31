import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import API from "../../api/api";

const TeacherList = () => {

    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {
        loadTeachers();
    }, []);



    const loadTeachers = async () => {

        try {

            const response = await API.get("/teachers");

            setTeachers(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load teachers");

        }

    };




    const deleteTeacher = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this teacher?"
        );


        if (!confirmDelete) return;



        try {

            await API.delete(`/teachers/${id}`);

            alert("Teacher deleted successfully");

            loadTeachers();


        } catch (error) {

            console.error(error);

            alert("Failed to delete teacher");

        }

    };





    const filteredTeachers = teachers.filter((teacher) =>

        teacher.firstName?.toLowerCase().includes(search.toLowerCase()) ||

        teacher.lastName?.toLowerCase().includes(search.toLowerCase()) ||

        teacher.email?.toLowerCase().includes(search.toLowerCase()) ||

        teacher.teacherCode?.toLowerCase().includes(search.toLowerCase())

    );





    return (

        <div className="min-h-screen bg-gray-100 p-6">


            <div className="max-w-7xl mx-auto">


                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-center mb-6">


                    <h2 className="text-3xl font-bold text-gray-800">
                        Teachers
                    </h2>



                    <Link
                        to="/teachers/add"
                        className="mt-3 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
                    >
                        + Add Teacher
                    </Link>


                </div>






                {/* Search */}

                <div className="mb-5">

                    <input
                        type="text"
                        placeholder="Search by name, email, or teacher code..."
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
                                    Qualification
                                </th>


                                <th className="px-6 py-4">
                                    Actions
                                </th>


                            </tr>


                        </thead>





                        <tbody>


                            {
                                filteredTeachers.length === 0 ? (


                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            No teachers found
                                        </td>


                                    </tr>



                                ) : (



                                    filteredTeachers.map((teacher)=>(



                                        <tr
                                            key={teacher.id}
                                            className="border-b hover:bg-gray-50"
                                        >



                                            <td className="px-6 py-4">
                                                {teacher.id}
                                            </td>



                                            <td className="px-6 py-4 font-medium">
                                                {teacher.teacherCode}
                                            </td>



                                            <td className="px-6 py-4">
                                                {teacher.firstName} {teacher.lastName}
                                            </td>



                                            <td className="px-6 py-4">
                                                {teacher.email}
                                            </td>



                                            <td className="px-6 py-4">
                                                {teacher.phone}
                                            </td>



                                            <td className="px-6 py-4">
                                                {teacher.department}
                                            </td>



                                            <td className="px-6 py-4">
                                                {teacher.qualification}
                                            </td>




                                            <td className="px-6 py-4 flex gap-2">


                                                <Link

                                                    to={`/teachers/edit/${teacher.id}`}

                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"

                                                >
                                                    Edit

                                                </Link>





                                                <button

                                                    onClick={() => deleteTeacher(teacher.id)}

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


export default TeacherList;