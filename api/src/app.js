const express = require('express');
const cors = require('cors');
const routes = require("../src/modules/produto/controller/produtoController");
const app = express();
const port = 8080;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE"),
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization"),
  app.use(cors());
  next();
});
app.use(routes);

app.listen(port, () => {
  console.log("Servidor iniciado: http://localhost:8080");
});