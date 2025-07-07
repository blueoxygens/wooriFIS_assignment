const [sourceSelect, targetSelect] = document.getElementsByTagName('select');
const [sourceTextArea, targetTextArea] = document.getElementsByTagName('textarea');

// 번역될 언어의 타입 변경 이벤트
// English면 en, 한국어면 ko
let targetLanguage = 'en'; // 번역하고 싶은 언어의 타입, 초기값은 en(English)
targetSelect.addEventListener('change', (event) => targetLanguage = event.target.value);

let timer;
sourceTextArea.addEventListener('input', (event) => {
    if (timer) clearTimeout(timer);
    
    timer = setTimeout(() => {
        const text = event.target.value;

        /*
        //1. XMLHttpRequest를 직접 생성한 promise로 변경하기
        const get = (url, method, payload) => {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.onload =() => {
                    if (xhr.status === 200){
                    resolve(JSON.parse(xhr.response));
                } else{
                    reject(xhr.status + xhr.response);
                }
                };
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(payload);
            })
        }

        const payload = {
            query : text
        }
        const stringified_payload = JSON.stringify(payload)
        get('/detect', 'POST', stringified_payload)
            .then(lang => { 
                const payload2 =
                    JSON.stringify({
                     source: lang.langCode,
                     target: targetLanguage,
                     text, // text: text와 같다.
                 })
                sourceSelect.value = lang.langCode;
                return get('/translate', 'POST', payload2)
            })
            .then(translated =>{
                targetTextArea.value = translated.translatedText;
            })
            .catch(error => {
                console.error(error);
            });*/


           //2. fetch로 변경 + async/await 적용

    const get = async (url, method, payload) => {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), 
    }).then(res => res.json());
};
    const translateText = async () => {
        try {
        // 언어 감지
        const lang = await get('/detect', "POST", { query: text });
        sourceSelect.value = lang.langCode;

        // 번역 요청
        const payload2 = {
            source: lang.langCode,
            target: targetLanguage,
            text: text,
        };
        const translated = await get('/translate', 'POST', payload2);
        targetTextArea.value = translated.translatedText;
    } catch (error) {
        console.error("Translation failed:", error);
    }
};
translateText();
            },2000);
});