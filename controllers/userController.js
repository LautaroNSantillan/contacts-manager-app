const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send('All fields are required');
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        return res.status(400).send('User already registered');
    }

    // Hash pwd
    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPwd,
    });

    if (!user) {
        res.status(400).send('Invalid user data');
    }

    return res.status(201).json({ _id: user.id, email: user.email });
});


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Missing credentials');
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
        res.status(200).json({ accessToken });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
