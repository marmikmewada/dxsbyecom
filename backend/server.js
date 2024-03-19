require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
// Add other middleware as needed

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true, // Remove deprecated option
    useUnifiedTopology: true // Remove deprecated option
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err)); // Improved error handling

// Define routes
// Example: const productRoutes = require('./routes/productRoutes');
// app.use('/api/products', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
