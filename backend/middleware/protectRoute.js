const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model.js');

const protectRoute = async (req, res, next) => {
    try {
        // Lấy token từ cookie
        const token = req.cookies.jwt;

        // Nếu không có token thì chặn lại
        if (!token) {
            return res.status(401).json({ success: false, message: "Không được phép. Vui lòng đăng nhập!" });
        }

        // Giải mã token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Tìm người dùng dựa vào id đã mã hóa trong token
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ success: false, message: "Không tìm thấy người dùng" });
        }

        // Gắn thông tin user vào request để các controller khác dùng
        req.user = user;
        next();
    } catch (err) {
        console.log("Lỗi trong middleware protectRoute:", err.message);
        return res.status(401).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn" });
    }
};

module.exports = { protectRoute };
