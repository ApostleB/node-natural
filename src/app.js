// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {test} = require("./util/nlp.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware 설정
app.use(cors()); // CORS 활성화
app.use(bodyParser.json()); // JSON 데이터 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

// 기본 라우트
app.post("/", (req, res) => {
    const inputText = req.body.text;

    test(inputText,req.body.text)

    res.status(200).json({"data":{
        "text": "성공"
    }});
});

// API 라우트 예제
app.use("/api", (req, res) => {
    console.log(req.body);
    return res.send("test")
});

// 서버 실행
app.listen(PORT, () => {
    // console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});

