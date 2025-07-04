import HTTP from 'superagent';
import dotenv from 'dotenv';
import express, { json } from 'express';
dotenv.config(); 

const DETECT_LANGUAGE_URL = 'https://papago.apigw.ntruss.com/langs/v1/dect';
const TRANSLATE_LANGUAGE_URL = 'https://papago.apigw.ntruss.com/nmt/v1/translation';
const clientId = process.env.PAPAGO_KEY;
const clientSecret = process.env.PAPAGO_SECRET;

//node_modules/express/폴더 내 코드를 import
// 여기서 express 관련 코드를 써야하기 때문에

const app = express(); // app -> express를 통해 서버를 구성할 때 설정할 헬퍼 객체
const port = 3000;

//정적 리소스 호스팅, Express.js의 미들웨어 기능으로 활용
//public이라는 이름의 폴더를 정적 리소스가 제공되는 곳으로 적용

//미들웨어 작성 부분(app 밑)
app.use(express.static('public'));
app.use(express.json()) // 역직렬화 모듈 -> undefined가 파싱된다.

app.get('/', (_, response) => {
    response.sendFile('index.html');
});

// 언어 감지 처리 API
app.post('/detect', (request, response) => {
    const url = DETECT_LANGUAGE_URL;

    HTTP.post(url)
        .send(request.body)
        .set('Content-Type', 'application/json')
        .set('X-NCP-APIGW-API-KEY-ID', clientId)
        .set('X-NCP-APIGW-API-KEY', clientSecret)
        .end((error, result) => {
            if (result.statusCode === 200) {
                response.send(result.body);
            } else {
                console.error(error);
            }
        });
});

// 번역 요청 처리 API
app.post('/translate', (request, response) => {

    const url = TRANSLATE_LANGUAGE_URL;

    HTTP.post(url)
        .send(request.body)
        .set('Content-Type', 'application/json')
        .set('X-NCP-APIGW-API-KEY-ID', clientId)
        .set('X-NCP-APIGW-API-KEY', clientSecret)
        .end((error, result) => {
            if (result.statusCode === 200) {
                // 파파고 서버로부터 응답받은 결과 데이터
                const responseDataFromPapago = result.body;

                // 화면 출력에 필요한 값만 추출
                const { srcLangType: detectedLanguage, tarLangType: targetLanguage, translatedText } = responseDataFromPapago.message.result;

                const responseData = {
                    detectedLanguage,
                    targetLanguage,
                    translatedText
                }

                response.send(responseData);
            } else {
                console.error(error);
            }
        });
});
app.listen(port,
    () => console.log(`http://127.0.0.1:${port}/ 서버 프로세스가 3000번 포트에서 실행 중입니다.`)
);