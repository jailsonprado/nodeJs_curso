const express = require('express');
const app = express();
const port = 3000; // Variavel de ambiente

const path = require('path');

const basepath = path.join(__dirname, 'templates');

app.get('/', (req, res) => {
  res.sendFile(`${basepath}/index.html`);
});

app.get('/home', (req, res) => {
  res.send('Pagina inicial');
});

app.listen(port, () => {
  console.log(`O app esta rodando na porta ${port}`);
});
