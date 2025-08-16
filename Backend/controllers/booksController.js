// controllers/booksController.js
const Book = require('../models/Book');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ availability: true });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks
};
