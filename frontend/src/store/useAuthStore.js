import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isCheckingAuth: true,
    isUpdating: false,

    // Đăng ký
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const res = await axios.post("http://localhost:5000/api/v1/auth/signup", credentials); // Cập nhật URL đầy đủ
            set({ user: res.data.user });
            toast.success("Đăng ký thành công");
        } catch (err) {
            toast.error(err.response?.data?.message || "Lỗi đăng ký");
        } finally {
            set({ isSigningUp: false });
        }
    },

    // Đăng nhập
    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const res = await axios.post("http://localhost:5000/api/v1/auth/login", credentials); // Cập nhật URL đầy đủ
            set({ user: res.data.user });
            toast.success("Đăng nhập thành công");
        } catch (err) {
            toast.error(err.response?.data?.message || "Lỗi đăng nhập");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    // Đăng xuất
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await axios.post("http://localhost:5000/api/v1/auth/logout"); // Cập nhật URL đầy đủ
            set({ user: null });
            toast.success("Đăng xuất thành công");
        } catch (err) {
            toast.error(err.response?.data?.message || "Lỗi đăng xuất");
        } finally {
            set({ isLoggingOut: false });
        }
    },

    // Kiểm tra xác thực
    authCheck: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await axios.get("http://localhost:5000/api/v1/auth/check-auth"); // Cập nhật URL đầy đủ
            set({ user: res.data.user });
        } catch {
            set({ user: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    // Cập nhật thông tin người dùng
    updateUser: async (updates) => {
        set({ isUpdating: true });
        try {
            const res = await axios.put("http://localhost:5000/api/v1/auth/update", updates); // Cập nhật URL đầy đủ
            set({ user: res.data.user });
            toast.success("Cập nhật thành công");
        } catch (err) {
            toast.error(err.response?.data?.message || "Lỗi cập nhật");
        } finally {
            set({ isUpdating: false });
        }
    },
}));
