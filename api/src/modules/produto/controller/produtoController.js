const express = require('express');
const produtoService = require('../service/produtoService');
const { authorizeAccess } = require('../../../../middlewares/auth');

const routes = express.Router();

routes.get('/produto', authorizeAccess, produtoService.findAll);
routes.post('/produto', authorizeAccess, produtoService.save);
routes.get('/produto/:id', authorizeAccess, produtoService.get);
routes.put('/produto', authorizeAccess, produtoService.update);
routes.delete('/produto/:id', authorizeAccess, produtoService.remove);

module.exports = routes;