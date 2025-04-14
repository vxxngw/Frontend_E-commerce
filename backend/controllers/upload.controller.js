const path = require('path');
const multer = require('multer');

// Cấu hình Multer để lưu ảnh vào thư mục 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Đường dẫn lưu ảnh
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Tạo tên file duy nhất
    }
});

const upload = multer({ storage });

// API tải ảnh lên
const uploadImage = upload.single('image');  // Xử lý 1 ảnh tại 1 thời điểm

// Xử lý khi tải ảnh lên thành công
const uploadImageHandler = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Không có file ảnh nào được tải lên." });
        }

        // Tạo URL để trả về
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        return res.status(200).json({
            success: true,
            imageUrl,
        });
    } catch (err) {
        res.status(500).json({ message: "Lỗi tải ảnh lên", error: err.message });
    }
};

module.exports = { uploadImage, uploadImageHandler };
