import express from 'express';
import cookieParser from 'cookie-parser';
import { ENV_VARS } from './config/envVars.js';
import { ConnectDB } from './config/db.js';

import authRoutes from './routes/auth.route.js';
// import productRoutes from './routes/product.route.js'; // Nếu có sau này
// import orderRoutes from './routes/order.route.js';     // Nếu có sau này

const app = express();

// Middleware cơ bản
app.use(express.json());
app.use(cookieParser());

// Log đơn giản
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} - ${new Date().toLocaleString()}`);
    next();
});

// Routes
app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/products", productRoutes); // nếu có
// app.use("/api/v1/orders", orderRoutes);     // nếu có

// Mặc định nếu không khớp route nào
app.use("*", (req, res) => {
    res.status(404).json({ success: false, message: "Không tìm thấy route." });
});

// Khởi động server
app.listen(ENV_VARS.PORT, async () => {
    try {
        await ConnectDB();
        console.log(`✅ Server chạy tại http://localhost:${ENV_VARS.PORT}`);
    } catch (err) {
        console.error("❌ Không kết nối được DB:", err.message);
    }
});
