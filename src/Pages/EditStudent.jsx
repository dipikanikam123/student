import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import API from "../../api/api";

const EditStudent = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        studentCode: "",
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        email: "",
        phone: "",
        address: "",
        course: "",
        department: "",
        semester: "",
        admissionDate: "",
        active: true
    });

    useEffect(() => {
        loadStudent();
    }, []);

    const loadStudent = async () => {

        try {

            const response = await API.get(`/students/${id}`);

            setStudent(response.data);

        } catch (error) {

            console.log(error);

            alert("Unable to load student.");

        }

    };

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setStudent({
            ...student,
            [name]: type === "checkbox" ? checked : value
        });

    };

    const updateStudent = async (e) => {

        e.preventDefault();

        try {

            await API.put(`/students/${id}`, student);

            alert("Student Updated Successfully");

            navigate("/students");

        } catch (error) {

            console.log(error);

            alert("Unable to update student.");

        }

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-warning">

                    <h3>Edit Student</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={updateStudent}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>Student Code</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="studentCode"
                                    value={student.studentCode}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>First Name</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={student.firstName}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Last Name</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={student.lastName}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={student.email}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Phone</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={student.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Gender</label>

                                <select
                                    className="form-select"
                                    name="gender"
                                    value={student.gender}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Date of Birth</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="dob"
                                    value={student.dob}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Course</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="course"
                                    value={student.course}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Department</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="department"
                                    value={student.department}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Semester</label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="semester"
                                    value={student.semester}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Admission Date</label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="admissionDate"
                                    value={student.admissionDate}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label>Address</label>

                                <textarea
                                    className="form-control"
                                    rows="3"
                                    name="address"
                                    value={student.address}
                                    onChange={handleChange}
                                ></textarea>

                            </div>

                            <div className="col-md-6 mb-3">

                                <div className="form-check mt-4">

                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="active"
                                        checked={student.active}
                                        onChange={handleChange}
                                    />

                                    <label className="form-check-label">

                                        Active Student

                                    </label>

                                </div>

                            </div>

                        </div>

                        <button
                            className="btn btn-primary me-2"
                            type="submit"
                        >
                            Update Student
                        </button>

                        <button
                            className="btn btn-secondary"
                            type="button"
                            onClick={() => navigate("/students")}
                        >
                            Cancel
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

};

export default EditStudent;