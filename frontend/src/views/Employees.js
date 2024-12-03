import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../models/AuthContext";
import { fetchEmployees } from "../controllers/EmployeeController";
import Header from "../components/Header";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      const url = searchTerm.trim() === "" ? "/employees/all" : "/employees/search";
      const body = searchTerm.trim() === "" ? {} : { searchTerm };

      fetchEmployees(
        token,
        url,
        body,
        (data) => {
          if (Array.isArray(data)) {
            setEmployees(data);
          } else {
            setEmployees([]);
          }
          setLoading(false);
        },
        (errMsg) => {
          setError(errMsg);
          setEmployees([]);
          setLoading(false);
        }
      );
    }
  }, [token, searchTerm, navigate]);

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/employees/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id)
        );
      })
      .catch((error) => console.error("Error deleting employee:", error));
  };

  return (
    <div className="container py-5" style={{ marginTop: "70px" }}>
      <Header />
      <h1 className="text-center mb-4">Employee List</h1>

      <div className="mb-3 text-center">
        <input
          type="text"
          placeholder="Search by department or position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control w-50 mx-auto"
        />
      </div>

      <div className="text-center mb-4">
        <button
          onClick={() => navigate("/employees/create")}
          className="btn btn-success"
        >
          Create Employee
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : Array.isArray(employees) && employees.length > 0 ? (
        <table className="table table-dark table-striped table-bordered text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.department || "N/A"}</td>
                <td>{employee.position || "N/A"}</td>
                <td>
                  <div className="d-flex justify-content-center">
                    <button
                      onClick={() => navigate(`/employees/view/${employee._id}`)}
                      className="btn btn-info mx-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/employees/edit/${employee._id}`)}
                      className="btn btn-warning mx-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className="btn btn-danger mx-2"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No employees found.</p>
      )}
    </div>
  );
};

export default Employees;
