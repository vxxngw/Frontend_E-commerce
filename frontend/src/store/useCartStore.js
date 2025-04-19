import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import useAuthStore from './useAuthStore';

const useCartStore = create(persist(
    (set, get) => ({
        cartItems: {},
        products: [],
        loading: false,
        error: null,

        // Tải giỏ hàng từ database
        loadCartFromDB: async () => {
            const userId = useAuthStore.getState().user?._id;
            if (!userId) {
                console.warn('⚠️ Chưa có userId');
                return;
            }

            try {
                set({ loading: true });
                const response = await axios.get(`http://localhost:5000/api/v1/cart/${userId}`, {
                    headers: { 'Content-Type': 'application/json' }
                });
                console.log('Dữ liệu giỏ hàng:', response.data);
                if (response.data?.items) {
                    const itemsObj = {};
                    for (const item of response.data.items) {
                        const productId = item.productId?._id || item.productId || item.product?._id || item.product;
                        const size = item.size || 'unknown';
                        if (!productId) {
                            console.warn('⚠️ Dữ liệu item không hợp lệ (thiếu productId):', item);
                            continue;
                        }
                        const key = `${productId}_${size}`;
                        itemsObj[key] = item.quantity;
                    }
                    set({ cartItems: itemsObj, loading: false, error: null });
                    console.log('📦 Giỏ hàng đã load:', itemsObj);
                } else {
                    set({ cartItems: {}, loading: false, error: null });
                    console.log('📦 Giỏ hàng rỗng');
                }
            } catch (err) {
                console.error('❌ Lỗi tải giỏ hàng:', err);
                set({ error: err.response?.data || err.message, loading: false });
            }
        },

        // Thêm sản phẩm vào giỏ hàng

        addToCart: async (userId, productId, size, quantity) => {
            try {
                set({ loading: true });
                console.log('Dữ liệu gửi đi:', {
                    userId,
                    items: [{ productId, size, quantity }]
                });

                const response = await axios.post('http://localhost:5000/api/v1/cart/add', {
                    userId,
                    productId,
                    size,
                    quantity
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });


                console.log('Thêm giỏ hàng thành công:', response.data);
                await get().loadCartFromDB();
                set({ loading: false, error: null });
                return response.data;
            } catch (error) {
                console.error('❌ Lỗi thêm giỏ hàng:', error);
                console.log('Phản hồi server:', error.response?.data || error.message);
                set({ error: error.response?.data || error.message, loading: false });
                throw error;
            }
        },

        // Xoá sản phẩm khỏi giỏ hàng
        removeFromCart: async (productId, size) => {
            const userId = useAuthStore.getState().user?._id;
            const key = `${productId}_${size}`;
            const cartItems = { ...get().cartItems };

            if (!cartItems[key]) return;

            try {
                set({ loading: true });
                if (cartItems[key] > 1) {
                    cartItems[key] -= 1;
                } else {
                    delete cartItems[key];
                }

                await axios.post('http://localhost:5000/api/v1/cart/remove', {
                    userId,
                    productId,
                    size
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });

                set({ cartItems, loading: false, error: null });
                console.log('🗑️ Đã xoá sản phẩm:', key);
            } catch (err) {
                console.error('❌ Lỗi xoá sản phẩm:', err);
                set({ error: err.response?.data || err.message, loading: false });
            }
        },

        // Xoá toàn bộ giỏ hàng
        clearCart: async () => {
            const userId = useAuthStore.getState().user?._id;
            if (!userId) {
                console.warn('⚠️ Chưa có userId');
                return;
            }

            try {
                set({ loading: true });
                await axios.post('http://localhost:5000/api/v1/cart/clear', {
                    userId
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
                set({ cartItems: {}, loading: false, error: null });
                console.log('🧹 Giỏ hàng đã được xoá');
            } catch (err) {
                console.error('❌ Lỗi xoá toàn bộ giỏ:', err);
                set({ error: err.response?.data || err.message, loading: false });
            }
        },

        // Cập nhật toàn bộ giỏ hàng lên DB
        updateCartToDB: async () => {
            const userId = useAuthStore.getState().user?._id;
            const cartItems = get().cartItems;

            if (!userId) {
                console.warn('⚠️ Chưa có userId');
                return;
            }

            try {
                set({ loading: true });
                await axios.post('http://localhost:5000/api/v1/cart/update', {
                    userId,
                    cartItems
                }, {
                    headers: { 'Content-Type': 'application/json' }
                });
                set({ loading: false, error: null });
                console.log('📤 Đã cập nhật giỏ hàng lên server');
            } catch (err) {
                console.error('❌ Lỗi cập nhật giỏ hàng:', err);
                set({ error: err.response?.data || err.message, loading: false });
            }
        },

        // Đồng bộ giỏ hàng với danh sách sản phẩm
        syncCartWithProducts: async () => {
            const products = get().products;
            const cartItems = { ...get().cartItems };
            let changed = false;

            for (const key in cartItems) {
                const [productId] = key.split('_');
                if (!products.some(p => p._id === productId)) {
                    delete cartItems[key];
                    changed = true;
                }
            }

            if (changed) {
                set({ cartItems });
                await get().updateCartToDB();
            }
        },

        // Tải danh sách sản phẩm
        loadProducts: async () => {
            try {
                set({ loading: true });
                const res = await axios.get('http://localhost:5000/api/v1/products');
                set({ products: res.data, loading: false, error: null });
            } catch (err) {
                console.error('❌ Lỗi tải sản phẩm:', err);
                set({ error: err.response?.data || err.message, loading: false });
            }
        },

        // Tính tổng tiền giỏ hàng
        getTotalCartAmount: (products) => {
            const { cartItems } = get();
            let total = 0;
            for (const [key, quantity] of Object.entries(cartItems)) {
                const [productId] = key.split('_');
                const product = products.find(p => p._id === productId);
                if (product && product.new_price) {
                    total += product.new_price * quantity;
                }
            }
            return total;
        }
    }),
    {
        name: 'cart-storage',
        partialize: (state) => ({ cartItems: state.cartItems })
    }
));

export default useCartStore;