const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = require('./User');

const Address = db.define('Address', {
  street: {
    type: DataTypes.STRING,
    required: true,
  },
  numer: {
    type: DataTypes.STRING,
    required: true,
  },
  city: {
    type: DataTypes.STRING,
    required: true,
  },
});

Address.belongsTo(User); // endereco pertence a tabela User' usuario '

module.exports = Address;
