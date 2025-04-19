const { User } = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const { generateTokenAndSetCookie } = require("../ultis/generateToken.js");
const jwt = require("jsonwebtoken"); // Đảm bảo đã import jsonwebtoken

// =============================
// 📌 Đăng ký tài khoản mới
// ============================= 
const registerUser = async (req, res) => {
    try {
        console.log("📦 Dữ liệu nhận từ frontend:", req.body);

        const { email, password, username } = req.body;

        if (!email || !password || !username) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin." });
        }

        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({
                message: userExists.email === email ? "Email đã được sử dụng." : "Username đã tồn tại."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            avatar: "/default-avatar.png",
        });

        await newUser.save();

        // Tạo token và thiết lập cookie cho người dùng
        generateTokenAndSetCookie(newUser._id, res);

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

        // Tìm người dùng theo email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Email không tồn tại." });

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu." });

        // Tạo token
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Payload (Thông tin cần mã hóa)
            process.env.JWT_SECRET,           // Secret key (Bí mật mã hóa)
            { expiresIn: "1d" }               // Thời gian hết hạn (1 ngày)
        );

        // Trả về token và thông tin người dùng
        res.status(200).json({
            success: true,
            token, // Trả về token
            user: { ...user._doc, password: "" } // Không trả về mật khẩu
        });
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
        res.clearCookie("jwt");
        res.status(200).json({ success: true, message: "Đăng xuất thành công." });
    } catch (err) {
        res.status(500).json({ message: "Lỗi đăng xuất." });
    }
};

// =============================
// 📌 Kiểm tra xác thực người dùng
// ============================= 
const checkAuth = (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (err) {
        res.status(500).json({ message: "Lỗi xác thực." });
    }
};

// =============================
// 📌 Cập nhật thông tin người dùng (có địa chỉ)
// ============================= 
const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email, phone, password, avatar, address } = req.body;

        const updates = {};

        if (username) updates.username = username;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (avatar) updates.avatar = avatar;

        if (password) {
            updates.password = await bcrypt.hash(password, 10);
        }

        // Cập nhật địa chỉ chỉ khi có thông tin
        if (address && typeof address === "object") {
            const { street, city, district, ward, zipCode } = address;
            updates.address = {
                street: street || "",
                city: city || "",
                district: district || "",
                ward: ward || "",
                zipCode: zipCode || ""
            };
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        res.status(200).json({
            success: true,
            user: { ...updatedUser._doc, password: "" }
        });
    } catch (err) {
        console.log("Update error:", err.message);
        res.status(500).json({ message: "Cập nhật thất bại." });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.log("Lỗi khi lấy danh sách người dùng:", err.message);
        res.status(500).json({ message: "Lỗi server khi lấy người dùng." });
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        res.status(200).json({ message: "Xóa người dùng thành công." });
    } catch (err) {
        console.log("Lỗi khi xóa người dùng:", err.message);
        res.status(500).json({ message: "Xóa người dùng thất bại." });
    }
};
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng." });
        }

        res.status(200).json({ success: true, user: { ...user._doc, password: "" } });
    } catch (err) {
        console.log("Lỗi khi lấy thông tin người dùng:", err.message);
        res.status(500).json({ message: "Lỗi server khi lấy thông tin người dùng." });
    }
};
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    checkAuth,
    updateUser,
    getAllUsers,
    deleteUser,
    getUserById
};
