// 견적 흐름 퍼널 계측 — 이벤트 이름 목록과 서버 검증. 화면(track.ts)과 서버(api/inquiry/event)가 같이 본다.
//
// **개인정보를 싣지 않는다.** 이름·연락처·입력값·IP 는 받지 않는다(표에 그런 칸이 없다 — 마이그레이션 20260919090000).
// sid 는 브라우저 탭마다 만드는 난수(sessionStorage)라 사람을 특정하지 않는다.
// 이벤트를 늘리면 개인정보 처리방침 7항의 설명과 맞는지 같이 본다.
// ⚠️ 외부 import 를 두지 않는다 — node 로 바로 시험한다.

export const INQUIRY_EVENTS = [
  "preview_open", // 홈 미리보기 모달을 열었다
  "wizard_open", // 1단계가 보였다
  "flow_expand", // 「진행 방식 보기」를 펼쳤다
  "panel_open", // 모바일에서 「내 요청서」를 열었다
  "call_click", // 전화 버튼
  "text_first_click", // 통화 시간 밖 「문자로 먼저 남기기」
  "quick_exit", // 「나머지는 통화로 정할게요 — 연락처만 남기기」
  "step_view",
  "step_done",
  "review_edit", // 4단계에서 항목 「수정」
  "submit_ok",
  "submit_error",
  "abandon", // 닫기·페이지 떠남(제출 전)
  "draft_resume", // 작성하던 요청 이어 쓰기
  "contract_sample_open",
  "reference_usage_pick", // 「이 레퍼런스를 어떻게 쓰실 건가요」 — value 에 as_is/mood/feature
  "process_section_view", // 홈 「진행 방식」 섹션이 보였다
  "process_call_click",
] as const;
export type InquiryEventName = (typeof INQUIRY_EVENTS)[number];

export type InquiryEventRow = {
  sid: string;
  event: InquiryEventName;
  step: number | null;
  variant: string | null;
  entry: string | null;
  referral_from: string | null;
  value: string | null;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TOKEN_RE = /^[a-z0-9_]{1,40}$/;

function token(value: unknown, max: number): string | null {
  return typeof value === "string" && value.length <= max && TOKEN_RE.test(value) ? value : null;
}

/** 모양이 틀리면 null — 서버는 400 없이 조용히 버린다(계측 때문에 화면이 오류를 볼 일은 없게) */
export function parseInquiryEvent(raw: unknown): InquiryEventRow | null {
  if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.sid !== "string" || !UUID_RE.test(r.sid)) return null;
  if (typeof r.event !== "string" || !(INQUIRY_EVENTS as readonly string[]).includes(r.event)) return null;
  const step =
    typeof r.step === "number" && Number.isInteger(r.step) && r.step >= 0 && r.step <= 9 ? r.step : null;
  const from = typeof r.referralFrom === "string" && r.referralFrom.length <= 80 && SLUG_RE.test(r.referralFrom)
    ? r.referralFrom
    : null;
  return {
    sid: r.sid.toLowerCase(),
    event: r.event as InquiryEventName,
    step,
    variant: token(r.variant, 20),
    entry: token(r.entry, 20),
    referral_from: from,
    value: token(r.value, 40),
  };
}
