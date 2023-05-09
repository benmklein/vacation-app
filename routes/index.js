var express = require('express');
var router = express.Router();

const hotelroomController = require("../controllers/hotelroomController");
const countryController = require("../controllers/countryController");
const hotelController = require("../controllers/hotelController");

/* GET home page. */
router.get('/', hotelroomController.index);

router.get('/rooms/:id', hotelroomController.hotelroom_detail);

router.get('/hotels/:id', hotelController.hotel_detail);

router.get('/hotels', hotelController.hotel_list);

router.get('/rooms', hotelroomController.hotelroom_list);

router.get('/country/:id', countryController.country_detail);

router.get('/countries', countryController.country_list);


module.exports = router;
