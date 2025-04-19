const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    // Tham chiếu đến người dùng đã đặt đơn hàng
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Tham chiếu tới model User
        required: true
    },
    // Danh sách sản phẩm trong đơn hàng
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product', // Tham chiếu tới model Product
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1 // Mặc định là 1 sản phẩm
        },
        price: {
            type: Number,
            required: true // Giá tại thời điểm mua (không phụ thuộc vào giá hiện tại)
        }
    }],
    // Tổng giá trị đơn hàng
    totalPrice: {
        type: Number,
        required: true
    },
    // Địa chỉ giao hàng
    shippingAddress: {
        type: String,
        required: true
    },
    // Trạng thái đơn hàng
    status: {
        type: String,
        default: 'pending', // Mặc định là 'pending' (đang chờ xử lý)
        required: true // Các giá trị có thể là: 'pending', 'shipped', 'delivered', 'cancelled'
    },
    // Thời gian tạo đơn hàng
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Tạo model Order từ schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
