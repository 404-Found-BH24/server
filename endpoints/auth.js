const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { User } = require('../models/user');
const {Position} = require("../models/position");
const authRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });

    if (!user) {
        return res.json({ message: "Nie znaleziono użytkownika." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        res.json(user);
    } else {
        res.json({ message: "Błąd uwierzytelniania." });
    }
});

authRouter.post('/register', upload.single('cv'), async (req, res) => {
    const { email, password, name, surname, lookingForJob, cv } = req.body;

    if(await User.findOne({ email })){
        return res.status(400).json({ message: "Email już w użyciu." });
    }

    try {
        if (!req.file) {
            return res.status(400).json({ message: "Załącz plik CV aby kontynuować." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            name,
            surname,
            lookingForJob,
            cv: {
                file: cv,
                filename: email+".pdf",
            }
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

authRouter.get('/cv/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user || !user.cv) {
            return res.status(404).json({ message: "Nie znaleziono pliku CV" });
        }

        res.set({
            'Content-Type': 'application/pdf', // Ustaw odpowiedni typ MIME (np. 'application/pdf')
            'Content-Disposition': `attachment; filename="${user.cv.filename}"`, // Ustaw nazwę pliku
            'Content-Length': user.cv.file.length // Ustaw długość pliku
        });

        res.send(user.cv.file);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = { authRouter };
