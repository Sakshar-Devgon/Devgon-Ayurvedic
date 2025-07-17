const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

router.post('/', auth, placeOrder);
router.get('/my', auth, getUserOrders);
router.get('/', auth, admin, getAllOrders);
router.put('/:id', auth, admin, updateOrderStatus);

module.exports = router;