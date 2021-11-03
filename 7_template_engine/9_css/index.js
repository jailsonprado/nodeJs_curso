const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
  partialDir: ['views/partials'],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/dashboard', (req, res) => {
  const items = ['item a', 'item b', 'item c'];

  res.render('dashboard', { items });
});

app.get('/post', (req, res) => {
  const post = {
    title: 'Aprender Node JS',
    category: 'Javascript',
    body: 'Este artigo vai te ajudar a aprender Node JS.....',
    comments: 4,
  };

  res.render('blogpost', { post });
});

app.get('/blog', (req, res) => {
  const posts = [
    {
      title: 'Aprender Node JS',
      category: 'Javascript',
      body: 'Este artigo vai te ajudar a aprender Node JS',
      comments: 4,
    },
    {
      title: 'Aprender PHP',
      category: 'PHP',
      body: 'Este artigo vai te ajudar a aprender PHP',
      comments: 5,
    },
    {
      title: 'Aprender Python',
      category: 'Python',
      body: 'Este artigo vai te ajudar a aprender Python',
      comments: 6,
    },
  ];
  res.render('blog', { posts });
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
