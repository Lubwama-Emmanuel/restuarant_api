const mongoose = require("mongoose")

const restuarantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    cuisineType: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Restuarant", restuarantSchema)