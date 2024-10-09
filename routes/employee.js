const express = require('express');
const { getAllEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const router = express.Router();

// GET: Retrieve all employees
router.get('/employees', getAllEmployees);

// POST: Create a new employee
router.post('/employees', createEmployee);

// GET: Retrieve employee by ID
router.get('/employees/:eid', getEmployeeById);

// PUT: Update employee by ID
router.put('/employees/:eid', updateEmployee);

// DELETE: Delete employee by ID
router.delete('/employees', deleteEmployee);

module.exports = router;
