// config/db.js
const mongoose = require('mongoose');
require("dotenv").config();
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/chat-natural';

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB에 연결되었습니다.');
    } catch (err) {
        console.error('MongoDB 연결 실패:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
