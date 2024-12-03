const { body, validationResult } = require('express-validator');
const Employee = require('../models/employee');

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json(employees);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch employees', details: err.message });
    }
};

// Create a new employee
const createEmployee = [
    // Validações para os campos
    body('firstName').notEmpty().withMessage('First name is required').trim().escape(),
    body('lastName').notEmpty().withMessage('Last name is required').trim().escape(),
    body('email').isEmail().withMessage('Email is invalid').normalizeEmail(),
    body('department').notEmpty().withMessage('Department is required').trim().escape(),
    body('position').notEmpty().withMessage('Position is required').trim().escape(),

    async (req, res) => {
        // Verificação de erros
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extração dos dados do corpo da requisição
        const { firstName, lastName, email, department, position } = req.body;

        try {
            // Criação e salvamento do novo funcionário
            const newEmployee = new Employee({ firstName, lastName, email, department, position });
            await newEmployee.save();
            return res.status(201).json(newEmployee);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to create employee', details: err.message });
        }
    }
];

// Get an employee by ID
const getEmployeeById = async (req, res) => {
    const { eid } = req.params;

    try {
        const employee = await Employee.findById(eid);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json(employee);
    } catch (err) {
        return res.status(500).json({ error: 'Failed to fetch employee', details: err.message });
    }
};

const updateEmployee = [
    // Validações para os campos opcionais
    body('firstName').optional().notEmpty().withMessage('First name cannot be empty').trim().escape(),
    body('lastName').optional().notEmpty().withMessage('Last name cannot be empty').trim().escape(),
    body('email').optional().isEmail().withMessage('Email is invalid').normalizeEmail(),
    body('department').optional().notEmpty().withMessage('Department cannot be empty').trim().escape(),
    body('position').optional().notEmpty().withMessage('Position cannot be empty').trim().escape(),

    async (req, res) => {
        const { eid } = req.params;

        // Verificação de erros
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Extração dos campos do corpo da requisição
        const { firstName, lastName, email, department, position } = req.body;

        try {
            // Atualiza o funcionário com os campos fornecidos
            const updatedEmployee = await Employee.findByIdAndUpdate(
                eid,
                { firstName, lastName, email, department, position },
                { new: true } // Retorna o documento atualizado
            );
            if (!updatedEmployee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            return res.status(200).json(updatedEmployee);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to update employee', details: err.message });
        }
    }
];

// Delete an employee by ID
const deleteEmployee = async (req, res) => {
    const { eid } = req.params;

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (!deletedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: 'Failed to delete employee', details: err.message });
    }
};

// Search employees by department or position
const searchEmployees = async (req, res) => {
    const { searchTerm } = req.body;

    try {
        // Construção da query para buscar por department ou position
        const query = {
            $or: [
                { department: { $regex: searchTerm, $options: "i" } },
                { position: { $regex: searchTerm, $options: "i" } }
            ]
        };

        // Realiza a pesquisa no banco de dados
        const employees = await Employee.find(query);
        return res.status(200).json(employees);
    } catch (err) {
        // Retorna erro em caso de falha
        return res.status(500).json({ error: 'Falha ao buscar funcionários', details: err.message });
    }
};


module.exports = {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployees
};