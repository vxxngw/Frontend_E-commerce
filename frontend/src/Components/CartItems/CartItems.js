import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom để chuyển hướng
import './CartItems.css';
import { ShopContext } from '../../Contexts/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { Link } from 'react-router-dom';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount, addToCart } = useContext(ShopContext);
    const [promoCode, setPromoCode] = useState('');
    const navigate = useNavigate(); // Khởi tạo useNavigate để chuyển hướng người dùng

    // Hàm xử lý thanh toán
    const handleCheckout = async () => {
        if (Object.keys(cartItems).length === 0) {
            alert("GIỎ HÀNG CỦA BẠN ĐANG TRỐNG!");
            return;
        }

        // Tạo danh sách sản phẩm từ cartItems và all_product
        const products = all_product
            .filter((item) => cartItems[item.id] > 0)
            .map((item) => ({
                productId: item.id,
                quantity: cartItems[item.id],
                price: item.new_price
            }));

        const orderData = {
            userId: "123", // Cập nhật theo user hiện tại (nếu có)
            shippingAddress: "123 ĐƯỜNG ABC, QUẬN 1",
            products: products
        };

        try {
            const res = await fetch("http://localhost:5000/api/v1/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ ĐẶT HÀNG THÀNH CÔNG!");
                // Reset cartItems về rỗng:
                localStorage.removeItem("cartItems"); // Nếu bạn dùng localStorage
                navigate('/checkout'); // Điều hướng tới trang thanh toán
            } else {
                alert(`❌ LỖI KHI ĐẶT HÀNG: ${data.message}`);
            }
        } catch (err) {
            alert("❌ KHÔNG THỂ KẾT NỐI TỚI SERVER!");
            console.error(err);
        }
    };

    // Hàm xử lý thay đổi mã giảm giá
    const handlePromoCodeChange = (e) => {
        setPromoCode(e.target.value);
    };

    // Hàm áp dụng mã giảm giá
    const applyPromoCode = () => {
        if (promoCode === 'DISCOUNT10') {
            alert('MÃ GIẢM GIÁ ÁP DỤNG THÀNH CÔNG!');
        } else {
            alert('MÃ GIẢM GIÁ KHÔNG HỢP LỆ!');
        }
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>SẢN PHẨM</p>
                <p>TÊN SẢN PHẨM</p>
                <p>KÍCH CỠ</p> {/* Added size column */}
                <p>GIÁ</p>
                <p>SỐ LƯỢNG</p>
                <p>TỔNG CỘNG</p>
                <p>XÓA</p>
            </div>
            <hr />

            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>{e.size || "M"}</p> {/* Display size if available, default to "M" */}
                                <p>${e.new_price}</p>

                                <div className="cartitems-quantity-wrapper">
                                    <button onClick={() => removeFromCart(e.id)} className="qty-btn">-</button>
                                    <span className="cartitems-quantity">{cartItems[e.id]}</span>
                                    <button onClick={() => addToCart(e.id)} className="qty-btn">+</button>
                                </div>

                                <p>${e.new_price * cartItems[e.id]}</p>
                                <img
                                    className='cartitems-remove-icon'
                                    src={remove_icon}
                                    onClick={() => { removeFromCart(e.id); }}
                                    alt=""
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>TỔNG GIÁ TRỊ GIỎ HÀNG</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>TẠM TÍNH</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-tatal-item">
                            <p>PHÍ VẬN CHUYỂN</p>
                            <p>MIỄN PHÍ</p>
                        </div>
                        <hr />
                        <div className="cartitems-tatal-item">
                            <h3>TỔNG CỘNG</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>THANH TOÁN</button>
                </div>
                <div className="cartitems-promocode">
                    <p>NẾU BẠN CÓ MÃ GIẢM GIÁ, NHẬP Ở ĐÂY</p>
                    <div className="cartitems-promobox">
                        <input
                            type="text"
                            placeholder='Mã Giảm Giá'
                            value={promoCode}
                            onChange={handlePromoCodeChange}
                        />
                        <button onClick={applyPromoCode}>ÁP DỤNG</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
