import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import API from "../../api/api";

const AddFee = () => {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);

    const [fee, setFee] = useState({
        studentId: "",
        totalFee: "",
        paidAmount: "",
        pendingAmount: "",
        status: "PENDING",
        paymentDate: "",
        remarks: ""
    });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {

        try {

            const response = await API.get("/students");

            setStudents(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load students.");

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        let updatedFee = {
            ...fee,
            [name]: value
        };

        if (name === "totalFee" || name === "paidAmount") {

            const total =
                Number(name === "totalFee" ? value : updatedFee.totalFee);

            const paid =
                Number(name === "paidAmount" ? value : updatedFee.paidAmount);

            const pending = total - paid;

            updatedFee.pendingAmount = pending < 0 ? 0 : pending;

            updatedFee.status =
                pending <= 0 ? "PAID" : "PENDING";

        }

        setFee(updatedFee);

    };

    const saveFee = async (e) => {

        e.preventDefault();

        try {

            await API.post("/fees", fee);

            alert("Fee Added Successfully");

            navigate("/fees");

        }

        catch (error) {

            console.log(error);

            alert("Unable to save fee.");

        }

    };

    return (
  <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
    <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg">
      <div className="bg-blue-600 text-white px-6 py-4 rounded-t-xl">
        <h2 className="text-2xl font-bold">Add Student Fee</h2>
      </div>

      <form onSubmit={saveFee} className="p-6 space-y-5">

        {/* Student */}
        <div>
          <label className="block mb-2 font-medium">Student</label>
          <select
            name="studentId"
            value={fee.studentId}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Total Fee */}
        <div>
          <label className="block mb-2 font-medium">Total Fee</label>
          <input
            type="number"
            name="totalFee"
            value={fee.totalFee}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Paid Amount */}
        <div>
          <label className="block mb-2 font-medium">Paid Amount</label>
          <input
            type="number"
            name="paidAmount"
            value={fee.paidAmount}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Pending */}
        <div>
          <label className="block mb-2 font-medium">Pending Amount</label>
          <input
            type="number"
            value={fee.pendingAmount}
            readOnly
            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-2 font-medium">Status</label>
          <input
            type="text"
            value={fee.status}
            readOnly
            className={`w-full rounded-lg px-4 py-2 text-white font-semibold ${
              fee.status === "PAID"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />
        </div>

        {/* Payment Date */}
        <div>
          <label className="block mb-2 font-medium">Payment Date</label>
          <input
            type="date"
            name="paymentDate"
            value={fee.paymentDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Remarks */}
        <div>
          <label className="block mb-2 font-medium">Remarks</label>
          <textarea
            rows="4"
            name="remarks"
            value={fee.remarks}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
          >
            Save Fee
          </button>

          <button
            type="button"
            onClick={() => navigate("/fees")}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition"
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