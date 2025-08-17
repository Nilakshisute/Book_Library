// controllers/booksController.js
const Book = require('../models/Book');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addBook = async (req, res) => {
  try {
    const { title, author, genre, publishedYear } = req.body;
    
    // For testing, return dummy data
    res.status(201).json({
      message: 'Book added successfully!',
      book: { id: 1, title, author, genre, publishedYear }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllBooks,
  addBook
};
