import React, { useState } from 'react';
import './Payment.css';

const Payment = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        payment: 'card',
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Họ và tên không được để trống.';
        if (!formData.address.trim()) newErrors.address = 'Địa chỉ không được để trống.';
        if (!formData.phone.trim() || !/^(\+84|0)[1-9]\d{8}$/.test(formData.phone))
            newErrors.phone = 'Số điện thoại không hợp lệ.';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Lưu thông tin đơn hàng
        const orderData = { ...formData, orderId: Date.now() };
        localStorage.setItem('orderData', JSON.stringify(orderData));
        alert('Thanh toán thành công! Đơn hàng của bạn đã được lưu.');
        console.log(orderData);
        setFormData({ name: '', address: '', phone: '', payment: 'card' });
    };

    return (
        <div className="checkout-page">
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
                    {errors.address && <small className="error">{errors.address}</small>}
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
                <button type="submit">Thanh toán</button>
            </form>
        </div>
    );
};

export default Payment;
