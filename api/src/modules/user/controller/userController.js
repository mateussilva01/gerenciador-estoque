const express = require('express');
const user = require("../service/userService");

const routes = express.Router();

routes.get("/user", user.findAll);
routes.post("/user", user.save);
routes.get("/user/:id", user.get);
routes.put("/user", user.update);
routes.delete("/user/:id", user.remove);

module.exports = routes;