const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const employeeRoutes = require('./routes/employee'); // Include employee routes
require('dotenv').config(); // Load environment variables from .env file
const cors = require("cors");

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000; // Ensure the default port is set to 5000 for backend

// Middleware to parse incoming JSON data
app.use(bodyParser.json());
app.use(cors());
  

// MongoDB Atlas connection using mongoose.connect
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://luilsonsousa:dDeQxU1eruKkAq4Z@comp3123assignment1.lwip7.mongodb.net/?retryWrites=true&w=majority&appName=COMP3123Assignment1';
mongoose.connect(MONGODB_URI, {

    serverSelectionTimeoutMS: 3000, // Timeout after 3 seconds
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('MongoDB Atlas connection error:', err);
    });

// Register the user routes under /api/v1/users
app.use('/users', userRoutes);

// Register the employee routes under /api/v1/employees
app.use('/employees', employeeRoutes);

// Test root route to verify server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});