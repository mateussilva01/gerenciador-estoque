const Sequelize = require('sequelize');
const db = require('../../../configs/sequelize.config');

const Usuario = db.define('usuarios', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  }
})

//Create table
//Usuario.sync();

module.exports = Usuario;