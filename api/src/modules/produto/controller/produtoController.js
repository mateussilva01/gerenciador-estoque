const express = require('express');
const produto = require("../service/produtoService");
const { eAdmin } = require("../../../../middlewares/auth");

const routes = express.Router();

routes.get("/produto", eAdmin, produto.findAll);
routes.post("/produto", eAdmin, produto.save);
routes.get("/produto/:id", eAdmin, produto.get);
routes.put("/produto", eAdmin, produto.update);
routes.delete("/produto/:id", eAdmin, produto.remove);

module.exports = routes;