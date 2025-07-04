const express = require('express');
//node_modules/express/폴더 내 코드를 import
// 여기서 express 관련 코드를 써야하기 때문에

const app = express(); // app -> express를 통해 서버를 구성할 때 설정할 헬퍼 객체
const port = 3000;

const rootHandler = (req, res) => {
  res.send('Hello World!')
}

//어딘가에서 localhost:3000'/'라는 경로로 요청 이벤트가 발생하면 rootHandler함수가 동작
app.get('/', rootHandler);

app.listen(port, () => {
  console.log(`${port}번 포트에서 실행 중`);
})