const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        // Tên người dùng
        username: {
            type: String,
            required: true,
            trim: true, // Loại bỏ khoảng trắng đầu và cuối
        },
        // Email đăng nhập
        email: {
            type: String,
            required: true,
            unique: true,     // Không được trùng lặp
            lowercase: true,  // Chuyển về chữ thường
            trim: true,
        },
        // Mật khẩu
        password: {
            type: String,
            required: true,
            minlength: 6,     // Tối thiểu 6 ký tự
        },
        // Số điện thoại (tùy chọn)
        phone: {
            type: String,
        },
        // Địa chỉ (có thể chia nhỏ để quản lý tốt hơn)
        address: {
            street: String,    // Đường
            city: String,      // Thành phố
            district: String,  // Quận/Huyện
            ward: String,      // Phường/Xã
            zipCode: String,   // Mã bưu chính
        },
        // Vai trò người dùng: user hoặc admin
        role: {
            type: String,
            enum: ["user", "admin"], // Chỉ được chọn 1 trong 2 giá trị
            default: "user",         // Mặc định là người dùng thường
        },
        // Ảnh đại diện (lưu URL)
        avatar: {
            type: String,
            default: "",
        },
        // Trạng thái xác minh email
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true, // Tự động thêm createdAt và updatedAt
    }
);

// Tạo model từ schema
const User = mongoose.model("User", userSchema);

module.exports = { User };
