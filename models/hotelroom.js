const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HotelRoomSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  hotel: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
  status: {type: String, required: true, enum: ["Available", "Booked"]},
  price: { type: Number, required: true},
  beds: { type: Number, required: true},
  baths: { type: Number, required: true},
  img: { type: String, required: true},
  description: { type: String, required: true },
  
});

// Virtual for author's URL
HotelRoomSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/rooms/${this._id}`;
});

// Export model
module.exports = mongoose.model("HotelRoom", HotelRoomSchema);