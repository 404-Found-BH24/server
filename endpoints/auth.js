const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

    if (!user) {
        return res.json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        res.json(user);
    } else {
        res.json({ message: "Authentication error" });
    }
});

authRouter.post('/register', async (req, res) => {
    const { email, password, name, surname, lookingForJob, cv } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email, password: hashedPassword, name, surname, lookingForJob, cv
    });

    res.json(user);
});

module.exports = { authRouter };
