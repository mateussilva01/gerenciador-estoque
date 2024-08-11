const express = require('express');
const userService = require('../service/userService');
const { authorizeAccess } = require('../../../../middlewares/auth');

const routes = express.Router();

routes.get('/val-token', authorizeAccess, userService.validateToken);
routes.post('/login', userService.login);
routes.get('/user', authorizeAccess, userService.findAll);
routes.post('/user', authorizeAccess, userService.save);
routes.get('/user/:id', authorizeAccess, userService.get);
routes.put('/user', authorizeAccess, userService.update);
routes.delete('/user/:id', authorizeAccess, userService.remove);

module.exports = routes;