import React, { createContext, useState } from 'react';

// Tạo context
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]); // lưu danh sách đơn hàng
    const [loading, setLoading] = useState(false);

    // Hàm tạo đơn hàng
    const createOrder = async (orderData) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            const data = await res.json();
            if (res.ok) {
                setOrders(prev => [...prev, data]); // Thêm vào danh sách đơn hàng
                return { success: true, data };
            } else {
                return { success: false, message: data.message };
            }
        } catch (err) {
            return { success: false, message: "Có lỗi khi gửi đơn hàng" };
        } finally {
            setLoading(false);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, createOrder, loading }}>
            {children}
        </OrderContext.Provider>
    );
};
