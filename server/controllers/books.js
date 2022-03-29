const asyncHandler = require('express-async-handler');
const model = require('../model/books');

const getBooks = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getBooks());
});

const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rows = await model.getBookByID({ id });
  if (rows.length > 0) {
    model.deleteBook(id);
    // res.status(200).send(`Das Buch mit der ID ${id} wurde erfolgreich gelöscht`);
  } else {
    res.status(404).send(`Das Buch mit der ID ${id} wurde nicht gefunden`);
  }
});

const patchBookAndAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const rows = await model.getBookByID({ id });
  if (rows.length > 0) {
    await model.patchBookAndAuthor(req.body, id);
    res.status(200).send(`Das Buch mit der ID ${id} wurde erfolgreich geupdated`);
  } else {
    res.status(404).send(`Das Buch mit der ID ${id} wurde nicht gefunden`);
  }
});

const getBookByID = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.status(200).json(await model.getBookByID({ id }));
});

// const postBooks = asyncHandler(async (req, res) => {
//   const { bid, title, year, pages, language } = req.body;
//   if (bid == null || title == null || year == null || pages == null || language == null) {
//     res.status(404).send('one or more props missing');
//   } else {
//     await model.postBook(req.body);
//     res.status(200).send('Erfolgreich');
//   }
// });

module.exports = { getBooks, deleteBook, patchBookAndAuthor, getBookByID };
