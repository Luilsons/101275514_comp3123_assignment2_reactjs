const express = require('express');
const {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
} = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware de autenticação

const router = express.Router();

router.get('/all', authMiddleware, getAllEmployees); // Get all employees
router.post('/new', authMiddleware, createEmployee); // Create a new employee
router.get('/get/:eid', authMiddleware, getEmployeeById); // Get an employee by ID
router.put('/update/:eid', authMiddleware, updateEmployee); // Update an employee by ID
router.delete('/delete/:eid', authMiddleware, deleteEmployee); // Delete an employee by ID

// Search employees by department or position
router.post('/search', authMiddleware, searchEmployees);


module.exports = router;