import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../models/AuthContext'; 
import Header from "../components/HeaderLogin"; 

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/employees");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token);
        navigate("/employees");
      } else {
        setErrorMessage(data.msg || "Login failed.");
      }
    } catch (error) {
      setErrorMessage("Server error. Please try again.");
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <div className="container d-flex justify-content-center align-items-center flex-grow-1">
        <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Login
            </button>
          </form>
          {errorMessage && (
            <p className="text-danger text-center">{errorMessage}</p>
          )}
          <button
            onClick={() => navigate("/signUp")}
            className="btn btn-secondary w-100"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
