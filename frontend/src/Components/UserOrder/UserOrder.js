import React, { useEffect, useState } from 'react';
import useOrderStore from '../../store/useOrderStore';
import './UserOrder.css';
import axios from 'axios';

const UserOrder = () => {
    const { order, loading, error } = useOrderStore();
    const [productDetails, setProductDetails] = useState([]);

    useEffect(() => {
        console.log("Dữ liệu order trong UserOrder:", order);
        if (order && order.products) {
            const fetchProductDetails = async () => {
                const productData = [];
                for (const product of order.products) {
                    try {
                        // Gửi yêu cầu để lấy thông tin chi tiết sản phẩm
                        const response = await axios.get(`http://localhost:5000/api/v1/product/${product.productId}`);
                        productData.push({
                            ...product,
                            name: response.data.name,
                            price: response.data.new_price
                        });
                    } catch (error) {
                        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
                    }
                }
                setProductDetails(productData);
            };
            fetchProductDetails();
        }
    }, [order]);

    if (loading) {
        return <div className="loading">Đang tải thông tin đơn hàng...</div>;
    }

    if (error) {
        return <div className="error">Lỗi: {error}</div>;
    }

    if (!order) {
        return <div className="no-order">Không có đơn hàng nào.</div>;
    }

    return (
        <div className="order-details">
            <h2>Chi tiết đơn hàng</h2>
            <p>Địa chỉ giao hàng: {order.shippingAddress}</p>
            <p>Tổng tiền: {order.totalPrice} VNĐ</p>
            <h3>Sản phẩm:</h3>

            <table className="order-table">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    {productDetails.length > 0 ? (
                        productDetails.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name ?? "Không có tên"}</td>
                                <td>{product.quantity}</td>
                                <td>{product.price} VNĐ</td>
                                <td>{(product.price * product.quantity).toFixed(2)} VNĐ</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Đang tải thông tin sản phẩm...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default UserOrder;
