const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CountrySchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  sites: [{ type: String, required: true, maxLength: 100 }],
  img: { type: String, required: true, maxLength: 200 },
  
});

// Virtual for author's URL
CountrySchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/country/${this._id}`;
});

// Export model
module.exports = mongoose.model("Country", CountrySchema);