import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });

    // Set cookie trên response
    res.cookie('jwt', token, {
        httpOnly: true,       // Bảo vệ khỏi XSS
        secure: process.env.NODE_ENV === 'production', // Chỉ HTTPS trong production
        sameSite: 'strict',   // Ngăn chặn CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });
};
