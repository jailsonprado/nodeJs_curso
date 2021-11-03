const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesequelize', 'root', 'ChoosePassword', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('Conectado com sucesso com o Sequelize');
} catch (error) {
  console.log('Não foi possivel conectar: ', error);
}

module.exports = sequelize;
