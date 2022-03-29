const express = require('express');
const { getBooks, deleteBook, patchBookAndAuthor, getBookByID } = require('../controllers/books');

const router = express.Router();

router.get('/books', getBooks);
router.delete('/book/:id', deleteBook);
router.patch('/book/:id', patchBookAndAuthor);
router.get('/book/:id', getBookByID);
// router.post('/books', postBook);

module.exports = router;
