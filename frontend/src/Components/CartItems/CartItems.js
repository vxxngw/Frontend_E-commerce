import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartItems.css';
import useCartStore from '../../store/useCartStore';
import useProductStore from '../../store/useProductStore';
import remove_icon from '../Assets/cart_cross_icon.png';
import { useAuthStore } from '../../store/useAuthStore';

const CartItems = () => {
    const { cartItems, removeFromCart, addToCart, getTotalCartAmount, syncCartWithProducts, loadCartFromDB, error: cartError, loading: cartLoading } = useCartStore();
    const { products, fetchAllProducts, loading: productsLoading, error: productsError } = useProductStore();
    const [promoCode, setPromoCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const userId = user?._id;

    // Log trạng thái để debug
    useEffect(() => {
        console.log('CartItems state:', { cartItems, products, cartLoading, cartError, productsLoading, productsError });
    }, [cartItems, products, cartLoading, cartError, productsLoading, productsError]);

    // Tải giỏ hàng và sản phẩm
    useEffect(() => {
        if (userId) {
            loadCartFromDB();
        }
        if (products.length === 0 && !productsLoading) {
            fetchAllProducts();
        } else if (products.length > 0) {
            syncCartWithProducts(products);
        }
    }, [userId, loadCartFromDB, fetchAllProducts, products, productsLoading, syncCartWithProducts]);

    // Hiển thị khi đang tải
    if (cartLoading || productsLoading) {
        console.log('⏳ Đang chờ dữ liệu...');
        return <p>Đang tải dữ liệu giỏ hàng...</p>;
    }

    // Hiển thị lỗi nếu có
    if (cartError || productsError) {
        return <p>Lỗi: {cartError?.message || productsError || 'Có lỗi xảy ra. Vui lòng thử lại.'}</p>;
    }

    // Hiển thị khi không có sản phẩm
    if (!productsLoading && !productsError && products.length === 0) {
        return <p>Không có sản phẩm nào trong cửa hàng. <a href="/shop">Tiếp tục mua sắm</a></p>;
    }

    // Kiểm tra mục không hợp lệ trong giỏ hàng
    const invalidItems = Object.keys(cartItems).filter((key) => {
        const [id] = key.split('_');
        return !products.some((p) => p._id === id);
    });

    if (invalidItems.length > 0) {
        return (
            <div>
                <p>Một số sản phẩm trong giỏ hàng không còn tồn tại.</p>
                <button onClick={() => syncCartWithProducts(products)}>
                    Cập nhật giỏ hàng
                </button>
            </div>
        );
    }

    // Hiển thị khi giỏ hàng trống
    if (Object.keys(cartItems).length === 0) {
        return <p>Giỏ hàng của bạn đang trống. <a href="/shop">Tiếp tục mua sắm</a></p>;
    }

    // Tính tổng tiền
    const totalAmount = getTotalCartAmount(products);
    const finalAmount = discountedPrice > 0 ? discountedPrice : totalAmount;

    const handleCheckout = async () => {
        if (Object.keys(cartItems).length === 0) {
            alert('GIỎ HÀNG CỦA BẠN ĐANG TRỐNG!');
            return;
        }
        navigate('/payment');
    };

    // Áp dụng mã giảm giá
    const applyPromoCode = () => {
        if (promoCode === 'DISCOUNT10') {
            const discounted = totalAmount * 0.9; // Giảm giá 10%
            setDiscountedPrice(discounted);
            alert('MÃ GIẢM GIÁ ÁP DỤNG THÀNH CÔNG!');
        } else if (promoCode === 'DISCOUNT20') {
            const discounted = totalAmount * 0.8; // Giảm giá 20%
            setDiscountedPrice(discounted);
            alert('MÃ GIẢM GIÁ 20% ĐÃ ÁP DỤNG!');
        } else {
            setDiscountedPrice(0);
            alert('MÃ GIẢM GIÁ KHÔNG HỢP LỆ!');
        }
    };

    return (
        <div className="cartitems">
            {/* Header */}
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

            {/* Render sản phẩm trong giỏ */}
            {Object.entries(cartItems).map(([key, qty]) => {
                const [id, size] = key.split('_');
                const prod = products.find((p) => p._id === id);

                if (!prod) {
                    console.warn(`Không tìm thấy sản phẩm với _id: ${id}`);
                    return null;
                }

                return (
                    <div key={key}>
                        <div className="cartitems-format cartitems-format-main">
                            <img
                                src={`http://localhost:5000/uploads/${prod.image}`}
                                alt={prod.name}
                                className="carticon-product-icon"
                                onError={(e) => {
                                    console.error(`Lỗi tải hình ảnh: ${prod.image}`);
                                    e.target.src = '/path/to/fallback-image.png'; // Hình ảnh dự phòng
                                }}
                            />
                            <p>{prod.name}</p>
                            <p>{size === 'unknown' ? 'Không xác định' : size}</p>
                            <p>${prod.new_price.toFixed(2)}</p>
                            <div className="cartitems-quantity-wrapper">
                                <button onClick={() => removeFromCart(id, size)}>-</button>
                                <span>{qty}</span>
                                <button onClick={() => addToCart(userId, id, size, 1)}>+</button>
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

            {/* Tổng, mã giảm giá, thanh toán */}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>TỔNG GIÁ TRỊ GIỎ HÀNG</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>TẠM TÍNH</p>
                            <p>${totalAmount.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>PHÍ VẬN CHUYỂN</p>
                            <p>MIỄN PHÍ</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>TỔNG CỘNG</h3>
                            <h3>${finalAmount.toFixed(2)}</h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>THANH TOÁN</button>
                </div>

                <div className="cartitems-promocode">
                    <p>NẾU BẠN CÓ MÃ GIẢM GIÁ, NHẬP Ở ĐÂY</p>
                    <div className="cartitems-promobox">
                        <input
                            type="text"
                            placeholder="Mã Giảm Giá"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button onClick={applyPromoCode}>ÁP DỤNG</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
