const natural = require('natural');
const readline = require('readline');

// 예시 DB: 실제 DB 연동이 필요하면 해당 부분을 수정하세요.
const dbSentences = [
    "안녕하세요, 반갑습니다.",
    "자연어 처리는 정말 흥미로워요.",
    "오늘 날씨가 참 좋네요.",
    "test1",
    "test2",
];


const dbSentences2 = [
    {word:"안녕하세요, 반갑습니다.", "idx" : 1},
    {word:"자연어 처리는 정말 흥미로워요.", "idx" : 2},
    {word:"오늘 날씨가 참 좋네요.", "idx" : 3},
    {word:"test1", "idx" : 4},
    {word:"test2", "idx" : 5},
];

// 몇 퍼센트가 일치 하도록 할거냐? 0(0%) ~ 1(100%)
const SIMILARITY_THRESHOLD = 0.8;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// rl.question('비교할 문장을 입력하세요: ', (inputSentence) => {
//     // 입력받은 문장과 DB에 저장된 각 문장 간의 유사도 계산
//     const similarResults = dbSentences.map(dbSentence => {
//
//         //입력 문장과 DB에 저장된 문장 간의 유사도를 계산합니다.
//         const similarity = natural.JaroWinklerDistance(inputSentence, dbSentence);
//         console.log("유사도 : ", similarity)
//         console.log("비교 한 문장 : ", dbSentence)
//         return { dbSentence, similarity };
//     }).filter(result => result.similarity >= SIMILARITY_THRESHOLD);
//
//     console.log("TEST : ", similarResults)
//     if (similarResults.length > 0) {
//         console.log('유사한 문장들이 발견되었습니다:');
//         similarResults.forEach(result => {
//             console.log(`- "${result.dbSentence}" (유사도: ${result.similarity.toFixed(2)})`);
//         });
//     } else {
//         console.log('유사한 문장이 없습니다.');
//     }
//
//     test(inputSentence, dbSentence[0])
//
//     rl.close();
// });

const getWords = () => {
    return  [
        { "idx": 0, "word" : "오늘 날씨 어때?" },
        { "idx": 0, "word" : "배고픈데 뭐 먹을까?" },
        { "idx": 0, "word" : "지금 몇 시야?" },
        { "idx": 0, "word" : "오늘 기분이 좋아!" },
        { "idx": 0, "word" : "이 영화를 추천해 줄 수 있어?" },
        { "idx": 0, "word" : "커피 한 잔 마실래?" },
        { "idx": 0, "word" : "다음 주에 여행 갈 계획이 있어." },
        { "idx": 0, "word" : "이 책 정말 재미있어!" },
        { "idx": 0, "word" : "어제 밤에 잠을 잘 못 잤어." },
        { "idx": 0, "word" : "운동을 시작해야겠어." },
        { "idx": 0, "word" : "이 문제는 어떻게 해결해야 할까?" },
        { "idx": 0, "word" : "다음 주 일정 확인해 줄래?" },
        { "idx": 0, "word" : "새로운 프로젝트가 시작되었어." },
        { "idx": 0, "word" : "여기에 오는 길이 어려웠어." },
        { "idx": 0, "word" : "배터리가 거의 다 됐어." },
        { "idx": 0, "word" : "이 제품에 대한 리뷰를 찾아볼게." },
        { "idx": 0, "word" : "비밀번호를 잊어버렸어." },
        { "idx": 0, "word" : "내일 비가 올까?" },
        { "idx": 0, "word" : "친구들과 저녁 식사 약속이 있어." },
        { "idx": 0, "word" : "이거 어디서 샀어?" },
        { "idx": 0, "word" : "건강을 위해 물을 많이 마셔야 해." },
        { "idx": 0, "word" : "출근길이 너무 막혀." },
        { "idx": 0, "word" : "회의 시간 좀 확인해 줄래?" },
        { "idx": 0, "word" : "오늘 할 일이 너무 많아." },
        { "idx": 0, "word" : "이번 주말에 뭐 할 거야?" },
        { "idx": 0, "word" : "운전을 처음 배울 때 정말 어려웠어." },
        { "idx": 0, "word" : "시험 준비는 잘 되어 가?" },
        { "idx": 0, "word" : "어제 본 드라마 너무 재미있었어." },
        { "idx": 0, "word" : "이 앱 사용법을 알고 싶어." },
        { "idx": 0, "word" : "할인 쿠폰이 있으면 좋겠다." },
        { "idx": 0, "word" : "배송이 얼마나 걸릴까?" },
        { "idx": 0, "word" : "음악 추천해 줄래?" },
        { "idx": 0, "word" : "비행기 티켓을 예약하고 싶어." },
        { "idx": 0, "word" : "은행에서 계좌 개설하는 방법을 알려줘." },
        { "idx": 0, "word" : "새로운 스마트폰을 사고 싶어." },
        { "idx": 0, "word" : "오늘 점심은 뭐 먹을까?" },
        { "idx": 0, "word" : "여름이 점점 다가오고 있어." },
        { "idx": 0, "word" : "운동할 시간이 부족해." },
        { "idx": 0, "word" : "이 영화의 줄거리를 설명해 줄래?" },
        { "idx": 0, "word" : "친구한테 선물을 주고 싶어." },
        { "idx": 0, "word" : "새로운 언어를 배우는 건 재미있어." },
        { "idx": 0, "word" : "요즘 유행하는 패션 스타일이 뭐야?" },
        { "idx": 0, "word" : "회의록을 정리해 줄 수 있어?" },
        { "idx": 0, "word" : "해외 여행을 가고 싶어." },
        { "idx": 0, "word" : "인터넷 연결이 자꾸 끊겨." },
        { "idx": 0, "word" : "좋은 책을 추천해 줄래?" },
        { "idx": 0, "word" : "이번 달 예산을 초과했어." },
        { "idx": 0, "word" : "이 카페 분위기가 정말 좋아." },
        { "idx": 0, "word" : "너의 꿈은 뭐야?" },
        { "idx": 0, "word" : "오늘 하루 어땠어?" },
    ];
}

const test = (inputWord, TargetWord) => {
    // const similarity = natural.JaroWinklerDistance(inputWord, TargetWord);
    const questionWords = getWords()

    console.log(questionWords)

    const similarResults = questionWords.map(item => {
        //입력 문장과 DB에 저장된 문장 간의 유사도를 계산합니다.
        const similarity = natural.JaroWinklerDistance(inputWord, item.word);
        console.log(item.word + " / " + "유사도 : ", similarity)

        return { item, similarity };
    }).filter(result => result.similarity >= SIMILARITY_THRESHOLD); //정해진 정확도 이상일 경우 저장

    console.log(`함수 종료 / 유사한 문장 발견 : ${similarResults.length > 0 ? similarResults.length : 0}`)
    console.log("========================================================================================");

}

module.exports = {
    test
}
