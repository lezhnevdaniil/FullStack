const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchSheme = new Schema ({
  place: String,
  date: String,
  price: Number
})

module.exports = Purch = mongoose.model('purchase', purchSheme);
