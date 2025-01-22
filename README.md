# Square Box

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2joDR%2FbtsJF4DOrSN%2FOM0Dly7fp62hkpj1lbS3MK%2Fimg.png" width="600px" /></p>

</br></br>

## 프로젝트 소개

이 애플리케이션은 사용자가 검색어를 입력해 검색을 하게 되면 해당 키워드에 대한 뉴스 기사, 유튜브 동영상 데이터를 검색해서 사용자에게 제공하는 서비스입니다.
검색한 뉴스 기사의 메인 이미지, 본문 기사를 애플리케이션 내에서 바로 확인할 수 있고 검색된 유튜브 동영상의 재생도 가능합니다.
회원 가입 및 로그인이 가능하며, 사용자의 계정에 데이터를 북마크하여 저장해둘 수 있고 북마크한 데이터만 따로 볼 수도 있습니다.

</br></br>

## 개발 목적

평소에 사회적 이슈나 토픽, 관심사에 대한 정보를 찾아보기 위해 웹서칭을 할 때,
여기저기 접속해서 반복해서 검색을 하면서 데이터를 얻어야 하는 점과 보관하고 싶은 데이터를 별도로 보관하기가 불편했던 경험을 개선해 일상 생활에서 편리하게 검색하고 데이터를 저장해두기 위한 웹 애플리케이션을 개발했습니다.

</br></br>

## 개발 기간 / 인원

24.04.25 ~ 24.07 약 3개월 (이후 버그 수정 및 유지 보수 중) / 1명 (정병호)

</br></br>

## 배포 주소

https://square-box.vercel.app/

</br></br>

## 사용한 기술

#### Front-end

- JavaScript (ES6+)
- TypeScript
- React
- Redux-toolkit
- SCSS

</br>

#### Back-end

- Node.js
- Express
- Mongoose
- MongoDB

</br>

#### Config

- yarn

</br>

#### Deployment

- Vercel
- Cloudtype

</br></br></br></br>

## 주요 페이지 구성 및 기능

### 홈

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F2joDR%2FbtsJF4DOrSN%2FOM0Dly7fp62hkpj1lbS3MK%2Fimg.png" width="600px" /></p>

</br>

- 실시간 검색어 상위권 10 순위 데이터를 제공합니다.
- 실시간 검색어의 랭크 상승, 하락, 유지, 신규 등의 상태가 표시됩니다.
- 실시간 검색어 API 의 데이터 업데이트 주기는 10분이며, 클라이언트에서는 1분 간격으로 업데이트를 확인합니다. </br>
  (로딩 게이지 UI)
- 실시간 검색어를 클릭하면 해당 검색어에 대한 뉴스 또는 유튜브 데이터를 검색할 수 있고 해당 페이지로 이동합니다.

</br>

### 뉴스

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FXnTwE%2FbtsJE9ZUPBk%2FZ9yaTy4UN3VyeIrIvjCE4K%2Fimg.png" width="600px" /></p>

</br>

- 검색한 뉴스 기사들을 볼 수 있습니다.
- 우측 Articles 에 검색된 뉴스 기사가 최대 10개 까지 로드 됩니다.
- 검색된 뉴스 기사 항목에 마우스 커서를 올리면 좌측 Preview 에 바로 보여집니다.
- Preview 에서는 기사의 메인 이미지, 타이틀, 발행일, 기사 원문 링크, 기사 본문을 확인할 수 있습니다.
- Preview 에서 북마크 버튼을 클릭하여 해당 기사를 사용자 계정의 북마크 페이지에 저장할 수 있습니다. </br>
  (동일 데이터 중복 추가 불가, 북마크는 최대 10개 까지 가능)

</br>

### 유튜브

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcEgiOp%2FbtsJFq8kBwX%2FkdWD2IrqpxjsYUKXXEB2bK%2Fimg.png" width="600px" /></p>

</br>

