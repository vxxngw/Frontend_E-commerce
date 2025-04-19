const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Lấy token từ header Authorization
    if (!token) {
        return res.status(401).json({ message: 'Token không có trong yêu cầu' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token
        req.user = decoded; // Thêm thông tin người dùng vào request
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Không đủ quyền truy cập' });
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};

module.exports = { adminAuth };
