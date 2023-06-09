const Restuarant = require("../models/restaurantModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const multer = require("multer");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.originalname + "-" + uniqueSuffix;
    console.log(fileName);
    cb(null, fileName);
  },
});

const multerFilter = (req, file, cb) => {
  console.log(file);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImage = upload.single("image");

// Create new restuarant
exports.createRestuarant = catchAsync(async (req, res) => {
  let body = {
    name: req.body.name,
    title: req.body.title,
    cuisineType: req.body.cuisineType,
    location: req.body.location,
  };

  // checking if image is uploaded
  if (req.file) {
    body["image"] = req.file.path;
  }

  const newRestuarant = await Restuarant.create(body);

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
