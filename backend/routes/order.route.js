const express = require('express');
const router = express.Router();

// Import các hàm xử lý từ controller
const {
    createOrder,         // Tạo đơn hàng mới
    getOrderById,        // Lấy đơn hàng theo ID
    getOrdersByUser,     // Lấy danh sách đơn hàng theo user
    updateOrderStatus    // Cập nhật trạng thái đơn hàng
} = require('../controllers/order.controller');

// Tạo đơn hàng mới
router.post('/', createOrder);

// Lấy thông tin đơn hàng theo ID
router.get('/:id', getOrderById);

// Lấy danh sách đơn hàng của người dùng theo userId
router.get('/user/:userId', getOrdersByUser);

// Cập nhật trạng thái đơn hàng theo ID
router.put('/:id', updateOrderStatus);

module.exports = router;
