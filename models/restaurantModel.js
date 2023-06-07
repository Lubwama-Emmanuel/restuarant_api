const mongoose = require("mongoose");

const restuarantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  cuisineType: {
    type: String,
  },
  location: {
    type: String,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("Restuarant", restuarantSchema);
