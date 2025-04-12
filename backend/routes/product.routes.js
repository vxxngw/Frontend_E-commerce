
import express from 'express';
import { getAllProducts, getProductById, getPopularProducts, getCollection } from '../controllers/product.controller.js';

const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/', getAllProducts);

router.get("/popular", getPopularProducts);
// Lấy sản phẩm theo ID
// routes/product.route.js
router.get("/collection/:category", getCollection);

router.get('/:id', getProductById);


export default router;
