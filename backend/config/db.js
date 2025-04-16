const mongoose = require('mongoose');
const { ENV_VARS } = require('./envVars');

// Hàm kết nối MongoDB
const ConnectDB = async () => {
    try {
        // 👉 Kết nối đến MongoDB với URI được lấy từ biến môi trường
        await mongoose.connect(ENV_VARS.MONGO_URI, {
            useNewUrlParser: true, // Sử dụng trình phân tích cú pháp URL mới
            useUnifiedTopology: true // Sử dụng engine kết nối mới của MongoDB
        });

        console.log("✅ Kết nối MongoDB thành công!");
    } catch (err) {
        console.error("❌ Lỗi kết nối MongoDB: ", err.message);
        // Ném lỗi để server biết và có thể xử lý (ví dụ: dừng khởi động)
        throw new Error('Lỗi kết nối MongoDB: ' + err.message);
    }
};

module.exports = { ConnectDB };
