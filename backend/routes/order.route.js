const express = require('express');
const router = express.Router();
const {createOrder,getOrderById,getOrdersByUser,updateOrderStatus} = require('../controllers/order.controller')
const orderController = require('../controllers/order.controller');
// Tạo đơn hàng mới
router.post('/', orderController.createOrder);

// Lấy thông tin đơn hàng theo ID
router.get('/:id', orderController.getOrderById);

// Lấy danh sách đơn hàng của người dùng
router.get('/user/:userId', orderController.getOrdersByUser);

// Cập nhật trạng thái đơn hàng
router.put('/:id', orderController.updateOrderStatus);

module.exports = router;
