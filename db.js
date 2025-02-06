// db.js
const mongoose = require('mongoose');

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://adityaprashar03:nGzYuXjPzkIk0T1v@cluster0.n6swo.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        // Use MongoDB Atlas connection URI
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1); // Exit process with failure
    }
};

// Function to check if MongoDB is connected
const checkDBConnection = () => {
    if (mongoose.connection.readyState === 1) {
        console.log('MongoDB Atlas is connected');
    } else {
        console.log('MongoDB Atlas is not connected');
    }
};

module.exports = { connectDB, checkDBConnection };
