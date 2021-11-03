const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
  const items = ['item a', 'item b', 'item c'];

  res.render('dashboard', { items });
});

app.get('/', (req, res) => {
  const user = {
    name: 'Jailson',
    surname: 'Prado',
    age: '24',
  };

  const auth = true;
  const approved = true;

  res.render('home', { user: user, auth, approved });
});

app.listen(3000, () => {
  console.log('App funcionando!');
});
