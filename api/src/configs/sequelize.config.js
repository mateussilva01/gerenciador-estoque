const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('estoque', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'localhost'
});

//Desenvolvimento
sequelize.authenticate()
.then(() => {
  console.log('Conexão realizada com sucesso.')
}).catch(() => {
  console.log('Erro ao tentar se conectar com o banco de dados.')
});

module.exports = sequelize;