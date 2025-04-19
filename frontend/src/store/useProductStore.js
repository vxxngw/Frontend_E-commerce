import { create } from 'zustand';
import axios from 'axios';

const useProductStore = create((set) => ({
    products: [],
    product: null,
    loading: false,
    error: null,
    popularProducts: [],
    newCollection: [],

    // 📦 Lấy tất cả sản phẩm
    fetchAllProducts: async () => {
        const { products, loading } = useProductStore.getState();
        if (products.length > 0 || loading) return;

        set({ loading: true, error: null });
        try {
            const res = await axios.get('http://localhost:5000/api/v1/product');
            console.log('API response:', res.status, res.data);
            let productsData = Array.isArray(res.data) ? res.data : res.data.products || [];
            if (!productsData.length) {
                console.warn('API trả về danh sách sản phẩm rỗng');
                set({ products: [], loading: false, error: 'Không có sản phẩm nào từ API' });
                return;
            }
            set({
                products: productsData,
                loading: false
            });
        } catch (err) {
            console.error('Lỗi khi gọi API:', err.response?.status, err.message);
            set({ error: `Lỗi khi tải sản phẩm: ${err.message}`, loading: false });
        }
    },

    // 🔍 Lấy sản phẩm theo ID
    fetchProductById: async (id) => {
        const { product, loading } = useProductStore.getState();
        if (loading) return;
        if (product && product._id === id) {
            console.log('Product already in state:', product);
            return;
        }
        set({ loading: true, error: null });
        try {
            console.log(`Fetching product with id: ${id}`);
            const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`);
            console.log('Product data received:', res.data);
            if (res.data) {
                set({ product: res.data, loading: false });
            } else {
                set({ error: 'Dữ liệu sản phẩm không hợp lệ', loading: false });
            }
        } catch (err) {
            console.error('Error fetching product:', err);
            set({ error: 'Lỗi khi tải sản phẩm', loading: false });
        }
    },

    // 🌟 Lấy sản phẩm phổ biến
    fetchPopularProducts: async () => {
        const { loading } = useProductStore.getState();
        if (loading) return;
        set({ loading: true, error: null });
        try {
            const res = await axios.get('http://localhost:5000/api/v1/product/popular');
            set({ popularProducts: res.data, loading: false });
        } catch (err) {
            console.error('Lỗi khi tải sản phẩm phổ biến:', err);
            set({ error: 'Lỗi khi tải sản phẩm phổ biến', loading: false });
        }
    },

    // 🌟 Lấy bộ sưu tập mới
    fetchNewCollection: async () => {
        const { loadingNewCollection } = useProductStore.getState();
        if (loadingNewCollection) return;
        set({ loadingNewCollection: true, errorNewCollection: null });
        try {
            const res = await axios.get('http://localhost:5000/api/v1/product/collection/new');
            set({ newCollection: res.data, loadingNewCollection: false });
        } catch (err) {
            set({ errorNewCollection: err.message, loadingNewCollection: false });
        }
    },

    // 🧺 Lấy sản phẩm theo danh mục
    fetchProductsByCategory: async (category) => {
        const { loading } = useProductStore.getState();
        if (loading) return;
        set({ loading: true, error: null });
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/product/collection/${category}`);
            set({ products: res.data, loading: false });
        } catch (err) {
            console.error('Lỗi khi tải sản phẩm theo danh mục:', err);
            set({ error: 'Lỗi khi tải sản phẩm theo danh mục', loading: false });
        }
    },

    // 🧺 Tạo sản phẩm mới
    createProduct: async (newProduct) => {
        const { loading } = useProductStore.getState();
        if (loading) return;
        set({ loading: true, error: null });
        try {
            const res = await axios.post('http://localhost:5000/api/v1/product', newProduct);
            set({ products: [...useProductStore.getState().products, res.data.product], loading: false });
        } catch (err) {
            console.error('Lỗi khi tạo sản phẩm mới:', err);
            set({ error: 'Lỗi khi tạo sản phẩm mới', loading: false });
        }
    },

    // 🧺 Cập nhật sản phẩm
    updateProduct: async (id, updatedProduct) => {
        const { loading } = useProductStore.getState();
        if (loading) return;
        set({ loading: true, error: null });
        try {
            const res = await axios.put(`http://localhost:5000/api/v1/product/${id}`, updatedProduct);
            set({
                products: useProductStore.getState().products.map((product) =>
                    product._id === id ? res.data.product : product
                ),
                loading: false
            });
        } catch (err) {
            console.error('Lỗi khi cập nhật sản phẩm:', err);
            set({ error: 'Lỗi khi cập nhật sản phẩm', loading: false });
        }
    },

    // 🧺 Xóa sản phẩm
    deleteProduct: async (id) => {
        const { loading } = useProductStore.getState();
        if (loading) return;
        set({ loading: true, error: null });
        try {
            await axios.delete(`http://localhost:5000/api/v1/product/${id}`);
            set({
                products: useProductStore.getState().products.filter((product) => product._id !== id),
                loading: false
            });
        } catch (err) {
            console.error('Lỗi khi xóa sản phẩm:', err);
            set({ error: 'Lỗi khi xóa sản phẩm', loading: false });
        }
    },
}));

export default useProductStore;
