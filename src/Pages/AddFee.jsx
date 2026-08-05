import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddFee = () => {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const [fee, setFee] = useState({
        studentId: "",
        totalFee: "",
        paidAmount: "",
        pendingAmount: "",
        paymentDate: "",
        paymentMode: "",
        transactionId: "",
        status: "PENDING"
    });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/students");
        setStudents(response.data);
    } catch (error) {
        console.error(error);
    }
};

    const handleChange = (e) => {

        const { name, value } = e.target;

        let updated = {
            ...fee,
            [name]: value
        };

        if (name === "totalFee" || name === "paidAmount") {

            const total = Number(
                name === "totalFee" ? value : updated.totalFee
            );

            const paid = Number(
                name === "paidAmount" ? value : updated.paidAmount
            );

            const pending = total - paid;

            updated.pendingAmount = pending < 0 ? 0 : pending;

            updated.status = pending === 0 ? "PAID" : "PENDING";
        }

        setFee(updated);
    };

   const saveFee = async (e) => {
    e.preventDefault();

    const feeData = {
        student: {
            id: Number(fee.studentId),
        },
        totalFee: Number(fee.totalFee),
        paidAmount: Number(fee.paidAmount),
        pendingAmount: Number(fee.pendingAmount),
        paymentDate: fee.paymentDate,
        paymentMode: fee.paymentMode,
        transactionId: fee.transactionId,
        status: fee.status,
    };

    await axios.post("http://localhost:8080/api/fees", feeData);

    alert("Fee Added Successfully");
    navigate("/feelist");
};

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">

            <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg">

                <div className="bg-blue-600 text-white p-5 rounded-t-xl">
                    <h2 className="text-2xl font-bold">Add Student Fee</h2>
                </div>

                <form onSubmit={saveFee} className="p-6 space-y-5">

                    <div>
                        <label className="font-medium block mb-2">
                            Student
                        </label>

                        <select
                            name="studentId"
                            value={fee.studentId}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-2"
                        >

                            <option value="">Select Student</option>

                            {students.map((student) => (

                                <option
                                    key={student.id}
                                    value={student.id}
                                >
                                    {student.firstName} {student.lastName}
                                </option>

                            ))}

                        </select>
                    </div>

                    <div>
                        <label>Total Fee</label>

                        <input
                            type="number"
                            name="totalFee"
                            value={fee.totalFee}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    <div>
                        <label>Paid Amount</label>

                        <input
                            type="number"
                            name="paidAmount"
                            value={fee.paidAmount}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    <div>
                        <label>Pending Amount</label>

                        <input
                            type="number"
                            value={fee.pendingAmount}
                            readOnly
                            className="w-full border rounded-lg p-2 bg-gray-100"
                        />
                    </div>

                    <div>
                        <label>Status</label>

                        <input
                            type="text"
                            value={fee.status}
                            readOnly
                            className="w-full border rounded-lg p-2 bg-gray-100"
                        />
                    </div>

                    <div>
                        <label>Payment Date</label>

                        <input
                            type="date"
                            name="paymentDate"
                            value={fee.paymentDate}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    <div>
                        <label>Payment Mode</label>

                        <select
                            name="paymentMode"
                            value={fee.paymentMode}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg p-2"
                        >
                            <option value="">Select</option>
                            <option value="Cash">Cash</option>
                            <option value="Online">Online</option>
                            <option value="UPI">UPI</option>
                            <option value="Card">Card</option>
                        </select>
                    </div>

                    <div>
                        <label>Transaction ID</label>

                        <input
                            type="text"
                            name="transactionId"
                            value={fee.transactionId}
                            onChange={handleChange}
                            className="w-full border rounded-lg p-2"
                        />
                    </div>

                    <div className="flex gap-4">

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                        >
                            Save Fee
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/fees")}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-lg"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default AddFee;