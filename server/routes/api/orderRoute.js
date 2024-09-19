const {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders
} = require('../../controllers/orderController');
const { protect, admin } = require('../../middleware/authMiddleware');

const router = require('express').Router();

// fetch all orders
router.get('/', protect, admin, getOrders);

// create order
router.post('/', protect, addOrderItems);

// fetch my orders
router.get('/mine', protect, getMyOrders);

// fetch order by id
router.get('/:id', protect, getOrderById);

// update order to paid
router.put('/:id/pay', protect, updateOrderToPaid);

// update order to delivered
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);

module.exports = router;
