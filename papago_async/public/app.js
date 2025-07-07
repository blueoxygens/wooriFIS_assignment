/**
 * source~: 번역할 텍스트, 번역할 언어의 타입(ko, ja..)
 * target~: 번역된 결과 텍스트, 번역될 언어의 타입(ko, ja..)
 */

// 배열 디스트럭처링 활용
const [sourceSelect, targetSelect] 
    = document.getElementsByTagName('select');

const [sourceTextArea, targetTextArea] 
    = document.getElementsByTagName('textarea');

// 1. ㅇ -> input 이벤트 발생 - 생성된 타이머 초기화
// 2. 아 -> input 이벤트 발생 - 생성된 타이머 초기화
// 3. 안 -> input 이벤트 발생 - 마지막으로 타이핑한 후 2초 경과된 타이머는 그대로 동작하도록
let timerId;
sourceTextArea.addEventListener('input', event => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout(() => {
        console.log(event.target.value);
    }, 2000);
});