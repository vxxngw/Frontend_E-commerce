import { Product } from '../models/product.model.js';

// Lấy tất cả sản phẩm
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error("Lỗi khi lấy tất cả sản phẩm:", err.message);
        res.status(500).json({ error: "Không thể lấy danh sách sản phẩm." });
    }
};

// Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Không tìm thấy sản phẩm." });
        }
        res.status(200).json(product);
    } catch (err) {
        console.error("Lỗi khi lấy sản phẩm theo ID:", err.message);
        res.status(500).json({ error: "Lỗi khi lấy sản phẩm." });
    }
};
export const getPopularProducts = async (req, res) => {
    try {
        const popularProducts = await Product.find({ is_popular: true }).limit(4);
        res.status(200).json(popularProducts);
    } catch (error) {
        console.error("Error fetching popular products:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getCollection = async (req, res) => {
    const { category } = req.params;

    // Kiểm tra category có hợp lệ không
    const validCategories = ["men", "women", "kid"];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ error: "Danh mục không hợp lệ." });
    }

    try {
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm theo danh mục:", error.message);
        res.status(500).json({ error: "Lỗi server." });
    }
};
