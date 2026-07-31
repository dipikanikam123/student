import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import API from "../../api/api";

const EditTeacher = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [teacher, setTeacher] = useState({
        teacherCode: "",
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        phone: "",
        qualification: "",
        specialization: "",
        experience: "",
        salary: "",
        joiningDate: "",
        address: "",
        active: true
    });


    useEffect(() => {
        loadTeacher();
    }, []);


    const loadTeacher = async () => {

        try {

            const response = await API.get(`/teachers/${id}`);

            setTeacher(response.data);

        } catch (error) {

            console.log(error);
            alert("Unable to load teacher.");

        }

    };


    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setTeacher({
            ...teacher,
            [name]: type === "checkbox" ? checked : value
        });

    };


    const updateTeacher = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/teachers/${id}`, teacher);

            alert("Teacher Updated Successfully");

            navigate("/teachers");

        } catch (error) {

            console.log(error);
            alert("Unable to update teacher.");

        }

    };


    return (

        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg">

                {/* Header */}

                <div className="bg-yellow-500 text-white px-6 py-4 rounded-t-xl">

                    <h2 className="text-2xl font-bold">
                        Edit Teacher
                    </h2>

                </div>


                {/* Form */}

                <div className="p-6">

                    <form onSubmit={updateTeacher}>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                            {/* Input Fields */}

                            {
                                [
                                    ["teacherCode","Teacher Code"],
                                    ["firstName","First Name"],
                                    ["lastName","Last Name"],
                                    ["email","Email"],
                                    ["phone","Phone"],
                                    ["qualification","Qualification"],
                                    ["specialization","Specialization"],
                                    ["experience","Experience"],
                                    ["salary","Salary"]

                                ].map(([name,label]) => (

                                    <div key={name}>

                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {label}
                                        </label>

                                        <input
                                            type={
                                                name==="email" 
                                                ? "email" 
                                                : name==="experience" || name==="salary"
                                                ? "number"
                                                : "text"
                                            }
                                            name={name}
                                            value={teacher[name]}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                        />

                                    </div>

                                ))
                            }



                            {/* Gender */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Gender
                                </label>

                                <select
                                    name="gender"
                                    value={teacher.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                >

                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                </select>

                            </div>



                            {/* Joining Date */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Joining Date
                                </label>

                                <input
                                    type="date"
                                    name="joiningDate"
                                    value={teacher.joiningDate}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                                />

                            </div>



                        </div>



                        {/* Address */}

                        <div className="mt-5">

                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address
                            </label>

                            <textarea
                                rows="3"
                                name="address"
                                value={teacher.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            ></textarea>

                        </div>




                        {/* Active Checkbox */}

                        <div className="mt-5 flex items-center gap-2">

                            <input
                                type="checkbox"
                                name="active"
                                checked={teacher.active}
                                onChange={handleChange}
                                className="w-5 h-5"
                            />

                            <label className="text-gray-700 font-medium">
                                Active Teacher
                            </label>

                        </div>




                        {/* Buttons */}

                        <div className="mt-6 flex gap-3">


                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
                            >
                                Update Teacher
                            </button>



                            <button
                                type="button"
                                onClick={() => navigate("/teachers")}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold"
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


export default EditTeacher;