import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const CreateEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/employees/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(employee),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error creating employee");
        }
        return response.json();
      })
      .then(() => {
        navigate("/employees");
      })
      .catch(() => setError("Error creating employee"));
  };

  return (
    <div className="container py-5">
      <Header />
      <h1 className="text-center mb-4">Create New Employee</h1>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="col-md-6 mx-auto">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            value={employee.firstName}
            onChange={(e) =>
              setEmployee({ ...employee, firstName: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            value={employee.lastName}
            onChange={(e) =>
              setEmployee({ ...employee, lastName: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={employee.email}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            value={employee.department}
            onChange={(e) =>
              setEmployee({ ...employee, department: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            type="text"
            className="form-control"
            value={employee.position}
            onChange={(e) =>
              setEmployee({ ...employee, position: e.target.value })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Create Employee
        </button>
      </form>
      <div className="text-center mt-3">
        <button
          onClick={() => navigate("/employees")}
          className="btn btn-secondary"
        >
          Back to Employee List
        </button>
      </div>
    </div>
  );
};

export default CreateEmployee;