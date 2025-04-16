const Order = require('../models/order.model');
const mongoose = require('mongoose');

// =====================================
// 📌 Tạo đơn hàng mới
// =====================================
const createOrder = async (req, res) => {
    try {
        const { userId, shippingAddress, products } = req.body;

        // Chuyển userId thành ObjectId của MongoDB
        const convertedUserId = mongoose.Types.ObjectId(userId);

        // Chuyển productId trong mảng sản phẩm thành ObjectId
        const convertedProducts = products.map((item) => ({
            productId: mongoose.Types.ObjectId(item.productId),
            quantity: item.quantity,
            price: item.price,
        }));

        // Tạo đơn hàng mới
        const newOrder = new Order({
            userId: convertedUserId,
            shippingAddress,
            products: convertedProducts,
        });

        // Lưu đơn hàng
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Error while saving order:", error);
        res.status(500).json({ message: "Lỗi khi tạo đơn hàng", error });
    }
};

// =====================================
// 📌 Lấy thông tin đơn hàng theo ID
// =====================================
const getOrderById = async (req, res) => {
    const orderId = req.params.id;

    try {
        // Tìm đơn hàng và populate thông tin sản phẩm
        const order = await Order.findById(orderId).populate('products.productId');
        if (!order) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
        }

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy đơn hàng', error: err });
    }
};

// =====================================
// 📌 Lấy tất cả đơn hàng của 1 người dùng
// =====================================
const getOrdersByUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Tìm đơn hàng theo userId và populate sản phẩm
        const orders = await Order.find({ userId }).populate('products.productId');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách đơn hàng', error: err });
    }
};

// =====================================
// 📌 Cập nhật trạng thái đơn hàng
// =====================================
const updateOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;

    try {
        // Cập nhật trạng thái đơn hàng
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

        if (!updatedOrder) {
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng', error: err });
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUser,
    updateOrderStatus
};
