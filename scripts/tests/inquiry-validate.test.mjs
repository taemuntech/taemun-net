// 견적 접수 입력 검사(validate.ts) — 제어 문자·짝 없는 서로게이트는 저장 전에 400. 2026-09-20 가온, 오픈 점검 후속.
// 왜: U+0000 은 Postgres TEXT 가 거절한다(22P05). 전에는 이것이 「저장 실패」로 떨어져 보낸 사람이 쓴 글이 형 휴대폰으로
// LMS 로 나갔고, 저장이 안 되니 번호·시간 한도에도 안 잡혀 무한히 보낼 수 있었다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { validateInquiryBody } from "../../src/lib/inquiry/validate.ts";

const base = {
  services: ["웹사이트 제작"],
  budget: "미정",
  timeline: "일정 협의",
  clientName: "예시 고객",
  phone: "010-0000-0001",
  details: "첫 줄\n둘째 줄\t탭\r\n셋째 줄",
};

test("정상 입력은 통과 — 상세 내용의 줄바꿈·탭은 허용", () => {
  const r = validateInquiryBody(base);
  assert.equal(r.error, null);
  assert.ok(r.input);
  assert.equal(r.input.details, base.details);
});

test("성함에 U+0000 → 오류·input=null", () => {
  const r = validateInquiryBody({ ...base, clientName: "x\u0000" });
  assert.equal(r.input, null);
  assert.equal(r.bot, false);
  assert.match(r.error ?? "", /사용할 수 없는 문자/);
});

test("상세 내용에 U+0000 → 오류·input=null", () => {
  const r = validateInquiryBody({ ...base, details: "안녕하세요\u0000[저장 실패] 가짜 문자" });
  assert.equal(r.input, null);
  assert.match(r.error ?? "", /사용할 수 없는 문자/);
});

test("다른 칸(이메일·참고 주소·예산·일정·서비스)의 제어 문자·DEL·짝 없는 서로게이트도 막는다", () => {
  const cases = [
    { email: "a\u0001@b.co" },
    { referenceUrl: "https://example.com/\u001b" },
    { budget: "미정\u007f" },
    { timeline: "협의\u0008" },
    { services: ["웹\u000bsite"] },
    { details: "짝 없는 \ud800 서로게이트" },
    { clientName: "고객\udc00" },
  ];
  for (const c of cases) {
    const r = validateInquiryBody({ ...base, ...c });
    assert.equal(r.input, null, JSON.stringify(c));
    assert.match(r.error ?? "", /사용할 수 없는 문자/, JSON.stringify(c));
  }
});

test("짝이 맞는 서로게이트(이모지)는 통과", () => {
  const r = validateInquiryBody({ ...base, details: "좋아요 😀" });
  assert.equal(r.error, null);
  assert.ok(r.input);
});
