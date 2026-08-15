// ===== 모바일 메뉴 토글 =====
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => navMenu.classList.toggle("show"));

// 메뉴 클릭 시 자동 닫힘 (모바일 UX)
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navMenu.classList.remove("show"));
});

// ===== AI 폼 처리 =====
const form = document.getElementById("aiForm");
const resultBox = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // 폼 기본 제출(새로고침) 방지

  // 1) 입력값 가져오기
  const goal = document.getElementById("goal").value;
  const level = document.getElementById("level").value;
  const time = document.getElementById("time").value;

  // 2) 빈 입력 검증
  if (!goal || !level || !time) {
    showError("목표와 수준을 선택하세요.");
    return;
  }
  if (Number(time) < 5) {
    showError("운동 시간은 최소 5분 이상 입력하세요.");
    return;
  }

  // 3) 로딩 표시 + 버튼 비활성화(중복 제출 방지)
  showLoading();
  submitBtn.disabled = true;

  // 4) 타임아웃 처리 (AbortController 사용, 30초)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goal, level, time }),
      signal: controller.signal, // 타임아웃 연결
    });

    clearTimeout(timeoutId); // 응답 왔으면 타이머 해제

    // 5) API 오류(4xx/5xx) 처리
    if (!response.ok) {
      throw new Error("서버 오류");
    }

    const data = await response.json();

    // 6) 결과 출력
    showResult(data.result);

  } catch (err) {
    // 7) 타임아웃 vs 일반 오류 구분
    if (err.name === "AbortError") {
      showError("응답이 지연되고 있어요. 잠시 후 다시 시도하세요.");
    } else {
      showError("잠시 후 다시 시도하세요.");
    }
  } finally {
    submitBtn.disabled = false; // 버튼 항상 복구
  }
});

// ===== 화면 표시 헬퍼 함수 =====
function showLoading() {
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `<p class="loading">🤖 AI가 루틴을 만드는 중...</p>`;
}

function showError(message) {
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `<p class="error">⚠️ ${message}</p>`;
}

function showResult(text) {
  resultBox.classList.remove("hidden");
  resultBox.innerHTML = `<h3>📋 추천 루틴</h3><div>${text}</div>`;
}
