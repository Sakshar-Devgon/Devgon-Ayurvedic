const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);