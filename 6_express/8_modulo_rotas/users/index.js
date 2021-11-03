const express = require('express');
const router = express.Router();
const path = require('path');

const basePath = path.join(__dirname, '../templates');

router.get('/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`);
});

router.post('/save', (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = req.body.age;
  console.log(name);
  console.log(age);
  res.sendFile(`${basePath}/userform.html`);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  // Leitura da tabela users, resgatar um usuario do banco
  console.log(`Estamos buscando pelo usuario : ${id}`);
  res.sendFile(`${basePath}/users.html`);
});

module.exports = router;
