const express = require('express');
const app = express();
const port = 3000; // Variavel de ambiente

app.get('/', (req, res) => {
  res.send('Ola mundo!');
});

app.get('/home', (req, res) => {
  res.send('Pagina inicial');
});

app.listen(port, () => {
  console.log(`O app esta rodando na porta ${port}`);
});
