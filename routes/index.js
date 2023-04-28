var express = require('express');
var router = express.Router();

const hotelroomController = require("../controllers/hotelroomController");
const countryController = require("../controllers/countryController");
const hotelController = require("../controllers/hotelController");

/* GET home page. */
router.get('/', hotelroomController.index);

router.get('/hotel/room/:id', hotelroomController.hotelroom_detail);

router.get('/hotel/:id', hotelController.hotel_detail);

router.get('/country/:id', countryController.country_detail);

module.exports = router;
