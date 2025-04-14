const mongoose = require('mongoose');
const { ENV_VARS } = require('./envVars');

const ConnectDB = async () => {
    try {
        // Sử dụng các tùy chọn khuyến nghị của Mongoose
        await mongoose.connect(ENV_VARS.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Kết nối MongoDB thành công!");
    } catch (err) {
        console.error("Lỗi kết nối MongoDB: ", err.message);
        throw new Error('Lỗi kết nối MongoDB: ' + err.message);
    }
};

module.exports = { ConnectDB };
