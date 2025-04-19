const express = require('express');
const router = express.Router();
const { getCartByUser, addToCart, removeFromCart, clearCart, updateCart } = require('../controllers/cart.controller.js');

// Route lấy giỏ hàng của người dùng
router.get('/:userId', getCartByUser);

// Route thêm sản phẩm vào giỏ hàng
router.post('/add', addToCart);

// Route xóa sản phẩm khỏi giỏ hàng
router.post('/remove', removeFromCart);

// Route xóa toàn bộ giỏ hàng
router.post('/clear', clearCart);

// Route cập nhật giỏ hàng
router.post('/update', updateCart);

module.exports = router;
