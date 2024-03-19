require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
// Create Express app
const app = express();

app.use(cors());

// Middleware
app.use(express.json()); // Parse JSON bodies
// Add other middleware as needed

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB Connected');
    // Define routes
    const todoRoutes = require('./routes/todoRoute');
    app.use('/api/todos', todoRoutes);

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => console.error('MongoDB connection error:', err)); // Improved error handling
