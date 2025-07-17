const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
};

exports.updateUserProfile = async (req, res) => {
  const { name, address } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { name, address }, { new: true });
  res.json(user);
};