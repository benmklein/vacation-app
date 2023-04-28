const Hotel = require("../models/hotel");
const asyncHandler = require('express-async-handler')

const { body, validationResult } = require("express-validator");

// Display list of all hotels.
exports.hotel_list = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel list");
});

// Display detail page for a specific hotel.
exports.hotel_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: hotel detail: ${req.params.id}`);
});

// Display hotel create form on GET.
exports.hotel_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel create GET");
});

// Handle hotel create on POST.
exports.hotel_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel create POST");
});

// Display hotel delete form on GET.
exports.hotel_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel delete GET");
});

// Handle hotel delete on POST.
exports.hotel_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel delete POST");
});

// Display hotel update form on GET.
exports.hotel_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel update GET");
});

// Handle hotel update on POST.
exports.hotel_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: hotel update POST");
});