const express = require('express');
const { User } = require('../models/user');
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

    if (!user) {
        return res.json({ message: "User not found" });
    }

    if (password === user.password) {
        res.json(user);
    } else {
        res.json({ message: "Authentication error" });
    }
});



authRouter.post('/register', async (req, res) => {
    const { email, password, name, surname, lookingForJob, cv } = req.body;

    const user = await User.create({
        email, password, name, surname, lookingForJob, cv
    });

    res.json(user)
});

module.exports = { authRouter };