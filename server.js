const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
require('dotenv').config(); // Load environment variables from .env file

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000; // Correct assignment of PORT

// Middleware to parse incoming JSON data
app.use(bodyParser.json());

// MongoDB Atlas connection using mongoose.connect
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3000 // Timeout after 3 seconds
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error('MongoDB Atlas connection error:', err);
    });

// Register the user routes under /api/v1
app.use('/api/v1', userRoutes);

// Test root route to verify server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
