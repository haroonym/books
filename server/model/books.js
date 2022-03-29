/* eslint-disable max-len */
/* eslint-disable guard-for-in */
/* eslint-disable quotes */
const db = require('../db');

async function getBooks() {
  const { rows } = await db.query(
    'select books.bid, a.aid, image, title, a.name, pages from books join books_authors ba on books.bid = ba.bid join authors a on a.aid = ba.aid',
  );
  return rows;
}

async function getBookByID(param) {
  let result = null;
  if (param.id) {
    result = await db.query(
      'select books.bid, a.aid, image, title, a.name, pages from books join books_authors ba on books.bid = ba.bid join authors a on a.aid = ba.aid where books.bid = $1',
      [param.id],
    );
  }
  return result.rows;
}

const deleteBook = (id) => db.query('delete from books where bid = $1', [id]);

async function patchBookAndAuthor(body, id) {
  await db.query('update books set title =$1, pages =$2 where bid =$3 returning *;', [
    body.title,
    body.pages,
    id,
  ]);
  await db.query(
    'update authors set name =$1 from authors a where a.aid in (select ia.aid from authors ia join books_authors ba on authors.aid = ba.aid where ba.bid =$2) returning *',
    [body.name, id],
  );
}

// async function postBook(body) {
//   const { rows } = await db.query(
//     'Insert Into books (bid,title, year, pages, language) values($1,$2,$3,$4,$5)',
//     [body.bid, body.title, body.year, body.pages, body.language],
//   );
//   return rows;
// }

module.exports = { getBooks, deleteBook, getBookByID, patchBookAndAuthor };
