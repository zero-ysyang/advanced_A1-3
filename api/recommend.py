from http.server import BaseHTTPRequestHandler
import json
import os
from google import genai


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 1) 요청 body 읽기
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length)
            data = json.loads(body)

            goal = data.get("goal", "").strip()
            level = data.get("level", "").strip()
            time = data.get("time", "").strip()

            # 2) 필수값 검증 (백엔드에서도 한 번 더!)
            if not goal or not level or not time:
                self._send_json(400, {"error": "목표와 수준을 선택하세요."})
                return

            # 3) Gemini API 키 설정 (환경변수에서 읽기)
            api_key = os.getenv("GEMINI_API_KEY")
            if not api_key:
                self._send_json(500, {"error": "API 키가 설정되지 않았습니다."})
                return

            genai.configure(api_key=api_key)
            model = genai.GenerativeModel("gemini-3.5-flash")

            # 4) 프롬프트 작성
            prompt = f"""
당신은 전문 홈트레이닝 코치입니다.
아래 조건에 맞는 홈트 운동 루틴을 추천해주세요.

- 운동 목표: {goal}
- 운동 수준: {level}
- 하루 가능 시간: {time}분

다음 형식으로 작성해주세요:
1. 추천 운동 루틴 (운동명, 세트/횟수, 시간 배분)
2. 자세 주의사항 (2~3가지)
3. 간단한 응원 메시지

맨몸 운동 위주로, 초보자도 이해하기 쉽게 설명해주세요.
"""

            # 5) Gemini 호출
            response = model.generate_content(prompt)
            result_text = response.text

            # 6) 결과 반환 (줄바꿈을 <br>로 변환하여 HTML 표시용)
            html_result = result_text.replace("\n", "<br>")
            self._send_json(200, {"result": html_result})

        except json.JSONDecodeError:
            self._send_json(400, {"error": "잘못된 요청 형식입니다."})
        except Exception as e:
            print("서버 오류:", str(e))  # Vercel 로그에 기록
            self._send_json(500, {"error": "잠시 후 다시 시도하세요."})

    # ===== JSON 응답 헬퍼 =====
    def _send_json(self, status_code, data):
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode("utf-8"))