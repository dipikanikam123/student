import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import API from "../../api/api";

const FeeList = () => {

    const [fees, setFees] = useState([]);
    const [search, setSearch] = useState("");


    useEffect(() => {
        loadFees();
    }, []);



    const loadFees = async () => {

        try {

            const response = await API.get("/fees");

            setFees(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load fee records.");

        }

    };



    const deleteFee = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this fee record?"
        );


        if (!confirmDelete) return;


        try {

            await API.delete(`/fees/${id}`);

            alert("Fee Deleted Successfully");

            loadFees();

        } catch (error) {

            console.error(error);

            alert("Unable to delete fee.");

        }

    };



    const filteredFees = fees.filter((fee) =>

        fee.studentName?.toLowerCase().includes(search.toLowerCase()) ||

        fee.status?.toLowerCase().includes(search.toLowerCase())

    );



    return (

        <div className="min-h-screen bg-gray-100 p-6">


            <div className="max-w-7xl mx-auto">


                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between items-center mb-6">


                    <h2 className="text-3xl font-bold text-gray-800">
                        Fee Management
                    </h2>



                    <Link
                        to="/fees/add"
                        className="mt-3 md:mt-0 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
                    >
                        + Add Fee
                    </Link>


                </div>





                {/* Search */}

                <div className="mb-5">

                    <input
                        type="text"
                        placeholder="Search by Student Name or Status"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                        className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                </div>






                {/* Table Card */}

                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">


                    <table className="w-full text-left">


                        <thead className="bg-gray-800 text-white">


                            <tr>

                                <th className="px-6 py-4">
                                    ID
                                </th>

                                <th className="px-6 py-4">
                                    Student
                                </th>

                                <th className="px-6 py-4">
                                    Total Fee
                                </th>

                                <th className="px-6 py-4">
                                    Paid
                                </th>

                                <th className="px-6 py-4">
                                    Pending
                                </th>

                                <th className="px-6 py-4">
                                    Status
                                </th>

                                <th className="px-6 py-4">
                                    Action
                                </th>


                            </tr>


                        </thead>





                        <tbody>


                            {
                                filteredFees.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-6 text-gray-500"
                                        >
                                            No Fee Records Found
                                        </td>

                                    </tr>


                                ) : (


                                    filteredFees.map((fee)=>(


                                        <tr
                                            key={fee.id}
                                            className="border-b hover:bg-gray-50"
                                        >


                                            <td className="px-6 py-4">
                                                {fee.id}
                                            </td>


                                            <td className="px-6 py-4 font-medium">
                                                {fee.studentName}
                                            </td>


                                            <td className="px-6 py-4">
                                                ₹ {fee.totalFee}
                                            </td>


                                            <td className="px-6 py-4 text-green-600 font-semibold">
                                                ₹ {fee.paidAmount}
                                            </td>


                                            <td className="px-6 py-4 text-red-600 font-semibold">
                                                ₹ {fee.pendingAmount}
                                            </td>



                                            <td className="px-6 py-4">


                                                {
                                                    fee.status === "PAID" ? (

                                                        <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 font-semibold">
                                                            Paid
                                                        </span>


                                                    ) : (


                                                        <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 font-semibold">
                                                            Pending
                                                        </span>


                                                    )
                                                }


                                            </td>




                                            <td className="px-6 py-4">


                                                <button
                                                    onClick={()=>deleteFee(fee.id)}
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


export default FeeList;