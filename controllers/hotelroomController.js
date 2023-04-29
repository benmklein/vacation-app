const HotelRoom = require("../models/hotelroom");
const asyncHandler = require('express-async-handler')

const { body, validationResult } = require("express-validator");

// display index
exports.index = asyncHandler(async (req, res, next) => {
  const hotelroom_list = await HotelRoom.find({}, "price name url img hotel")
  .sort({ title: 1 })
  .populate({ path: "hotel", populate: { path: "country" }})
  .exec();
  
  res.render("index", { title: "Hotel Room Finder", hotelroom_list });
});

// Display list of all hotel room.
exports.hotelroom_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel room list");
});

// Display detail page for a specific hotel room.
exports.hotelroom_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: hotel room detail: ${req.params.id}`);
});

// Display hotel create form on GET.
exports.hotelroom_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel create GET");
});

// Handle hotel create on POST.
exports.hotelroom_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel create POST");
});

// Display hotel delete form on GET.
exports.hotelroom_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel delete GET");
});

// Handle hotel delete on POST.
exports.hotelroom_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel delete POST");
});

// Display hotel update form on GET.
exports.hotelroom_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel update GET");
});

// Handle hotel update on POST.
exports.hotelroom_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel update POST");
});