const Order = require('../models/order.model');
const mongoose = require('mongoose');
const Product = require('../models/product.model'); // Import model sản phẩm
// =====================================
// 📌 Tạo đơn hàng mới
// =====================================
const createOrder = async (req, res) => {
    try {
        const { products, shippingAddress, userId } = req.body;

        // Tính giá cho từng sản phẩm và tổng giá đơn hàng
        let totalPrice = 0;
        const updatedProducts = await Promise.all(
            products.map(async (product) => {
                const productDetails = await Product.findById(product.productId);
                if (!productDetails) {
                    throw new Error(`Không tìm thấy sản phẩm với ID: ${product.productId}`);
                }

                const price = productDetails.new_price * product.quantity; // Tính giá dựa trên new_price và quantity
                totalPrice += price;

                return {
                    ...product,
                    price, // Gán giá trị price đã tính vào sản phẩm
                };
            })
        );

        // Tạo đơn hàng mới
        const newOrder = new Order({
            userId,
            products: updatedProducts,
            shippingAddress,
            totalPrice,
            status: 'pending',
            paymentStatus: 'pending',
        });

        const savedOrder = await newOrder.save();
        console.log("Order saved:", savedOrder);
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        res.status(500).json({ message: "Lỗi khi tạo đơn hàng", error });
    }
};

// =====================================
// 📌 Lấy thông tin đơn hàng theo ID
// =====================================
// =====================================
// 📌 Lấy thông tin đơn hàng theo ID
// =====================================
const getOrderById = async (req, res) => {
    try {
        const { id } = req.params; // Lấy orderId từ URL
        const order = await Order.findById(id).populate({
            path: 'products.productId', // Populate thông tin sản phẩm
            select: 'name new_price description image' // Chỉ lấy các trường cần thiết từ sản phẩm
        });

        if (!order) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        }

        res.status(200).json(order); // Trả về thông tin đơn hàng
    } catch (error) {
        console.error("Lỗi khi lấy thông tin đơn hàng:", error);
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// =====================================
// 📌 Lấy tất cả đơn hàng của 1 người dùng
// =====================================
// =====================================
// 📌 Lấy tất cả đơn hàng của 1 người dùng
// =====================================
// =====================================
// 📌 Lấy tất cả đơn hàng của 1 người dùng
// =====================================
const getOrdersByUser = async (req, res) => {
    const { userId } = req.params; // Lấy ID người dùng từ request params
    console.log("Fetching orders for user:", userId); // Log userId

    try {
        // Tìm đơn hàng theo userId và populate sản phẩm
        const orders = await Order.find({ userId }).populate({
            path: 'products.productId', // Populate thông tin sản phẩm
            select: 'name new_price description image' // Chỉ lấy các trường cần thiết từ sản phẩm
        });
        console.log("Orders found:", orders); // Log nếu tìm thấy đơn hàng

        // Kiểm tra dữ liệu sau khi populate
        orders.forEach(order => {
            console.log('Products in order:', order.products);
        });

        res.status(200).json(orders); // Trả về đơn hàng cho người dùng
    } catch (err) {
        console.error("Error fetching user orders:", err); // Log chi tiết lỗi
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách đơn hàng', error: err });
    }
};


// =====================================
// 📌 Cập nhật trạng thái đơn hàng
// =====================================
const updateOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    const { status, note } = req.body;

    console.log(`Updating status of order ${orderId} to ${status} with note: ${note}`); // Log thông tin cập nhật trạng thái

    try {
        // Cập nhật trạng thái đơn hàng và thêm vào lịch sử trạng thái
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                status,
                $push: {
                    orderHistory: { status, updatedAt: Date.now(), note }
                }
            },
            { new: true }
        );

        if (!updatedOrder) {
            console.error("Order not found:", orderId); // Log nếu không tìm thấy đơn hàng
            return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
        }

        console.log("Order updated:", updatedOrder); // Log nếu cập nhật thành công
        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error("Error updating order status:", err); // Log chi tiết lỗi
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng', error: err });
    }
};
// =====================================
// 📌 Lấy tất cả đơn hàng
// =====================================
const getAllOrders = async (req, res) => {
    try {
        // Lấy tất cả đơn hàng và populate thông tin sản phẩm
        const orders = await Order.find().populate({
            path: 'products.productId', // Populate thông tin sản phẩm
            select: 'name new_price description image' // Chỉ lấy các trường cần thiết từ sản phẩm
        });

        console.log("All orders fetched:", orders); // Log danh sách đơn hàng
        res.status(200).json(orders); // Trả về danh sách đơn hàng
    } catch (err) {
        console.error("Error fetching all orders:", err); // Log chi tiết lỗi
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách tất cả đơn hàng', error: err });
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUser,
    updateOrderStatus,
    getAllOrders
};

