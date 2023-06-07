const express = require("express");
const logger = require("morgan");
const restuarantRouter = require("./routes/restuarantRouter");

const app = express();

app.use(express.json());
app.use(logger("dev"));

app.use("/api/v1", restuarantRouter);

module.exports = app;
