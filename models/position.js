const mongoose = require('mongoose');
const Position = mongoose.model('Position', {
    name: {type: String, required: true},
    companyName: String,
    companyDescription: String,
});

module.exports = { Position };