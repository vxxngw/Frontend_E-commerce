const express = require("express");
const {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth,
    updateUser,
} = require("../controllers/auth.controller.js");
const { protectRoute } = require("../middleware/protectRoute.js");

const router = express.Router();

// Đăng ký tài khoản mới
router.post("/signup", registerUser);

// Đăng nhập
router.post("/login", loginUser);

// Đăng xuất
router.post("/logout", logoutUser);

// Kiểm tra người dùng đã xác thực chưa (dùng khi load lại trang, kiểm tra user)
router.get("/check-auth", protectRoute, checkAuth);

// Cập nhật thông tin người dùng
router.put("/update", protectRoute, updateUser);

module.exports = router;
