const express = require('express');
const { signupUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// POST: Signup route (customized)
router.post('/luilsonsousa/signup', signupUser);

// POST: Login route
router.post('/luilsonsousa/login', loginUser);

module.exports = router;
