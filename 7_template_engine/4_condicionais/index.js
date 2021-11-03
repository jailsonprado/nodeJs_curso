const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
});

app.get('/', (req, res) => {
  const user = {
    name: 'Jailson',
    surname: 'Prado',
    age: '24',
  };

  const auth = false;

  res.render('home', { user: user, auth });
});

app.listen(3000, () => {
  console.log('App funcionando!');
});
