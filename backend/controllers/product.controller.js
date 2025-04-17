const mongoose = require("mongoose");
const { Product } = require("../models/product.model.js");

// =====================================
// 📦 Lấy tất cả sản phẩm
// =====================================
const getAllProducts = async (req, res) => {
    try {
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
    let rawId = req.params.id.trim(); // Lấy ID từ request và loại bỏ khoảng trắng dư thừa
    console.log("Product ID nhận được:", rawId);

    // Loại bỏ ký tự xuống dòng, tab hoặc những ký tự không hợp lệ
    rawId = rawId.replace(/[\n\t\r]/g, "");

    // Kiểm tra tính hợp lệ của ID
    if (!mongoose.Types.ObjectId.isValid(rawId)) {
        return res.status(400).json({ error: "ID sản phẩm không hợp lệ." });
    }

    console.log("ID sau khi đã loại bỏ ký tự không hợp lệ:", rawId);

    try {
        // Truy vấn sản phẩm bằng ID
        const product = await Product.findById(rawId);
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
// 🌟 Lấy sản phẩm phổ biến
// =====================================
const getPopularProducts = async (req, res) => {
    try {
        const popularProducts = await Product.find({ is_popular: true }).limit(4);
        res.status(200).json(popularProducts);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm phổ biến:", error);
        res.status(500).json({ message: "Lỗi server khi lấy sản phẩm phổ biến" });
    }
};

// =====================================
// 🧺 Lấy sản phẩm theo danh mục
// =====================================
const getCollection = async (req, res) => {
    const { category } = req.params;
    console.log("Danh mục đang truy vấn:", category);

    const validCategories = ["men", "women", "kid"];
    if (!validCategories.includes(category)) {
        return res.status(400).json({ error: "Danh mục không hợp lệ." });
    }

    try {
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
