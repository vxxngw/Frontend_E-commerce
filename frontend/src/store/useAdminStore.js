// src/store/useAdminStore.js
import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-toastify';

const useAdminStore = create((set) => ({
    // Danh sách sản phẩm
    products: [],
    setProducts: (products) => set({ products }),

    // Danh sách người dùng
    users: [],
    setUsers: (users) => set({ users }),

    // Danh sách đơn hàng
    orders: [],
    setOrders: (orders) => set({ orders }),

    // Chi tiết sản phẩm, người dùng, đơn hàng (nếu cần)
    selectedProduct: null,
    setSelectedProduct: (product) => set({ selectedProduct: product }),

    selectedUser: null,
    setSelectedUser: (user) => set({ selectedUser: user }),

    selectedOrder: null,
    setSelectedOrder: (order) => set({ selectedOrder: order }),

    // ============================
    // API Quản lý sản phẩm
    // ============================
    fetchAllProducts: async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Fetching all products with token:", token); // Log token
            const res = await axios.get('http://localhost:5000/api/v1/admin/products', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Fetched products:", res.data); // Log dữ liệu trả về
            set({ products: res.data });
        } catch (err) {
            console.error("Error fetching products:", err); // Log lỗi
            toast.error('Không thể tải danh sách sản phẩm.');
        }
    },

    fetchProductById: async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Fetching product with ID: ${id} and token:`, token); // Log thông tin
            const res = await axios.get(`http://localhost:5000/api/v1/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Fetched product:", res.data); // Log dữ liệu trả về
            return res.data;
        } catch (err) {
            console.error(`Error fetching product with ID: ${id}`, err); // Log lỗi
            toast.error('Không thể tải thông tin sản phẩm.');
            return null;
        }
    },

    createProduct: async (productData) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(
                'http://localhost:5000/api/v1/admin/create/products',
                productData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            toast.success('Thêm sản phẩm thành công.');
            return res.data;
        } catch (err) {
            console.error('Lỗi khi thêm sản phẩm:', err);
            toast.error('Không thể thêm sản phẩm.');
            return null;
        }
    },

    updateProduct: async (id, productData) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Updating product with ID: ${id}`, productData, "and token:", token); // Log thông tin
            const res = await axios.put(`http://localhost:5000/api/v1/admin/products/${id}`, productData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Updated product:", res.data); // Log dữ liệu trả về
            toast.success('Cập nhật sản phẩm thành công.');
            return res.data;
        } catch (err) {
            console.error(`Error updating product with ID: ${id}`, err); // Log lỗi
            toast.error('Không thể cập nhật sản phẩm.');
            return null;
        }
    },

    deleteProduct: async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Deleting product with ID: ${id} and token:`, token); // Log thông tin
            await axios.delete(`http://localhost:5000/api/v1/admin/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Deleted product ID:", id); // Log ID của sản phẩm đã xóa
            toast.success('Xóa sản phẩm thành công.');
            set((state) => ({
                products: state.products.filter((product) => product._id !== id),
            }));
        } catch (err) {
            console.error(`Error deleting product with ID: ${id}`, err); // Log lỗi
            toast.error('Không thể xóa sản phẩm.');
        }
    },

    // ============================
    // API Quản lý người dùng
    // ============================
    fetchAllUsers: async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Fetching all users with token:", token); // Log token
            const res = await axios.get('http://localhost:5000/api/v1/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Fetched users:", res.data); // Log dữ liệu trả về
            set({ users: res.data });
        } catch (err) {
            console.error("Error fetching users:", err); // Log lỗi
            toast.error('Không thể tải danh sách người dùng.');
        }
    },

    fetchUserById: async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Fetching user with ID: ${id} and token:`, token); // Log thông tin
            const res = await axios.get(`http://localhost:5000/api/v1/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Fetched user:", res.data); // Log dữ liệu trả về
            return res.data;
        } catch (err) {
            console.error(`Error fetching user with ID: ${id}`, err); // Log lỗi
            toast.error('Không thể tải thông tin người dùng.');
            return null;
        }
    },

    updateUser: async (id, userData) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Updating user with ID: ${id}`, userData, "and token:", token); // Log thông tin
            const res = await axios.put(`http://localhost:5000/api/v1/admin/users/${id}`, userData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Updated user:", res.data); // Log dữ liệu trả về
            toast.success('Cập nhật người dùng thành công.');
            return res.data;
        } catch (err) {
            console.error(`Error updating user with ID: ${id}`, err); // Log lỗi
            toast.error('Không thể cập nhật người dùng.');
            return null;
        }
    },

    deleteUser: async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Deleting user with ID: ${id} and token:`, token); // Log thông tin
            await axios.delete(`http://localhost:5000/api/v1/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Deleted user ID:", id); // Log ID của người dùng đã xóa
            toast.success('Xóa người dùng thành công.');
            set((state) => ({
                users: state.users.filter((user) => user._id !== id),
            }));
        } catch (err) {
            console.error(`Error deleting user with ID: ${id}`, err); // Log lỗi
            toast.error('Không thể xóa người dùng.');
        }
    },

    // ============================
    // API Quản lý đơn hàng
    // ============================
    fetchAllOrders: async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Fetching all orders with token:", token); // Log token
            const res = await axios.get('http://localhost:5000/api/v1/admin/orders', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Fetched orders:", res.data); // Log dữ liệu trả về
            set({ orders: res.data });
        } catch (err) {
            console.error("Error fetching orders:", err); // Log lỗi
            toast.error('Không thể tải danh sách đơn hàng.');
        }
    },

    fetchOrderById: async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Fetching order with ID: ${id} and token:`, token); // Log thông tin
            const res = await axios.get(`http://localhost:5000/api/v1/admin/orders/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Fetched order:", res.data); // Log dữ liệu trả về
            return res.data;
        } catch (err) {
            console.error(`Error fetching order with ID: ${id}`, err); // Log lỗi
            toast.error('Không thể tải thông tin đơn hàng.');
            return null;
        }
    },

    updateOrderStatus: async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            console.log(`Updating order status for order ID: ${id} with status: ${status} and token:`, token); // Log thông tin
            const res = await axios.put(`http://localhost:5000/api/v1/admin/orders/${id}`, { status }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Updated order status:", res.data); // Log dữ liệu trả về
            toast.success('Cập nhật trạng thái đơn hàng thành công.');
            return res.data;
        } catch (err) {
            console.error(`Error updating order status for order ID: ${id}`, err); // Log lỗi
            toast.error('Không thể cập nhật trạng thái đơn hàng.');
            return null;
        }
    },
}));

export default useAdminStore;
