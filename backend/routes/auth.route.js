import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth,
    updateUser,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

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

export default router;
