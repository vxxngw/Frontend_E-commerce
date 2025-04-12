import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate từ react-router-dom để chuyển hướng
import './CartItems.css';
import { ShopContext } from '../../Contexts/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import { Link } from 'react-router-dom';

const CartItems = () => {
    const { all_product, cartItems, removeFromCart, getTotalCartAmount,addToCart } = useContext(ShopContext);
    const navigate = useNavigate(); // Khởi tạo useNavigate để chuyển hướng người dùng

    const handleCheckout = () => {
        if (Object.keys(cartItems).length === 0) {
            alert("Giỏ hàng của bạn đang trống!");
            return; // Nếu giỏ hàng trống, không cho phép thanh toán
        }
        // Bạn có thể thêm logic xử lý thanh toán ở đây (giữ thông tin giỏ hàng, gửi dữ liệu, v.v.)
        // Sau khi chuẩn bị xong, chuyển hướng đến trang thanh toán:
        navigate('/checkout'); // Giả sử trang thanh toán của bạn có đường dẫn là /checkout
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Size</p> {/* Added size column */}
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
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
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-tatal-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-tatal-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <Link to="/payment"><button onClick={handleCheckout}>Thanh toán</button></Link>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promocode, enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Promocode' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
