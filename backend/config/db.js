import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js';

export const ConnectDB = async () => {
    try {
        await mongoose.connect(ENV_VARS.MONGO_URI);
    } catch (err) {
        throw new Error('Lỗi kết nối MongoDB: ' + err.message);
    }
};
