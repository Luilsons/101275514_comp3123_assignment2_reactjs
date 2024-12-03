import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Employees from "./views/Employees";
import ViewEmployee from "./views/ViewEmployee";
import EditEmployee from "./views/EditEmployee";
import CreateEmployee from "./views/CreateEmployee";
import Login from "./views/Login";
import SignUp from "./views/SignUp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/view/:employeeId" element={<ViewEmployee />} />
        <Route path="/employees/edit/:employeeId" element={<EditEmployee />} />
        <Route path="/employees/create" element={<CreateEmployee />} />
      </Routes>
    </Router>
  );
};

export default App;
