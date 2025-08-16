const express = require('express');
const {
  getMyBooks,
  addBookToLibrary,
  updateReadingStatus,
  updateBookRating
} = require('../controllers/myBooksController');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(auth);

router.get('/', getMyBooks);
router.post('/:bookId', addBookToLibrary);
router.patch('/:bookId/status', updateReadingStatus);
router.patch('/:bookId/rating', updateBookRating);

module.exports = router;