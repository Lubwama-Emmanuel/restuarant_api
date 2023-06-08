const express = require("express");
const logger = require("morgan");
const restuarantRouter = require("./routes/restuarantRouter");
const AppError = require("./utils/AppError");
const path = require("path");

const app = express();

app.use(express.json());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", restuarantRouter);

module.exports = app;
