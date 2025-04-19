const Cart = require('../models/cart.model.js');

// Lấy giỏ hàng từ database
const getCartByUser = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
        res.status(200).json(cart || { userId: req.params.userId, items: [] });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi lấy giỏ hàng', error: err.message });
    }
};

// Thêm sản phẩm vào giỏ hàng
const addToCart = async (req, res) => {
    let { userId, productId, size, quantity } = req.body;

    console.log("📦 Dữ liệu yêu cầu thêm vào giỏ:", req.body);

    // Kiểm tra và ép kiểu quantity sang số
    quantity = parseInt(quantity);
    if (!userId || !productId || !size || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({
            message: 'Thiếu hoặc sai định dạng thông tin: userId, productId, size, quantity'
        });
    }

    try {
        // Tìm giỏ hàng hiện tại
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Nếu chưa có giỏ hàng -> tạo mới
            cart = new Cart({ userId, items: [{ productId, size, quantity }] });
        } else {
            // Tìm xem sản phẩm cùng size đã có trong giỏ chưa
            const index = cart.items.findIndex((item) =>
                item.productId.toString() === productId.toString() && item.size === size
            );

            if (index >= 0) {
                // Nếu có rồi, cộng thêm số lượng
                cart.items[index].quantity += quantity;
            } else {
                // Nếu chưa có, thêm mới vào giỏ
                cart.items.push({ productId, size, quantity });
            }
        }

        // Lưu giỏ hàng đã thay đổi
        await cart.save();
        const populatedCart = await Cart.findOne({ userId }).populate('items.productId');
        res.status(200).json(populatedCart);
    } catch (err) {
        console.error('❌ Lỗi khi thêm vào giỏ hàng:', err);
        res.status(500).json({ message: 'Lỗi thêm vào giỏ hàng', error: err.message });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
const removeFromCart = async (req, res) => {
    const { userId, productId, size } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        cart.items = cart.items.filter(
            (item) => !(item.productId.toString() === productId && item.size === size)
        );

        await cart.save();
        const populatedCart = await Cart.findOne({ userId }).populate('items.productId');
        res.status(200).json(populatedCart);
    } catch (err) {
        res.status(500).json({ message: 'Lỗi xóa sản phẩm khỏi giỏ hàng', error: err.message });
    }
};

// Xóa toàn bộ giỏ hàng
const clearCart = async (req, res) => {
    const { userId } = req.body;

    try {
        await Cart.updateOne({ userId }, { $set: { items: [] } });
        res.status(200).json({ message: 'Giỏ hàng đã được xóa', userId, items: [] });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi khi xóa giỏ hàng', error: err.message });
    }
};

// Cập nhật giỏ hàng
const updateCart = async (req, res) => {
    const { userId, cartItems } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        cart.items = Object.entries(cartItems).map(([key, quantity]) => {
            const [productId, size] = key.split('_');
            return { productId, size, quantity: parseInt(quantity) };
        }).filter(item => item.productId && item.size && !isNaN(item.quantity));

        await cart.save();
        const populatedCart = await Cart.findOne({ userId }).populate('items.productId');
        res.status(200).json({ message: 'Giỏ hàng đã được cập nhật', cart: populatedCart });
    } catch (err) {
        console.error('❌ Lỗi khi cập nhật giỏ hàng:', err);
        res.status(500).json({ message: 'Lỗi khi cập nhật giỏ hàng', error: err.message });
    }
};

module.exports = { getCartByUser, addToCart, removeFromCart, clearCart, updateCart };
