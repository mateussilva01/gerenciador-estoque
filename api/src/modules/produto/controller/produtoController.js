const express = require('express');
const produto = require("../service/produtoService");

const routes = express.Router();

routes.get("/produto", produto.findAll);
routes.post("/produto", produto.save);
routes.get("/produto/:id", produto.get);
routes.put("/produto", produto.update);
routes.delete("/produto/:id", produto.remove);

module.exports = routes;