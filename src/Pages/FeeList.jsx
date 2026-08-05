import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FeeList = () => {

    const [fees, setFees] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadFees();
    }, []);

    const loadFees = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/fees");
            setFees(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load fee records.");
        }
    };

    const deleteFee = async (id) => {

        if (!window.confirm("Are you sure you want to delete this fee record?"))
            return;

        try {
            await axios.delete(`http://localhost:8080/api/fees/${id}`);
            alert("Fee Deleted Successfully");
            loadFees();
        } catch (error) {
            console.error(error);
            alert("Unable to delete fee.");
        }
    };

    const filteredFees = fees.filter((fee) => {

        const studentName =
            `${fee.student?.firstName || ""} ${fee.student?.lastName || ""}`;

        return (
            studentName.toLowerCase().includes(search.toLowerCase()) ||
            fee.status?.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-7xl mx-auto">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold">Fee Management</h2>

                    <Link
                        to="/addfee"
                        className="bg-green-600 text-white px-5 py-2 rounded-lg"
                    >
                        + Add Fee
                    </Link>
                </div>

                <input
                    type="text"
                    placeholder="Search Student"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-5"
                />

                <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-800 text-white">

                            <tr>
                                <th className="p-3">ID</th>
                                <th className="p-3">Student</th>
                                <th className="p-3">Total Fee</th>
                                <th className="p-3">Paid</th>
                                <th className="p-3">Pending</th>
                                <th className="p-3">Payment Date</th>
                                <th className="p-3">Payment Mode</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {filteredFees.length === 0 ? (

                                <tr>
                                    <td colSpan="9" className="text-center p-5">
                                        No Fee Records Found
                                    </td>
                                </tr>

                            ) : (

                                filteredFees.map((fee) => (

                                    <tr key={fee.id} className="border-b">

                                        <td className="p-3">{fee.id}</td>

                                        <td className="p-3">
                                            {fee.student?.firstName}{" "}
                                            {fee.student?.lastName}
                                        </td>

                                        <td className="p-3">
                                            ₹ {fee.totalFee}
                                        </td>

                                        <td className="p-3 text-green-600">
                                            ₹ {fee.paidAmount}
                                        </td>

                                        <td className="p-3 text-red-600">
                                            ₹ {fee.pendingAmount}
                                        </td>

                                        <td className="p-3">
                                            {fee.paymentDate}
                                        </td>

                                        <td className="p-3">
                                            {fee.paymentMode}
                                        </td>

                                        <td className="p-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-white ${
                                                    fee.status === "PAID"
                                                        ? "bg-green-600"
                                                        : "bg-red-600"
                                                }`}
                                            >
                                                {fee.status}
                                            </span>
                                        </td>

                                        <td className="p-3">

                                            <button
                                                onClick={() =>
                                                    deleteFee(fee.id)
                                                }
                                                className="bg-red-600 text-white px-4 py-2 rounded"
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

export default FeeList;