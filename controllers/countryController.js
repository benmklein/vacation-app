const Country = require("../models/country");
const HotelRoom = require("../models/hotelroom");
const Hotel = require("../models/hotel");
const asyncHandler = require('express-async-handler')

const { body, validationResult } = require("express-validator");


// Display list of all Countries.
exports.country_list = asyncHandler(async (req, res, next) => {
  
  //add hotel count to each country
  const hotelRoomsByCountry = async () => {
    const countries = await Country.find();
    const countryList = [];
  
    for (const country of countries) {
      const hotels = await Hotel.find({ country: country._id });
      const hotelIds = hotels.map(hotel => hotel._id);
  
      const hotelCount = await HotelRoom.countDocuments({ hotel: { $in: hotelIds }, status: "Available" });
  
      countryList.push({ ...country.toObject(), url: country.url, hotelCount });
    }
  
    return countryList;
  };
  
  const groupedHotelRooms = await hotelRoomsByCountry();
  
  res.render("country_list", { title: "Country List", country_list: groupedHotelRooms })
});

// Display detail page for a specific Country.
exports.country_detail = asyncHandler(async (req, res, next) => {
  let country = await Country.findById(req.params.id, "name img sites url")
  
  country = { ...country.toObject(), url: country.url }
  
  
  const hotels = await Hotel.find({ country: country._id });
  const hotelIds = hotels.map(hotel => hotel._id);

  const room_list = await HotelRoom.find({ hotel: { $in: hotelIds }, status: "Available" }).populate("hotel");
  console.log('room_list', room_list)

  res.render("country_detail", { title: "Country List", country, room_list })
});

// Display country create form on GET.
exports.country_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country create GET");
});

// Handle country create on POST.
exports.country_create_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country create POST");
});

// Display country delete form on GET.
exports.country_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country delete GET");
});

// Handle country delete on POST.
exports.country_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country delete POST");
});

// Display country update form on GET.
exports.country_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country update GET");
});

// Handle country update on POST.
exports.country_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: country update POST");
});