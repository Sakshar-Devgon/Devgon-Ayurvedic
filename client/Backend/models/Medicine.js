const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  stock: { type: Number, default: true }
});

module.exports = mongoose.model('Medicine', medicineSchema);