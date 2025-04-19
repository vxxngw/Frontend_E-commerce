const dotenv = require('dotenv');
dotenv.config();

const ENV_VARS = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI
};

module.exports = { ENV_VARS };
