const mongoose = require('mongoose');
const Position = mongoose.model('Position', {
    name: {type: String, required: true},
    results: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        score: Number
    }]
});

module.exports = { Position };