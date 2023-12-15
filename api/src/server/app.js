const express = require('express');
const routes = require("../routes/routes");
const app = express();

app.use(express.json());
app.use(routes);

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});