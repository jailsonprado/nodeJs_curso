const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

const produto = [
  {
    id: '0',
    title: 'Moto G6',
    category: 'smartphones',
    body: 'Celular da motorola',
    preco: 600,
  },
  {
    id: '1',
    title: 'Geladeira',
    category: 'eletrodomesticos',
    body: 'Geladeira que gela',
    preco: 2000,
  },
  {
    id: '2',
    title: 'Fogão',
    category: 'eletrodomesticos',
    body: 'Fogão que cozinha',
    preco: 800,
  },
];
app.get('/product/:id', function (req, res) {
  const product = produto[req.params.id];

  res.render('product', { product });
});
app.get('/', (req, res) => {
  res.render('home', { produto });
});

app.listen(3000, () => {
  console.log('App funcionando!');
});
