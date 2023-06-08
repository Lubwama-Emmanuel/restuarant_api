const Restuarant = require("../models/restaurantModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

// Create new restuarant
exports.createRestuarant = catchAsync(async (req, res) => {
  const newRestuarant = await Restuarant.create(req.body);

  res.status(201).json({
    status: "Success",
    data: newRestuarant,
  });
});

// Update restuarant details
exports.updateRestuarant = catchAsync(async (req, res) => {
  const restuarant = await Restuarant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "Success",
    data: restuarant,
  });
});

// Return restuarant data by id
exports.getRestuarant = catchAsync(async (req, res) => {
  const restuarant = await Restuarant.findById(req.params.id);

  res.status(200).json({
    status: "Success",
    data: {
      data: restuarant,
    },
  });
});

// Returns list of all restuarants
exports.getAllRestuarants = catchAsync(async (req, res) => {
  const restuarants = await Restuarant.find();

  res.status(200).json({
    status: "Success",
    data: restuarants,
  });
});

// Deletes restuarant by id
exports.deleteRestuarant = catchAsync(async (req, res) => {
  await Restuarant.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "Success",
    message: "restuarant deleted!",
  });
});
