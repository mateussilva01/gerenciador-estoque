const Sequelize = require('sequelize');
const db = require('../../../configs/sequelize.config');

const User = db.define('users', {
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
//User.sync();

//If exist change
//Produto.sync({ alter: true })

module.exports = User;