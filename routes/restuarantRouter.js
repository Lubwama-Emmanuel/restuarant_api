const express = require("express");
const route = express.Router();
const restuarantController = require("../controllers/restuarantController");

route.post("/newRestuarant", restuarantController.createRestuarant);
route.patch("/updateRestuarant/:id", restuarantController.updateRestuarant);
route.get("/getRestuarant/:id", restuarantController.getRestuarant);
route.get("/getAllRestuarants", restuarantController.getAllRestuarants);
route.delete("/deleteRestuarant/:id", restuarantController.deleteRestuarant);

module.exports = route;
