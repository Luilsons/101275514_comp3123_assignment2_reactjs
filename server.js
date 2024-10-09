const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user'); // Import the user routes

// Create Express app
const app = express();

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://luilsonsousa:uhiWj8FSdOljBbZH@COMP3123Assignment1.lwip7.mongodb.net/COMP3123Assignment1?retryWrites=true&w=majority&appName=COMP3123Assignment1', {
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch(err => {
    console.error('MongoDB Atlas connection error:', err);
});

// Register the user routes under /api/v1
app.use('/api/v1', userRoutes);

// Test root route to verify server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
