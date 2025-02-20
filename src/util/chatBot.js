const fs = require("fs");

require("dotenv").config();

const OpenAI = require("openai").OpenAI;
const openai= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const fineTune = async () => {
    const filePath = "/static/tune_files/qa.jsonl";

    const fileResponse = await openai.files.create({
        file: fs.createReadStream(filePath),
        purpose: "fine-tune"
    });

    console.log(fileResponse);
    return fileResponse;
}

exports.sendChatbot = async (content) => {
    const completion = await openai.chat.completions.create(
        {
            model: 'ft:gpt-4o-mini-2024-07-18:personal::ARLO0IjM',
            "messages":[{"role": "user", "content": content}],
        }
    )

    return completion.choices[0].message.content;
}