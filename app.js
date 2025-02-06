// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { connectDB, checkDBConnection } = require('./db');  // Import connection functions
const Book = require('./modles/book'); // Import the Book model
const Borrow=require('./modles/borrow')

const app = express();
 
// Middleware
app.use(bodyParser.json());

// Connect to MongoDB Atlas
connectDB();

// Check if MongoDB is connected
checkDBConnection();

// Routes

// Add a new book
app.post('/books', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a book by ID
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a book by ID
app.put('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a book by ID
app.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/borrow', async (req, res) => {
    const { bookId, borrowedDate, returnDate } = req.body;

    try {
        // Check if the book exists
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Check how many books have been borrowed already (still using userId in Borrow model)
        const borrowedBooks = await Borrow.countDocuments({ status: 'borrowed' });

        // Limit to 3 books
        if (borrowedBooks >= 5) {
            return res.status(400).json({ message: 'You can only borrow up to 3 books.' });
        }

        // Create a new borrow entry (we'll skip memberId and userId here)
        const borrow = new Borrow({
            bookId,
            borrowedDate,
            returnDate,
            status: 'borrowed'  // Add status to track the borrowing state
        });

        // Save the borrow entry to the database
        await borrow.save();
        res.status(201).json({ message: 'Book borrowed successfully', borrow });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Route: Get all borrowed books for a user
app.get('/borrow/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const borrows = await Borrow.find({ userId }).populate('bookId', 'title author price').populate('userId', 'name email');
        
        if (!borrows.length) return res.status(404).json({ message: 'No borrowed books found' });

        res.json(borrows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
