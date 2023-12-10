const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'pass', {
  host: 'localhost',
  dialect: 'postgres'
});

//Desenvolvimento
sequelize.authenticate()
.then(() => {
  console.log('Conexão realizada com sucesso.')
}).catch(() => {
  console.log('Erro ao tentar se conectar com o banco de dados.')
});

module.exports = sequelize;