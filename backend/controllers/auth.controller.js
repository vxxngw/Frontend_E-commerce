const { User } = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../ultis/generateToken.js");

// Đăng ký tài khoản
const registerUser = async (req, res) => {
    try {
        console.log("📦 Dữ liệu nhận từ frontend:", req.body);

        const { email, password, username, } = req.body;

        if (!email || !password || !username) {
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
            avatar: "/default-avatar.png",
        });
        console.log("Tạo user mới:", newUser);
        await newUser.save();
        console.log("Đã lưu user thành công");
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({ success: true, user: { ...newUser._doc, password: "" } });
    } catch (err) {
        console.log("Register error:", err.message);
        res.status(500).json({ message: "Đăng ký thất bại. Vui lòng thử lại." });
    }
};

// Đăng nhập
const loginUser = async (req, res) => {
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
const logoutUser = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ success: true, message: "Đăng xuất thành công." });
    } catch (err) {
        res.status(500).json({ message: "Lỗi đăng xuất." });
    }
};

// Xác thực người dùng
const checkAuth = (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (err) {
        res.status(500).json({ message: "Lỗi xác thực." });
    }
};

// Cập nhật thông tin người dùng
const updateUser = async (req, res) => {
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

module.exports = { registerUser, loginUser, logoutUser, checkAuth, updateUser };
