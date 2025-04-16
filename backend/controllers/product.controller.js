const { Product } = require('../models/product.model.js');

// =====================================
// 📦 Lấy tất cả sản phẩm
// =====================================
const getAllProducts = async (req, res) => {
    try {
        // Truy vấn tất cả sản phẩm trong database
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error("Lỗi khi lấy tất cả sản phẩm:", err.message);
        res.status(500).json({ error: "Không thể lấy danh sách sản phẩm." });
    }
};

// =====================================
// 🔍 Lấy sản phẩm theo ID
// =====================================
const getProductById = async (req, res) => {
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

// =====================================
// 🌟 Lấy sản phẩm phổ biến (is_popular: true)
// =====================================
const getPopularProducts = async (req, res) => {
    try {
        const popularProducts = await Product.find({ is_popular: true }).limit(4); // Giới hạn 4 sản phẩm
        res.status(200).json(popularProducts);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm phổ biến:", error);
        res.status(500).json({ message: "Lỗi server khi lấy sản phẩm phổ biến" });
    }
};

// =====================================
// 🧺 Lấy sản phẩm theo danh mục (men, women, kid)
// =====================================
const getCollection = async (req, res) => {
    const { category } = req.params;
    console.log("Danh mục đang truy vấn:", category);

    // Kiểm tra xem danh mục có hợp lệ không
    const validCategories = ["men", "women", "kid"];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ error: "Danh mục không hợp lệ." });
    }

    try {
        // Tìm tất cả sản phẩm thuộc danh mục
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm theo danh mục:", error.message);
        res.status(500).json({ error: "Lỗi server khi lấy sản phẩm theo danh mục." });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getPopularProducts,
    getCollection
};
