const natural = require('natural');
const readline = require('readline');

// 예시 DB: 실제 DB 연동이 필요하면 해당 부분을 수정하세요.
const dbSentences = [
    "안녕하세요, 반갑습니다.",
    "자연어 처리는 정말 흥미로워요.",
    "오늘 날씨가 참 좋네요."
];

// 몇 퍼센트가 일치 하도록 할거냐? 0(0%) ~ 1(100%)
const SIMILARITY_THRESHOLD = 0.8;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('비교할 문장을 입력하세요: ', (inputSentence) => {
    // 입력받은 문장과 DB에 저장된 각 문장 간의 유사도 계산
    const similarResults = dbSentences.map(dbSentence => {

        //입력 문장과 DB에 저장된 문장 간의 유사도를 계산합니다.
        const similarity = natural.JaroWinklerDistance(inputSentence, dbSentence);
        console.log("유사도 : ", similarity)
        console.log("비교 한 문장 : ", dbSentence)
        return { dbSentence, similarity };
    }).filter(result => result.similarity >= SIMILARITY_THRESHOLD);

    console.log("TEST : ", similarResults)
    if (similarResults.length > 0) {
        console.log('유사한 문장들이 발견되었습니다:');
        similarResults.forEach(result => {
            console.log(`- "${result.dbSentence}" (유사도: ${result.similarity.toFixed(2)})`);
        });
    } else {
        console.log('유사한 문장이 없습니다.');
    }

    test(inputSentence, dbSentence[0])

    rl.close();
});

const test = (inputWord, TargetWord) => {


    const similarity = natural.JaroWinklerDistance(inputWord, dbSentence);
    // const similarResults = dbSentences.map(dbSentence => {
    //
    //     //입력 문장과 DB에 저장된 문장 간의 유사도를 계산합니다.
    //     const similarity = natural.JaroWinklerDistance(inputWord, dbSentence);
    //     console.log("유사도 : ", similarity)
    //     console.log("비교 한 문장 : ", dbSentence)
    //     return { dbSentence, similarity };
    // }).filter(result => result.similarity >= SIMILARITY_THRESHOLD);

    console.log("test : ", similarity)
}