- 검색한 유튜브 동영상들을 볼 수 있습니다.
- 우측 Videos 에 검색된 유튜브 동영상들이 로드 됩니다.
- 검색된 유튜브 동영상 항목에 마우스 커서를 올리면 좌측 Player 에 바로 보여집니다.
- Player 에서 북마크 버튼을 클릭하여 해당 동영상을 사용자 계정의 북마크 페이지에 저장할 수 있습니다. </br>
  (동일 데이터 중복 추가 불가, 북마크는 최대 10개 까지 가능)

</br>

### 북마크

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbRQYzW%2FbtsJEjCaO7Y%2FSclMkzup1WuyEgiRnaiIR0%2Fimg.png" width="600px" /></p>

</br>

- 북마크 페이지는 북마크한 유튜브, 뉴스 데이터를 각각 분류하여 보여줍니다. </br>
  (우측 Contents 의 우측 상단에 전환 버튼)
- 북마크 삭제는 우측 Contents 의 데이터 항목들마다 삭제 버튼이 있고, 좌측 View 에서도 삭제 버튼으로 삭제 가능합니다.

</br></br></br>

## 그외 기능

### 회원 가입 및 로그인

- 회원 가입 시에는 입력한 ID, PW 의 유효성 검사 및 DB 조회를 통한 ID 중복 검사를 거쳐 가입 승인 처리를 합니다.
- 로그인 시에는 DB 조회를 통해 ID, PW 를 확인하고 로그인 승인과 동시에 JWT 발급을 합니다.
- 페이지 재방문 시, JWT 검증을 통해 자동 로그인 처리를 합니다. </br>
  (승인 실패 -> 로그인 페이지로 리디렉션)
- 로그 아웃을 하면 JWT 는 삭제 처리됩니다.

</br></br>

### 다크 모드

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fphce1%2FbtsJGkGvN4S%2FJNqhcNHmflk6fsC7kukZB0%2Fimg.png" width="600px" /></p>

</br>

(라이트 테마를 적용한 모습)

</br>

- 로컬 스토리지를 사용하여 브라우저 종료 후 재접속 시에도 사용자가 마지막에 설정한 테마로 자동 적용합니다.

</br></br>

### 반응형 웹

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbY8NUg%2FbtsJGmEj27q%2FjUosjbEaGHATewqtnp4xyK%2Fimg.png" width="300px" /></p>

<p align="center">태블릿 세로모드 뷰</p>

</br>

<p align="center"><img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FT6lCa%2FbtsJEFd822O%2F3HmgtgtOhq3UXkiaS2wt51%2Fimg.png" width="200px" /></p>

</br>

<p align="center">모바일 세로모드 뷰</p>

</br>

- 여러 사이즈의 뷰포트에 반응하여 최적화된 UI 를 제공합니다.

</br></br>

### PWA

- 브라우저로부터 App 처럼 데스크탑에 설치하여 브라우저 외부에서 stand alone 으로 실행할 수 있습니다.

</br></br></br>

## 현재 개선 중인 내용

### 모바일 웹 브라우저에서의 로그인 문제

현재 데스크 탑 웹 브라우저에서는 로그인 및 모든 기능이 정상 동작 하지만 모바일 기기의 웹 브라우저 앱에서는 로그인을 시도할 때, 서버로부터 응답을 전혀 받지 못하는 문제가 발생 중.
</br></br>
로그인은 성공하지만, JWT 를 받아오지 못하여 Home 페이지로 이동했다가 토큰이 없기 때문에 즉시 로그인 페이지로 리디렉션됨. 원인을 찾는 중.

</br></br>

### 배포 후 서버로부터 응답 속도 저하

서버에서 외부 API 에 요청하여 받은 뉴스, 유튜브 데이터를 클라이언트로 응답하는 속도가 개발 환경과 배포 환경에서 많은 차이가 발생.

- 개발 환경: 5초 내외
- 배포 환경: 20초 내외

</br>
서버를 배포한 서비스를 유료 모델로 전환해 리소스를 어느 정도 추가해도 큰 차이가 없어 정확한 원인을 찾는 중. 더 많은 리소스를 할당하거나 서버의 코드에 추가적인 최적화를 시도해야할 것으로 보임.
