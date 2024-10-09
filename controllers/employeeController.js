const Employee = require('../models/employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error fetching employees', error });
    }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
    const { first_name, last_name, email, position, salary, date_of_joining, department } = req.body;
    try {
        const newEmployee = new Employee({ first_name, last_name, email, position, salary, date_of_joining, department });
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully.', employee_id: newEmployee._id });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error creating employee', error });
    }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) return res.status(404).json({ status: false, message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ status: false, message: 'Error fetching employee', error });
    }
};

// Update employee by ID
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        res.status(200).json({ message: 'Employee details updated successfully.' });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error updating employee', error });
    }
};

// Delete employee by ID
exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.query.eid);
        res.status(204).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(400).json({ status: false, message: 'Error deleting employee', error });
    }
};
