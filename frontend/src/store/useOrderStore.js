import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import useCartStore from './useCartStore';
import { useAuthStore } from './useAuthStore';

const useOrderStore = create(
    persist(
        (set) => ({
            order: null,
            orders: [],
            loading: false,
            error: null,
            success: false,
            fetchingOrder: false,
            updatingOrder: false,

            // 📌 Tạo đơn hàng mới
            createOrder: async (orderData) => {
                set({ loading: true, error: null, success: false });

                const { cartItems } = useCartStore.getState();
                if (Object.keys(cartItems).length === 0) {
                    set({ error: 'Giỏ hàng trống. Không thể tạo đơn hàng.', loading: false });
                    return;
                }

                const products = Object.keys(cartItems).map((key) => {
                    const [productId] = key.split('_');
                    const quantity = cartItems[key];
                    const price = getProductPrice(productId);
                    return { productId, quantity, price };
                });

                // Validate product data
                if (!products.every((p) => p.productId && p.quantity > 0 && p.price > 0)) {
                    set({ error: 'Dữ liệu sản phẩm không hợp lệ.', loading: false });
                    return;
                }

                const fullOrderData = {
                    userId: getUserId(),
                    shippingAddress: orderData.address,
                    products,
                    paymentStatus: orderData.payment === 'card' ? 'pending' : orderData.payment || 'pending',
                    discount: orderData.discount || 0,
                };

                try {
                    const res = await axios.post('http://localhost:5000/api/v1/orders', fullOrderData, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    set({ order: res.data, loading: false, success: true });
                } catch (err) {
                    set({
                        error: err.response?.data?.message || 'Lỗi không xác định',
                        loading: false,
                        success: false,
                    });
                }
            },

            // 📌 Lấy thông tin đơn hàng theo ID
            fetchOrder: async (orderId) => {
                set({ fetchingOrder: true });
                try {
                    const response = await axios.get(`http://localhost:5000/api/v1/orders/${orderId}`);
                    set({ order: response.data, fetchingOrder: false });
                } catch (error) {
                    set({ error: error.response?.data?.message || 'Lỗi không xác định', fetchingOrder: false });
                }
            },

            // 📌 Lấy tất cả đơn hàng của 1 người dùng
            getOrdersByUserId: async () => {
                const userId = getUserId();
                if (!userId) {
                    set({ error: 'Không tìm thấy userId', fetchingOrder: false });
                    return;
                }

                set({ fetchingOrder: true });
                try {
                    const res = await axios.get(`http://localhost:5000/api/v1/orders/user/${userId}`);
                    set({ orders: res.data, fetchingOrder: false });
                } catch (error) {
                    set({ error: error.response?.data?.message || 'Lỗi không xác định', fetchingOrder: false });
                }
            },

            // 📌 Cập nhật trạng thái đơn hàng
            updateOrderStatus: async (orderId, status, note) => {
                set({ updatingOrder: true, error: null });
                try {
                    const res = await axios.put(`http://localhost:5000/api/v1/orders/${orderId}/status`, { status, note });
                    set({
                        order: res.data,
                        updatingOrder: false,
                        success: true,
                    });
                } catch (error) {
                    set({
                        error: error.response?.data?.message || 'Lỗi không xác định',
                        updatingOrder: false,
                        success: false,
                    });
                }
            },

            // 📌 Reset trạng thái order
            resetOrderState: () => {
                set({ order: null, loading: false, error: null, success: false });
            },
        }),
        {
            name: 'order-storage', // key trong localStorage
            partialize: (state) => ({ order: state.order, orders: state.orders }), // chỉ lưu state cần thiết
        }
    )
);

// Helper Functions

const getProductPrice = (productId) => {
    const { products } = useCartStore.getState();
    const found = products?.find((p) => p.id === productId);
    return found?.price || 100000; // Default price if product not found
};

const getUserId = () => {
    const user = useAuthStore.getState().user;
    return user?._id || null;
};

export default useOrderStore;
