require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const axios = require('axios');
const { Readable } = require('stream');
const FormData = require('form-data');
const { User } = require('../models/user');
const authRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });


authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

    if (!user) {
        return res.status(401).json({ message: "Nie znaleziono użytkownika." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const userData = {
            id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            lookingForJob: user.lookingForJob
        };

        res.json(userData);
    } else {
        return res.status(401).json({ message: "Nieprawidłowe dane logowania" });
    }
});

authRouter.post('/register', upload.single('cv'), async (req, res) => {
    const { email, password, name, surname, lookingForJob } = req.body;

    if (await User.findOne({ email })) {
        return res.status(400).json({ message: "Email już w użyciu." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        console.log(hashedPassword);

        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            surname,
            lookingForJob,
        });

        res.status(201).json(user._id);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = { authRouter };
