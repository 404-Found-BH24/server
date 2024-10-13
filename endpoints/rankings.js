const express = require('express');
const { Position } = require('../models/position');
const mongoose = require("mongoose");
const {User} = require("../models/user");
const rankingsRouter = express.Router();

// rankingsRouter.get('/:name', async (req, res) => {
//     const { name } = req.params;
//     const position = await Position.findOne({ name });
//
//     const sortedResults = position.results.sort((a, b) => b.score - a.score);
//
//     res.json(sortedResults);
// });

rankingsRouter.get('/all', async (req, res) => {
    try {
        const users = await User.find({}, '_id name surname rankings'); // Specify fields to include

        const filteredUsers = users.map(user => ({
            id: user._id,
            name: user.name,
            surname: user.surname,
            rankings: user.rankings
        }));

        res.json(filteredUsers);
    } catch (error) {
        console.error('Error fetching users:', error);

        if (!res.headersSent) {
            res.status(500).json({ error: 'An error occurred while fetching users.' });
        }
    }
});

module.exports = { rankingsRouter };
