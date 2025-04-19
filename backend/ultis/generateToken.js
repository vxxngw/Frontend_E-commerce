const jwt = require('jsonwebtoken');

// Hàm tạo JWT token và gán vào cookie
module.exports.generateTokenAndSetCookie = (userId, res) => {
    // Tạo token với payload là userId, sử dụng secret từ biến môi trường, thời hạn 7 ngày
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    // Thiết lập cookie tên 'jwt' chứa token
    res.cookie('jwt', token, {
        httpOnly: true,       // Chỉ cho phép truy cập cookie này từ HTTP, không thể truy cập bằng JavaScript => giúp bảo vệ khỏi XSS
        secure: process.env.NODE_ENV === 'production', // Chỉ gửi cookie qua HTTPS nếu đang ở môi trường production
        sameSite: 'strict',   // Ngăn chặn việc gửi cookie trong các request từ domain khác => giảm nguy cơ bị CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // Thời gian sống của cookie: 7 ngày (tính bằng mili giây)
    });
};
