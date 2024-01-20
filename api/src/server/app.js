const express = require('express');
const cors = require('cors');
const routes = require("../routes/routes");
const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"),
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE"),
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization"),
  app.use(cors());
  next();
});
app.use(routes);

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});