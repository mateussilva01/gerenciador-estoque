const express = require('express');
const cors = require('cors');
const routesProduto = require('../src/modules/produto/controller/produtoController');
const routesUser = require('../src/modules/user/controller/userController');
const app = express();
const port = 8080;
const address = 'http://localhost';

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'),
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE'),
  res.header('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type, Authorization'),
  app.use(cors());
  next();
});
app.use(routesProduto);
app.use(routesUser)

app.listen(port, () => {
  console.log(`Servidor iniciado: ${address}:/${port}`);
});