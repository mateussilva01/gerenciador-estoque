SEQUÊNCIA PARA CRIAR O PROJETO

Criar o arquivo package
### npm init

Gerencia as requisições, rotas e urls, entre outra funcionalidades
### npm i express

Rodar o projeto em um primeiro momento
### node app.js

Acessar o projeto no navegador
### http://localhost:8080

Instalar o módulo para reiniciar o servidor sempre que houver alteração no código fonte, -g significa globalmente
Executar no prompt de comando somente quando nunca utilizou o Nodemon
### npm i -g nodemon

Já com o Nodemon instalado
### npm i --save-dev nodemon

Rodar o projeto com o Nodemon
### nodemon app.js

Instalar o banco de dados PostgreSQL - pgAdmin ou terminal

Sequelize é uma biblioteca Javascript que facilita o gerenciamento de um banco de dados SQL
### npm i --save sequelize

Instalar o driver do banco de dados
### npm install --save pg pg-hstore # Postgres

Permitir acesso a api
### npm i --save cors

Instalar o módulo para criptografar a senha
### npm i --save bcryptjs

Instalar a dependência para gerar o token
### npm i --save jsonwebtoken@8.5.1

Gerenciar variáveis de ambiente
### npm i --save dotenv@10.0.0