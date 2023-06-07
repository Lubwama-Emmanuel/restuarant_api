const Restuarant = require("../models/restaurantModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const multer = require("multer");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  stuarge: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImage = upload.single("image");

exports.createRestuarant = catchAsync(async (req, res) => {
  const newRestuarant = await Restuarant.create(req.body);

  res.status(201).json({
    status: "Success",
    data: {
      data: newRestuarant,
    },
  });
});
