import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ViewEmployee = () => {
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You need to be logged in to view the details.");
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

  return (
    <div className="container py-5">
      <Header />
      {error && <p className="text-danger">{error}</p>}
      {employee ? (
        <div className="card mt-5">
          <div className="card-body">
            <h1 className="card-title text-center">Employee Details</h1>
            <p className="card-text">
              <i className="bi bi-person-fill me-2"></i>
              <strong>Name:</strong> {employee.firstName} {employee.lastName}
            </p>
            <p className="card-text">
              <i className="bi bi-envelope-fill me-2"></i>
              <strong>Email:</strong> {employee.email}
            </p>
            <p className="card-text">
              <i className="bi bi-building me-2"></i>
              <strong>Department:</strong> {employee.department}
            </p>
            <p className="card-text">
              <i className="bi bi-briefcase-fill me-2"></i>
              <strong>Position:</strong> {employee.position}
            </p>
            <button
              onClick={() => navigate("/employees")}
              className="btn btn-primary mt-3 w-10"
            >
              Back
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewEmployee;
