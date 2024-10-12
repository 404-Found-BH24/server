const express = require('express');
const { User } = require('../models/user');
const authRouter = express.Router();

authRouter.get('/login', async (req, res) => {
    const { email } = req.params;
    const user = await User.findOne({ email });
    res.json(user)
});

authRouter.post('/register', async (req, res) => {
    const { email, password, name, surname, lookingForJob, cv } = req.body;

    const user = await User.create({
        email, password, name, surname, lookingForJob, cv
    });

    res.json(user)
});

module.exports = { authRouter };