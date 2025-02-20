const natural = require('natural');
const readline = require('readline');

// 몇 퍼센트가 일치 하도록 할거냐? 0(0%) ~ 1(100%)
const SIMILARITY_THRESHOLD = 0.8;

//정적 답변 구하기
const getAnswer = (inputWord, questionWords) => {
    //일치율 계산
    const similarResults = questionWords.map(item => {
        item.similarity = natural.JaroWinklerDistance(inputWord, item.questionText);
        return item;
    }).filter(result => result.similarity >= SIMILARITY_THRESHOLD);

    //가장 높은 일치율 찾기
    const result = similarResults.reduce((best, current) => {
        return !best || current.similarity > best.similarity ? current : best;
    }, null);

    return result;
}

module.exports = {
    getAnswer
}
