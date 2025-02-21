const fs = require("fs");

require("dotenv").config();

const OpenAI = require("openai").OpenAI;
const openai= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


exports.runFineTune = async () => {
    const filePath = "./static/tune_files/qa.jsonl";
    const fileResponse = await openai.files.create({
        file: fs.createReadStream(filePath),
        purpose: "fine-tune"
    });
    const fileId = fileResponse.id;
    console.log("File:", fileResponse);
    console.log("File uploaded with ID:", fileId);

    const fineTuneResponse = await openai.fineTuning.jobs.create({
            "training_file":fileId,
            "model":"gpt-4o-mini-2024-07-18"
        }
    )

    console.log(fineTuneResponse);
    if(fineTuneResponse.error !== {}){
        return "error"
    }else{
        return fineTuneResponse.id
    }

}
exports.waitForFineTuneCompletion = (fineTuneId, interval = 5000) => {

    return new Promise((resolve, reject) => {
        const intervalId = setInterval(async () => {
            try {
                const response = await openai.fineTuning.jobs.retrieve(fineTuneId);
                const status = response.status;
                console.log(`Current status: ${status}`);

                if (status === 'succeeded') {
                    clearInterval(intervalId);
                    console.log('Fine-tuning succeeded:', response);
                    resolve(response); // 작업 완료 응답
                } else if (status === 'failed') {
                    clearInterval(intervalId);
                    console.error('Fine-tuning failed:', response);
                    reject(new Error('Fine-tuning failed')); // 오류 발생 시 예외
                }
            } catch (error) {
                clearInterval(intervalId);
                reject(error);
            }
        }, interval); // 지정된 시간 간격(5초)마다 상태 확인
    });
}

exports.sendChatbot = async (content) => {
    const currentModel = "ft:gpt-4o-mini-2024-07-18:personal::B2z4Pu0b"
    // ft:gpt-4o-mini-2024-07-18:personal::ARLO0IjM
    // const completion = await openai.chat.completions.create(
    //     {
    //         model: currentModel,
    //         "messages":[{"role": "user", "content": content}],
    //     }
    // )
    const completion = await openai.chat.completions.create({
        model: currentModel,
        messages: [{ role: "user", content: content }],
        max_tokens: 500,
    });



    return completion.choices[0].message.content;
}

exports.tuneList = async () => {
    const list = await openai.fineTuning.jobs.list()
    let result = [];
    list.data.forEach((item) => {
        const data = {
            "id":item.id,
            "status":item.status,
            "error":item.error?.code,
            "created_at":convertUnixTimestamp(item.created_at),
        }
        item.created_at = convertUnixTimestamp(item.created_at);
        if(item.status === "succeeded"){
            console.log(item);
        }


        result.push(data)
    })
    return result;
}



function convertUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // 초를 밀리초로 변환
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // 월은 0부터 시작하므로 +1
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
