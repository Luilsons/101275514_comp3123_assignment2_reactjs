const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST: Signup user
const signupUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save({ validateBeforeSave: false });
        res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};


// POST: Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;


    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.error(`Usuário não encontrado para o email: ${email}`);
            return res.status(400).json({ msg: 'Invalid credentials! User not found' });
        }



        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.error(`Senha incorreta para o email: ${email}`);
            return res.status(400).json({ msg: 'Invalid credentials! Wrong password' });
        }




        // Create and return a JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, msg: 'Login successful' });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).send('Server error');
    }
};

module.exports = {
    signupUser,
    loginUser,
};