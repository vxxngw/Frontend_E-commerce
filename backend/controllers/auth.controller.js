const { User } = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../ultis/generateToken.js");

// =============================
// 📌 Đăng ký tài khoản mới
// =============================
const registerUser = async (req, res) => {
    try {
        console.log("📦 Dữ liệu nhận từ frontend:", req.body);

        const { email, password, username } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin." });
        }

        // Kiểm tra trùng email
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email đã được sử dụng." });
        }

        // Kiểm tra trùng username
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ message: "Username đã tồn tại." });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            avatar: "/default-avatar.png", // ảnh mặc định
        });

        console.log("Tạo user mới:", newUser);
        await newUser.save();
        console.log("Đã lưu user thành công");

        // Tạo token và lưu vào cookie
        generateTokenAndSetCookie(newUser._id, res);

        // Trả về thông tin user (ẩn password)
        res.status(201).json({ success: true, user: { ...newUser._doc, password: "" } });
    } catch (err) {
        console.log("Register error:", err.message);
        res.status(500).json({ message: "Đăng ký thất bại. Vui lòng thử lại." });
    }
};

// =============================
// 📌 Đăng nhập
// =============================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm user theo email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email không tồn tại." });

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu." });

        // Tạo token và lưu cookie
        generateTokenAndSetCookie(user._id, res);

        // Trả về thông tin user (ẩn password)
        res.status(200).json({ success: true, user: { ...user._doc, password: "" } });
    } catch (err) {
        console.log("Login error:", err.message);
        res.status(500).json({ message: "Đăng nhập thất bại." });
    }
};

// =============================
// 📌 Đăng xuất
// =============================
const logoutUser = (req, res) => {
    try {
        // Xóa cookie jwt
        res.clearCookie("jwt");
        res.status(200).json({ success: true, message: "Đăng xuất thành công." });
    } catch (err) {
        res.status(500).json({ message: "Lỗi đăng xuất." });
    }
};

// =============================
// 📌 Kiểm tra xác thực người dùng (checkAuth)
// =============================
const checkAuth = (req, res) => {
    try {
        // req.user được gán trong middleware protectRoute
        res.status(200).json({ success: true, user: req.user });
    } catch (err) {
        res.status(500).json({ message: "Lỗi xác thực." });
    }
};

// =============================
// 📌 Cập nhật thông tin người dùng
// =============================
const updateUser = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy user từ middleware xác thực
        const { username, email, phone, password, avatar } = req.body;

        // Tạo đối tượng cập nhật động
        const updates = {};
        if (username) updates.username = username;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (avatar) updates.avatar = avatar;

        if (password) {
            updates.password = await bcrypt.hash(password, 10);
        }

        // Cập nhật user
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        res.status(200).json({ success: true, user: { ...updatedUser._doc, password: "" } });
    } catch (err) {
        console.log("Update error:", err.message);
        res.status(500).json({ message: "Cập nhật thất bại." });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth,
    updateUser
};
