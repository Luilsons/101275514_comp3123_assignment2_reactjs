import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const EditEmployee = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    position: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to be logged in to edit data.");
      return;
    }

    fetch(`http://localhost:5000/employees/get/${employeeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error loading data");
        }
        return response.json();
      })
      .then((data) => setEmployee(data))
      .catch((error) => setError(error.message));
  }, [employeeId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEmployee = { ...employee };
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to be logged in to update data.");
      return;
    }

    fetch(`http://localhost:5000/employees/update/${employeeId}`, {
      method: "PUT",
      body: JSON.stringify(updatedEmployee),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error updating data");
        }
        navigate("/employees");
      })
      .catch((error) => setError("Error updating data"));
  };

  return (
    <div className="container py-5">
      <Header />
      <h1 className="text-center mb-4">Edit Employee</h1>
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
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Save Changes
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

export default EditEmployee;
