import React, { useState } from "react";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import useProductStore from "../../store/useProductStore";
import remove_icon from "../Assets/cart_cross_icon.png";
import useOrderStore from "../../store/useOrderStore";

const Payment = () => {
    const navigate = useNavigate();
    const { createOrder, loading } = useOrderStore();
    const { cartItems, removeFromCart, addToCart } = useCartStore();
    const { products } = useProductStore();

    const [formData, setFormData] = useState({
        name: "",
        address: "",
        phone: "",
        payment: "card",
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim())
            newErrors.name = "Họ và tên không được để trống.";
        if (!formData.address.trim())
            newErrors.address = "Địa chỉ không được để trống.";
        if (!formData.phone.trim() || !/^(\+84|0)[1-9]\d{8}$/.test(formData.phone))
            newErrors.phone = "Số điện thoại không hợp lệ.";
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const cart = Object.entries(cartItems).map(([key, qty]) => {
            const [id, size] = key.split("_");
            return { productId: id, size, quantity: qty };
        });

        const totalPrice = cart.reduce((sum, item) => {
            const product = products.find((p) => p._id === item.productId);
            return sum + (product?.new_price || 0) * item.quantity;
        }, 0);

        const orderData = {
            ...formData,
            cart,
            totalPrice,
        };

        try {
            await createOrder(orderData);
            alert("Đặt hàng thành công!");
            navigate("/shop");
        } catch (err) {
            console.error("Lỗi đặt hàng:", err);
            alert("Đã có lỗi xảy ra khi đặt hàng.");
        }
    };

    return (
        <div className="cartitems" style={{ marginBottom: '10px' }}>
            <div className="cartitems-format-main">
                <p>SẢN PHẨM</p>
                <p>TÊN SẢN PHẨM</p>
                <p>KÍCH CỠ</p>
                <p>GIÁ</p>
                <p>SỐ LƯỢNG</p>
                <p>TỔNG CỘNG</p>
                <p>XÓA</p>
            </div>
            <hr />

            {Object.entries(cartItems).map(([key, qty]) => {
                const [id, size] = key.split("_");
                const prod = products.find((p) => p._id === id);

                if (!prod) {
                    console.warn(`Không tìm thấy sản phẩm với _id: ${id}`);
                    return null;
                }

                return (
                    <div key={key}>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={`http://localhost:5000/uploads/${prod.image}`}
                                alt={prod.name}
                                className="carticon-product-icon"
                                onError={(e) => {
                                    console.error(`Lỗi tải hình ảnh: ${prod.image}`);
                                    e.target.src = "/fallback.png";
                                }}
                            />
                            <p>{prod.name}</p>
                            <p>{size}</p>
                            <p>${prod.new_price.toFixed(2)}</p>
                            <div className="cartitems-quantity-wrapper">
                                <button onClick={() => removeFromCart(id, size)}>-</button>
                                <span>{qty}</span>
                                <button onClick={() => addToCart(id, size)}>+</button>
                            </div>
                            <p>${(prod.new_price * qty).toFixed(2)}</p>
                            <img
                                src={remove_icon}
                                onClick={() => removeFromCart(id, size)}
                                alt="Xóa"
                                className="cartitems-remove-icon"
                            />
                        </div>
                        <hr />
                    </div>
                );
            })}

            <h1>Thanh toán</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Họ và tên</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Nhập họ và tên của bạn"
                    />
                    {errors.name && <small className="error">{errors.name}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Địa chỉ giao hàng</label>
                    <input
                        type="text"
                        id="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Nhập địa chỉ giao hàng"
                    />
                    {errors.address && (
                        <small className="error">{errors.address}</small>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại</label>
                    <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Nhập số điện thoại"
                    />
                    {errors.phone && <small className="error">{errors.phone}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="payment">Phương thức thanh toán</label>
                    <select
                        id="payment"
                        value={formData.payment}
                        onChange={handleInputChange}
                    >
                        <option value="card">Thẻ tín dụng</option>
                        <option value="paypal">PayPal</option>
                    </select>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Đang xử lý..." : "Thanh toán"}
                </button>
            </form>
        </div>
    );
};

export default Payment;