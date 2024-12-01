import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeeList from './components/EmployeeList';
import EmployeeDetails from './components/EmployeeDetails';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<Login />} />
        
        {/* Signup Route */}
        <Route path="/signup" element={<Signup />} />
        
        {/* Employee List Route (protected route, post-login) */}
        <Route path="/employees" element={<EmployeeList />} />
        
        {/* Employee Details Route */}
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        
        {/* Add New Employee Route */}
        <Route path="/employees/add" element={<AddEmployee />} />
        
        {/* Edit Employee Route */}
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
      </Routes>
    </div>
  );
}

export default App;
