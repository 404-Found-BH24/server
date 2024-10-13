const mongoose = require('mongoose');
const Position = mongoose.model('Position', {
    name: String,
    companyName: String,
    companyDescription: String,
});

module.exports = { Position };