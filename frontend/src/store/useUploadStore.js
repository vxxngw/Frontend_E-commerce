// src/store/useUploadStore.js
import create from 'zustand';
import axios from 'axios';

const useUploadStore = create((set) => ({
    imageUrl: null,   // URL của ảnh đã tải lên
    loading: false,   // Trạng thái khi đang tải ảnh lên
    error: null,      // Lỗi nếu có
    uploadImage: async (imageFile) => {
        set({ loading: true, error: null }); // Đặt trạng thái đang tải lên

        const formData = new FormData();
        formData.append('image', imageFile); // Thêm ảnh vào FormData

        try {
            // Gửi yêu cầu upload ảnh lên backend
            const response = await axios.post('http://localhost:5000/api/v1/product/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                // Nếu upload thành công, lưu URL ảnh vào store
                set({ imageUrl: response.data.imageUrl, loading: false });
            } else {
                set({ error: 'Lỗi tải ảnh lên', loading: false });
            }
        } catch (err) {
            // Nếu có lỗi trong quá trình upload
            set({ error: 'Lỗi tải ảnh lên', loading: false });
        }
    },
}));

export default useUploadStore;
