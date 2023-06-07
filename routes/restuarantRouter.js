const express = require("express");
const route = express.Router();
const restuarantController = require("../controllers/restuarantController");

route.post("/newRestuarant", restuarantController.createRestuarant);

module.exports = route;
