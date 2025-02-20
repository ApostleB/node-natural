const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },
    answerText: {
        type: String,
        required: true,
    },
    nation: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('general', generalSchema);
