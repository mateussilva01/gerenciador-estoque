const express = require('express');
const usuarioService = require('../service/usuarioService');
const { authorizeAccess } = require('../../../../middlewares/authMiddleware');

const routes = express.Router();

routes.get('/val-token', authorizeAccess, usuarioService.validateToken);
routes.post('/login', usuarioService.login);
routes.get('/usuario', authorizeAccess, usuarioService.findAll);
routes.post('/usuario', usuarioService.save);
routes.get('/usuario/:id', authorizeAccess, usuarioService.get);
routes.put('/usuario', authorizeAccess, usuarioService.update);
routes.delete('/usuario/:id', authorizeAccess, usuarioService.remove);

module.exports = routes;