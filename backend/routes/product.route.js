const express = require('express');
const {
    getAllProducts,
    getProductById,
    getPopularProducts,
    getCollection
} = require('../controllers/product.controller.js');

const router = express.Router();

// 🔍 Lấy tất cả sản phẩm
router.get('/', getAllProducts);

// 🌟 Lấy sản phẩm phổ biến
router.get('/popular', getPopularProducts);

// 🧺 Lấy sản phẩm theo danh mục
router.get('/collection/:category', getCollection);

// ✅ ĐỂ CUỐI CÙNG: Lấy chi tiết sản phẩm theo ID
router.get('/:id', getProductById);

module.exports = router;
