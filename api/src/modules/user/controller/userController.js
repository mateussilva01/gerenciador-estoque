const express = require('express');
const user = require("../service/userService");
const { eAdmin } = require("../../../../middlewares/auth");

const routes = express.Router();

routes.post("/login", user.login);
routes.get("/user", eAdmin, user.findAll);
routes.post("/user", eAdmin, user.save);
routes.get("/user/:id", eAdmin, user.get);
routes.put("/user", eAdmin, user.update);
routes.delete("/user/:id", eAdmin, user.remove);

module.exports = routes;