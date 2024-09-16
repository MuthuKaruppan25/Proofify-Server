const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const BotDetectionScore = require('./models/BotDetectionScore');

// Initialize Express app
const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// CORS configuration
app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: '*',
    allowedHeaders: 'Content-Type'
}));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bot-detection', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// POST route to save bot detection score
app.post('/api/save-behavior', async (req, res) => {
    try {
        const { score } = req.body;

        // Validate score (optional)
        if (typeof score !== 'number') {
            return res.status(400).json({ error: 'Invalid score format' });
        }

        // Save the score in the database
        const newScore = new BotDetectionScore({ score });
        await newScore.save();

        res.status(200).json({ message: 'Bot detection score saved successfully!' });
    } catch (error) {
        console.error('Error saving bot detection score:', error);
        res.status(500).json({ error: 'Failed to save bot detection score.' });
    }
});

// GET route to fetch all bot detection scores
app.get('/api/get-scores', async (req, res) => {
    try {
        // Fetch all scores from the database
        const scores = await BotDetectionScore.find();

        // If no scores found, return a 404 status
        if (scores.length === 0) {
            return res.status(404).json({ message: 'No bot detection scores found' });
        }

        // Return the scores
        res.status(200).json(scores);
    } catch (error) {
        console.error('Error fetching bot detection scores:', error);
        res.status(500).json({ error: 'Failed to fetch bot detection scores' });
    }
});


// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
