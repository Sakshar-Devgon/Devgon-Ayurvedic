const mongoose = require('mongoose');
const Order = require('../models/Order');

// Place a new order
exports.placeOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    // Ensure medicine IDs are cast to ObjectId
    const formattedItems = items.map(item => ({
      medicine: new mongoose.Types.ObjectId(item.medicine),
      quantity: item.quantity,
    }));

    const order = await Order.create({
      user: req.user.id,
      items: formattedItems,
      total,
    });

    res.status(201).json({
      message: 'Order placed successfully.',
      userNote: 'Thank you for your order!',
      adminNote: 'A new order has been placed.',
      order,
    });
  } catch (error) {
  console.error('Order placement error:', error); // log in console for debugging

  res.status(500).json({
    message: 'Failed to place order',
    error: error.message || 'Unknown error occurred',
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
}
};


// Get all orders for the logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.medicine');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user orders', error });
  }
};

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.medicine');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all orders', error });
  }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error });
  }
};
