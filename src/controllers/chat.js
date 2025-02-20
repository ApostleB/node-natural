const General = require('../models/General');
let { getAnswer } = require('../util/nlp.js');
const { sendChatbot } = require("../util/chatBot");

exports.getAll = async (req, res) => {
    try {
        console.log("chat.js")

        const genrals = await General.find();
        console.log("genrals : ", genrals)

        res.json(genrals);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: '사용자 조회 실패' });
    }
};

exports.insertChat = async (req, res) => {
    try {
        const questionText = "questionText2";
        const answerText = "answerText";
        const nation = "EN";

        const newGeneral = new General({ questionText, answerText, nation });

        const savedGeneral = await newGeneral.save();

        console.log("insert : ", savedGeneral)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: '사용자 조회 실패' });
    }
};

exports.askChat = async (req, res) => {
    try {
        const questionText = req.body.text;
        if(!questionText || questionText.length < 1 || questionText.length > 1000){
            return res.status(500).json({ error: "실패" })
        }
        const nation = "EN";
        const chatList = await General.find();

        let result = getAnswer(questionText, chatList);
        console.log("DB결과 : ", result)

        if(!result){
            console.log("run gpt", questionText)
            result = await sendChatbot(questionText);
            console.log("result : ", result)
            const newGeneral = new General({ questionText, answerText:result, nation });
            const savedGeneral = await newGeneral.save();
            console.log("insert : ", savedGeneral)
        }

        res.json(result);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: '사용자 조회 실패' });
    }
};
