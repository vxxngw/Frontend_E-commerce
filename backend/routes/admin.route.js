const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/authMiddleware');
const productController = require('../controllers/product.controller')
const userController = require('../controllers/auth.controller');
const orderController = require('../controllers/order.controller');
// Routes quản lý sản phẩm
router.get('/products', adminAuth, productController.getAllProducts);
router.get('/products/:id', adminAuth, productController.getProductById);
router.post('/create/products', adminAuth, productController.createProduct);
router.put('/products/:id', adminAuth, productController.updateProduct);
router.delete('/products/:id', adminAuth, productController.deleteProduct);

// Routes quản lý người dùng
router.get('/users', adminAuth, userController.getAllUsers);
router.get('/users/:id', adminAuth, userController.getUserById);
router.put('/users/:id', adminAuth, userController.updateUser);
router.delete('/users/:id', adminAuth, userController.deleteUser);

// Routes quản lý đơn hàng
router.get('/orders', adminAuth, orderController.getAllOrders);
router.get('/orders/:id', adminAuth, orderController.getOrderById);
router.put('/orders/:id', adminAuth, orderController.updateOrderStatus);

module.exports = router;
