const express = require("express")
const logger = require("morgan")

const app = express()

app.use(express.json())
app.use(logger('dev'))


module.exports = app