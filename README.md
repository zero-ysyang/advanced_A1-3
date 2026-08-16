## 1. 서비스 소개 및 기획서

- **서비스명** : 방구석PT (AI 홈트 루틴 추천)
  
- **서비스URL** : https://advanced-a1-3-u79j.vercel.app
  > 헬스장 갈 시간이 없다면?  
  > AI가 당신의 체력과 목표에 맞춰 홈트 루틴을 추천해드려요.
- **서비스 목적** : 체력·목표 기반 AI 홈트 루틴 추천
- **타겟 사용자** : 헬스장 갈 시간이 없는 직장인
- **페이지/섹션 구성** : 홈 / 서비스 소개 / AI 운동 추천 / 운동 가이드 / FAQ
- **핵심 기능** : AI 운동 루틴 추천받기  
- **AI 기능 설계**

| 구분 | 내용 |
| --- | --- |
| **입력** | - 운동 목표 선택 : 다이어트, 근력 향상, 기초체력<br>- 운동 수준 선택 : 초보자, 중급자, 숙련자<br>- 하루 가능 시간(분) : (사용자 입력) |
| **출력** | - 추천 운동 루틴 + 자세 주의사항 |
| **실패 처리** | - 빈 입력 → “목표와 수준을 선택하세요”<br>- 오류 → “잠시 후 다시 시도하세요” |
  
<br>

## 2-1. 기술 스택

| 구분 | 내용 |
| --- | --- |
| **프론트** | HTML/CSS/JS |
| **백엔드** | Python (Vercel Serverless Functions) |
| **AI API** | Google Gemini 3.5 Flash |
| **배포** | Vercel |

<br>

## 2-2. 실행/배포 방법
### 가. 실행 방법(Python 내장 웹 서버)
> 프로젝트 루트 디렉토리로 이동 후  
``` 
python -m http.server 8000
```
> 브라우저에서 아래 주소 접속
```
http://localhost:8000
```

### 나. 배포 방법(Vercel)
1) Vercel(https://vercel.com) 로그인
2) 대시보드 우측 상단의 [Add New] > [Project] 클릭
3) 본인의 Git Repository를 찾아 [Import] 선택
4) [Deploy] 버튼 클릭  

### ※ Vercel 환경 변수(키) 설정
- Vercel 대시보드 ➔ [Settings] ➔ [Environments] ➔ [Environment Variables]에서 Key-Value설정 (GEMINI_API_KEY)

<br>


## 3-1. AI 코딩 도구 사용 과정

## 3-2. 서비스 스크린샷(데스크톱 + 모바일 + AI 기능 동작 장면)

### 가. 데스크톱


### 나. 모바일
<img width="200" height="389" alt="3" src="https://github.com/user-attachments/assets/cea4d057-b5d0-4937-b0d9-9007bf10aa5d" />&nbsp;&nbsp;&nbsp;&nbsp;
<img width="200" height="389" alt="2" src="https://github.com/user-attachments/assets/ed16854f-e827-49f1-b7e9-734000218cc7" />&nbsp;&nbsp;&nbsp;&nbsp;
<img width="200" height="389" alt="1" src="https://github.com/user-attachments/assets/1f950dc1-93c3-4e48-a848-e14f1ec9a4d8" />

