const mongoose = require("mongoose");
const Product = require("../models/product.model.js");
const fs = require('fs');
const path = require('path');

// Hàm lưu ảnh từ base64
const saveImage = (base64Image, fileName) => {
    const matches = base64Image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 image');
    }

    const ext = matches[1]; // Lấy phần mở rộng (jpg, png, ...)
    const data = matches[2]; // Lấy dữ liệu base64
    const buffer = Buffer.from(data, 'base64');
    const uploadDir = path.join(__dirname, '../uploads'); // Thư mục lưu ảnh

    // Tạo thư mục nếu chưa tồn tại
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, `${fileName}.${ext}`);
    fs.writeFileSync(filePath, buffer); // Lưu file vào thư mục

    // Trả về chỉ tên file (không bao gồm thư mục uploads)
    return `${fileName}.${ext}`;
};

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
// =====================================
// 🌟 Lấy bộ sưu tập mới
// =====================================
// 🌟 Lấy bộ sưu tập mới
const getNewCollection = async (req, res) => {
    try {
        // Tìm các sản phẩm có thuộc tính is_new = true
        const newCollection = await Product.find({ is_new: true });
        console.log('Danh sách sản phẩm mới:', newCollection);

        // Kiểm tra nếu không có sản phẩm nào trong bộ sưu tập mới
        if (newCollection.length === 0) {
            return res.status(404).json({ error: "Không có sản phẩm mới trong bộ sưu tập." });
        }

        res.status(200).json(newCollection);
    } catch (error) {
        console.error("Lỗi khi lấy bộ sưu tập mới:", error.message);
        res.status(500).json({ error: "Lỗi server khi lấy bộ sưu tập mới." });
    }
};

// Hàm tạo sản phẩm
const createProduct = async (req, res) => {
    try {
        const { name, description, price, new_price, category, is_popular, is_new, stock, image } = req.body;

        console.log("🖼️ [POST] Lưu ảnh - Bắt đầu");
        const imageName = saveImage(image, `product_${Date.now()}`);
        console.log("✅ [POST] Lưu ảnh - Thành công:", imageName);

        const newProduct = new Product({
            name,
            description,
            price,
            new_price,
            category,
            is_popular,
            is_new,
            stock,
            image: imageName, // Lưu chỉ tên file ảnh
        });

        await newProduct.save();
        console.log("✅ [POST] Tạo sản phẩm - Thành công:", newProduct);
        res.status(201).json(newProduct);
    } catch (err) {
        console.error("❌ [POST] Lỗi khi tạo sản phẩm:", err.message);
        res.status(500).json({ message: "Lỗi khi tạo sản phẩm" });
    }
};

// =====================================
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, description, price, category, is_popular, is_new, image, stock } = req.body;

    // Kiểm tra tính hợp lệ của ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "ID sản phẩm không hợp lệ." });
    }

    try {
        // Tìm và cập nhật sản phẩm
        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { name, description, price, category, is_popular, is_new, image, stock },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Không tìm thấy sản phẩm." });
        }

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error.message);
        res.status(500).json({ error: "Lỗi khi cập nhật sản phẩm." });
    }
};
const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    // Kiểm tra tính hợp lệ của ID
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ error: "ID sản phẩm không hợp lệ." });
    }

    try {
        // Tìm và xóa sản phẩm
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ error: "Không tìm thấy sản phẩm." });
        }

        res.status(200).json({ success: true, message: "Sản phẩm đã được xóa thành công." });
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error.message);
        res.status(500).json({ error: "Lỗi khi xóa sản phẩm." });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getPopularProducts,
    getCollection,
    getNewCollection,
    createProduct,
    deleteProduct,
    updateProduct
};
