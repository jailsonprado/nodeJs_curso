const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('home');
});

app.post('/books/insertbook', function (req, res) {
  const title = req.body.title;
  const pageqty = req.body.pageqty;
  console.log(title, pageqty);
  // Create
  const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
  const data = ['title', 'pageqty', title, pageqty];

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect('/books');
  });
});
// Mostar dados do banco da dados
app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books';

  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const books = data;
    console.log(books);

    res.render('books', { books });
  });
});
// Selecionar dados pelo ID
app.get('/books/:id', (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ['id', id];
  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const book = data[0];

    res.render('book', { book });
  });
});
// Edit com update
app.get('/books/edit/:id', function (req, res) {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE ?? = ?`;
  const data = ['id', id];
  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    const book = data[0];
    console.log(data[0]);

    res.render('editbook', { book });
  });
});
// Atualizando os dados, edit update
app.post('/books/updatebook', function (req, res) {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`;
  const data = ['title', title, 'pageqty', pageqty, 'id', id];

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.redirect(`/books/edit/${id}`);
  });
});
// Delete // deletando arquivos tabela
app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM books WHERE ?? = ?`;
  const data = ['id', id];

  pool.query(sql, data, function (err) {
    if (err) {
      console.log(err);
      return;
    }

    res.render('books');
  });
});
app.listen(3000);
