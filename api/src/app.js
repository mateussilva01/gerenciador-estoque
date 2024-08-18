const express = require('express');
const corsMiddleware = require('../middlewares/corsMiddleware');
const produtoController = require('./modules/produto/controller/produtoController');
const usuarioController = require('./modules/usuario/controller/usuarioController');
const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.use(produtoController);
app.use(usuarioController);

module.exports = app;