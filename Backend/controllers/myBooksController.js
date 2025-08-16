// controllers/myBooksController.js
const MyBook = require('../models/MyBook');
const Book = require('../models/Book');

// Get user's books
const getMyBooks = async (req, res) => {
  try {
    const myBooks = await MyBook.find({ userId: req.user._id })
      .populate('bookId')
      .sort({ createdAt: -1 });
    
    res.json(myBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add book to user's library
const addBookToLibrary = async (req, res) => {
  try {
    const { bookId } = req.params;
    const userId = req.user._id;

    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Check if book already in user's library
    const existingBook = await MyBook.findOne({ userId, bookId });
    if (existingBook) {
      return res.status(400).json({ message: 'Book already in your library' });
    }

    // Add book to user's library
    const myBook = new MyBook({
      userId,
      bookId,
      status: 'Want to Read'
    });

    await myBook.save();
    
    // Populate book details
    await myBook.populate('bookId');

    res.status(201).json({
      message: 'Book added to your library',
      myBook
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update reading status
const updateReadingStatus = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { status } = req.body;
    const userId = req.user._id;

    if (!['Want to Read', 'Currently Reading', 'Read'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const myBook = await MyBook.findOneAndUpdate(
      { userId, bookId },
      { status },
      { new: true }
    ).populate('bookId');

    if (!myBook) {
      return res.status(404).json({ message: 'Book not found in your library' });
    }

    res.json({
      message: 'Reading status updated',
      myBook
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update book rating
const updateBookRating = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating } = req.body;
    const userId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const myBook = await MyBook.findOneAndUpdate(
      { userId, bookId },
      { rating },
      { new: true }
    ).populate('bookId');

    if (!myBook) {
      return res.status(404).json({ message: 'Book not found in your library' });
    }

    res.json({
      message: 'Book rating updated',
      myBook
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMyBooks,
  addBookToLibrary,
  updateReadingStatus,
  updateBookRating
};