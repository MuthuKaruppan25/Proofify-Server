const mongoose = require('mongoose');

// Define schema for bot detection score
const botDetectionScoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create model from the schema
const BotDetectionScore = mongoose.model('BotDetectionScore', botDetectionScoreSchema);

module.exports = BotDetectionScore;
