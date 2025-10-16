const express = require("express");
const { getRole } = require("./controller")
const route = express.Router();

route.get("/get",getRole);

module.exports = route;
