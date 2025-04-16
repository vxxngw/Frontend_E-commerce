const express = require("express");
const {
    registerUser,  // Hàm xử lý đăng ký người dùng
    loginUser,     // Hàm xử lý đăng nhập
    logoutUser,    // Hàm xử lý đăng xuất
    checkAuth,     // Hàm kiểm tra xác thực người dùng
    updateUser     // Hàm cập nhật thông tin người dùng
} = require("../controllers/auth.controller.js");

const { protectRoute } = require("../middleware/protectRoute.js"); // Middleware bảo vệ route, chỉ cho phép truy cập nếu đã xác thực

const router = express.Router();

// Đăng ký tài khoản mới
router.post("/signup", registerUser);

// Đăng nhập
router.post("/login", loginUser);

// Đăng xuất
router.post("/logout", logoutUser);

// Kiểm tra người dùng đã xác thực chưa (dùng khi load lại trang, kiểm tra xem user còn đăng nhập hay không)
router.get("/check-auth", protectRoute, checkAuth);

// Cập nhật thông tin người dùng (chỉ cho
