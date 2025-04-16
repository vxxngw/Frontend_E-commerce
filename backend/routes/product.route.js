const express = require('express');
const {
    getAllProducts,        // Lấy tất cả sản phẩm
    getProductById,        // Lấy sản phẩm theo ID
    getPopularProducts,    // Lấy danh sách sản phẩm phổ biến
    getCollection          // Lấy sản phẩm theo danh mục
} = require('../controllers/product.controller.js');

const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/', getAllProducts);

// Lấy danh sách sản phẩm phổ biến
router.get("/popular", getPopularProducts);

// Lấy sản phẩm theo danh mục (ví dụ: /collection/shirts)
router.get("/collection/:category", getCollection);

// Lấy chi tiết sản phẩm theo ID
router.get('/:id', getProductById);

module.exports = router;
