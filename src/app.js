// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {test} = require("./util/nlp.js");
const connectDB = require('./config/db');



require("dotenv").config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware 설정
app.use(cors()); // CORS 활성화
app.use(bodyParser.json()); // JSON 데이터 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

const apiRouter       = require('./routes/api');
const adminApiRouter       = require('./routes/adminApi');

app.post("/", (req, res) => {
    const inputText = req.body.text;

    test(inputText,req.body.text)

    res.status(200).json({"data":{
        "text": "성공"
    }});
});

// API 라우트 예제
app.use("/api", apiRouter);
app.use("/admin/api", adminApiRouter);

// 서버 실행
app.listen(PORT, () => {
    // console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});

