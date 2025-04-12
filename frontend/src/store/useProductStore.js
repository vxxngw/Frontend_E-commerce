import { create } from 'zustand';
import axios from 'axios';

const useProductStore = create((set) => ({
    products: [],
    product: null,
    loading: false,
    error: null,

    // Lấy tất cả sản phẩm
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

    // Lấy sản phẩm phổ biến
    fetchPopularProducts: async () => {
        set({ loading: true, error: null });
        try {
            const res = await axios.get('http://localhost:5000/api/v1/product/popular');
            set({ products: res.data, loading: false });
        } catch (err) {
            console.error(err);
            set({ error: 'Lỗi khi tải sản phẩm phổ biến', loading: false });
        }
    },

    // Lấy sản phẩm theo danh mục
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

    // Lấy sản phẩm theo ID
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
