import React from "react";
import { useAuth } from "../models/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Employee Management</a>
        <button
          onClick={handleLogout}
          className="btn btn-outline-danger"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
