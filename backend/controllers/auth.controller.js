import { User } from "../models/user.model.js";

import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../ultis/generateToken.js";

// Đăng ký tài khoản
export const registerUser = async (req, res) => {
    try {
        const { email, password, username, phone } = req.body;

        if (!email || !password || !username || !phone) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin." });
        }

        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email đã được sử dụng." });
        }

        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: "Username đã tồn tại." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            phone,
            avatar: "/default-avatar.png",
        });

        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({ success: true, user: { ...newUser._doc, password: "" } });
    } catch (err) {
        console.log("Register error:", err.message);
        res.status(500).json({ message: "Đăng ký thất bại. Vui lòng thử lại." });
    }
};

// Đăng nhập
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email không tồn tại." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu." });

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({ success: true, user: { ...user._doc, password: "" } });
    } catch (err) {
        console.log("Login error:", err.message);
        res.status(500).json({ message: "Đăng nhập thất bại." });
    }
};

// Đăng xuất
export const logoutUser = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ success: true, message: "Đăng xuất thành công." });
    } catch (err) {
        res.status(500).json({ message: "Lỗi đăng xuất." });
    }
};

// Xác thực người dùng
export const checkAuth = (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (err) {
        res.status(500).json({ message: "Lỗi xác thực." });
    }
};

// Cập nhật thông tin người dùng
export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email, phone, password, avatar } = req.body;

        const updates = {};
        if (username) updates.username = username;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (avatar) updates.avatar = avatar;

        if (password) {
            updates.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        res.status(200).json({ success: true, user: { ...updatedUser._doc, password: "" } });
    } catch (err) {
        console.log("Update error:", err.message);
        res.status(500).json({ message: "Cập nhật thất bại." });
    }
};
