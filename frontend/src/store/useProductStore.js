import { create } from 'zustand';
import axios from 'axios';
const useProductStore = create((set) => ({
    products: [],
    product: null,
    loading: false,
    error: null,
    popularProducts: [],       // ✅ thêm
    newCollection: [],         // ✅ thêm

    fetchAllProducts: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('http://localhost:5000/api/v1/product');
            set({ products: res.data, loading: false });
        } catch (err) {
            console.error(err);
            set({ error: 'Lỗi khi tải danh sách sản phẩm', loading: false });
        }
    },

    fetchPopularProducts: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('http://localhost:5000/api/v1/product/popular');
            set({ popularProducts: res.data, loading: false }); // ✅ sửa chỗ này
        } catch (err) {
            console.error(err);
            set({ error: 'Lỗi khi tải sản phẩm phổ biến', loading: false });
        }
    },

    fetchNewCollection: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('http://localhost:5000/api/v1/product/collection/women');
            set({ newCollection: res.data, loading: false }); // ✅ thêm
        } catch (err) {
            console.error(err);
            set({ error: 'Lỗi khi tải bộ sưu tập mới', loading: false });
        }
    },

    fetchProductsByCategory: async (category) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/product/collection/${category}`);
            set({ products: res.data, loading: false });
        } catch (err) {
            console.error(err);
            set({ error: 'Lỗi khi tải sản phẩm theo danh mục', loading: false });
        }
    },

    fetchProductById: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
            set({ product: res.data, loading: false });
        } catch (err) {
            console.error(err);
            set({ error: 'Lỗi khi tải sản phẩm', loading: false });
        }
    },
}));
export default useProductStore;