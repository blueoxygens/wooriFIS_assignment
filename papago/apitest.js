import HTTP from 'superagent';
import dotenv from 'dotenv';
dotenv.config(); 

const DETECT_LANGUAGE_URL = 'https://papago.apigw.ntruss.com/langs/v1/dect';
const TRANSLATE_LANGUAGE_URL = 'https://papago.apigw.ntruss.com/nmt/v1/translation';
const CLIENT_ID = process.env.PAPAGO_KEY;
const CLIENT_SECRET = process.env.PAPAGO_SECRET;

//언어 감지
const detectLangs = () => {
    const payload = {
        query : '안녕하세요?'
    };

    HTTP.post(DETECT_LANGUAGE_URL)
        .send(payload) // 보낼 데이터
        .set('X-NCP-APIGW-API-KEY-ID', CLIENT_ID)
        .set('X-NCP-APIGW-API-KEY', CLIENT_SECRET)
        //error가 발생했을 때는 콜백 함수의 인수 중 error에 넣어줌
        //결과값은 result에 넣어줌
        .end((error, result)=> { //응답받은 결과값 취득했을 때 코드 작성 부분
            if (result.statusCode === 200){
                //응답 결과 값이 200, OK 경우
                const resultData = result.body;
                console.log(resultData);
            } else{
                console.error(error);
            }

        })
}

//detectLangs();

//번역 요청
const translateLangs = () =>{
    const payload = {
        source : "auto",
        target : "en",
        text : '안녕하세요?'
    };

    HTTP.post(TRANSLATE_LANGUAGE_URL)
        .send(payload)
        .set('X-NCP-APIGW-API-KEY-ID', CLIENT_ID)
        .set('X-NCP-APIGW-API-KEY', CLIENT_SECRET)
        .end((error, result)=> { //응답받은 결과값 취득했을 때 코드 작성 부분
            if (result.statusCode === 200){
                //응답 결과 값이 200, OK 경우
                const resultData = result.body;
                console.log(resultData);
            } else{
                console.error(error);
            }

        })
}

//translateLangs();