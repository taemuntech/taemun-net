// 관리대장(문의 상태·다음 할 일·설정·기기) 쓰기 요청의 **입력 검사** — 순수 모듈.
//
// 왜 따로 두나: 같은 규칙을 화면(칩·날짜 입력)과 API 가 같이 써야 한다. 화면은 서버 모듈을 import 할 수 없고,
// 서버는 화면 값을 믿으면 안 된다. 그래서 런타임 import 가 **하나도 없는** 파일에 모아
// 클라이언트·서버·`node --test`(scripts/tests/admin-crm-input.test.mjs) 가 같은 코드를 부른다.
//
// 상태 값은 inquiries.ts 의 INQUIRY_STATUSES 와 **같은 목록을 여기에 한 번 더** 적는다 — inquiries.ts 는
// supabase-js 를 import 하는 서버 모듈이라 여기서 끌어오면 순수성이 깨진다. 데이터베이스 체크 제약
// (inquiries_status_chk)이 최종 정본이라 둘이 어긋나면 저장이 22023/23514 로 시끄럽게 실패한다.

export const INQUIRY_STATUS_VALUES = ["pending", "contacted", "quoted", "contracted", "closed"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUS_VALUES)[number];

export function isInquiryStatusValue(v: unknown): v is InquiryStatus {
  return typeof v === "string" && (INQUIRY_STATUS_VALUES as readonly string[]).includes(v);
}

/** 종료 사유 — 표의 inquiries_closed_reason_chk 와 같은 목록 */
export const CLOSED_REASONS = ["price", "timing", "no_response", "not_fit", "completed"] as const;
export type ClosedReason = (typeof CLOSED_REASONS)[number];

export const CLOSED_REASON_LABEL: Record<ClosedReason, string> = {
  price: "가격",
  timing: "시기",
  no_response: "무응답",
  not_fit: "안 맞음·기타",
  completed: "진행 완료",
};

export function isClosedReason(v: unknown): v is ClosedReason {
  return typeof v === "string" && (CLOSED_REASONS as readonly string[]).includes(v);
}

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(v: unknown): v is string {
  return typeof v === "string" && UUID_RE.test(v);
}

export const TRANSITION_NOTE_MAX = 300;
export const NEXT_ACTION_MAX = 200;
/** 다음 할 일 날짜로 받는 범위 — 오늘 기준 1년 전 ~ 2년 뒤. 연도 오타(2062 등)를 막는다 */
export const NEXT_ACTION_DUE_PAST_DAYS = 365;
export const NEXT_ACTION_DUE_FUTURE_DAYS = 730;

type Fail = { ok: false; error: string };

function asObject(body: unknown): Record<string, unknown> | null {
  return typeof body === "object" && body !== null && !Array.isArray(body) ? (body as Record<string, unknown>) : null;
}

// ── 상태 바꾸기 ──────────────────────────────────────────────────────

export type TransitionInput = {
  ok: true;
  id: string;
  to: InquiryStatus;
  closedReason: ClosedReason | null;
  note: string | null;
};

/** POST /api/admin/inquiries { id, status, closedReason?, note? } */
export function parseTransitionBody(body: unknown): TransitionInput | Fail {
  const b = asObject(body);
  if (!b) return { ok: false, error: "요청 형식이 올바르지 않습니다." };
  if (!isUuid(b.id)) return { ok: false, error: "문의 id 가 올바르지 않습니다." };
  if (!isInquiryStatusValue(b.status)) {
    return { ok: false, error: `status 는 ${INQUIRY_STATUS_VALUES.join(" | ")} 중 하나여야 합니다.` };
  }
  let note: string | null = null;
  if (b.note !== undefined && b.note !== null) {
    if (typeof b.note !== "string") return { ok: false, error: "note 는 문자열이어야 합니다." };
    const trimmed = b.note.trim();
    if (trimmed.length > TRANSITION_NOTE_MAX) {
      return { ok: false, error: `메모는 ${TRANSITION_NOTE_MAX}자 이하여야 합니다.` };
    }
    note = trimmed || null;
  }
  let closedReason: ClosedReason | null = null;
  if (b.status === "closed") {
    if (!isClosedReason(b.closedReason)) return { ok: false, error: "종료 사유를 골라 주세요." };
    closedReason = b.closedReason;
  }
  return { ok: true, id: b.id.toLowerCase(), to: b.status, closedReason, note };
}

// ── 다음 할 일 ───────────────────────────────────────────────────────

const YMD_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** 「2026-02-30」 같은 없는 날짜를 거른다 — UTC 로 만들어 되읽어 같은지 본다(로컬 시간대 무관) */
export function isRealYmd(v: string): boolean {
  const m = YMD_RE.exec(v);
  if (!m) return false;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const t = new Date(Date.UTC(y, mo - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === mo - 1 && t.getUTCDate() === d;
}

function ymdToUtcDays(v: string): number {
  const m = YMD_RE.exec(v);
  if (!m) return Number.NaN;
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])) / 86_400_000;
}

export type NextActionInput = { ok: true; id: string; text: string | null; due: string | null };

/**
 * POST /api/admin/inquiries/next-action { id, text, due }.
 * - text: 앞뒤 공백을 떼고, 줄바꿈은 한 칸 띄어쓰기로 편다(한 줄짜리 할 일). 비면 null. 200자 초과는 거절.
 * - due: 「YYYY-MM-DD」 실제 달력 날짜, 오늘(KST) −365일 ~ +730일. 비면 null.
 * - text 없이 날짜만 있는 것도 받는다(「그날 다시 보기」 알림).
 */
export function parseNextActionBody(body: unknown, todayKst: string): NextActionInput | Fail {
  const b = asObject(body);
  if (!b) return { ok: false, error: "요청 형식이 올바르지 않습니다." };
  if (!isUuid(b.id)) return { ok: false, error: "문의 id 가 올바르지 않습니다." };

  let text: string | null = null;
  if (b.text !== undefined && b.text !== null) {
    if (typeof b.text !== "string") return { ok: false, error: "할 일은 문자열이어야 합니다." };
    const flat = b.text.replace(/[\r\n\t]+/g, " ").trim();
    if (flat.length > NEXT_ACTION_MAX) return { ok: false, error: `할 일은 ${NEXT_ACTION_MAX}자 이하여야 합니다.` };
    text = flat || null;
  }

  let due: string | null = null;
  if (b.due !== undefined && b.due !== null && b.due !== "") {
    if (typeof b.due !== "string" || !isRealYmd(b.due)) {
      return { ok: false, error: "날짜는 YYYY-MM-DD 형식의 실제 날짜여야 합니다." };
    }
    const today = ymdToUtcDays(todayKst);
    const target = ymdToUtcDays(b.due);
    if (!Number.isFinite(today)) return { ok: false, error: "오늘 날짜를 알 수 없습니다." };
    if (target < today - NEXT_ACTION_DUE_PAST_DAYS || target > today + NEXT_ACTION_DUE_FUTURE_DAYS) {
      return { ok: false, error: "날짜가 너무 멀리 있습니다. 1년 전부터 2년 뒤까지만 받습니다." };
    }
    due = b.due;
  }
  return { ok: true, id: b.id.toLowerCase(), text, due };
}

// ── 설정 ────────────────────────────────────────────────────────────

export const PURGE_MODES = ["dry_run", "live"] as const;
export type PurgeMode = (typeof PURGE_MODES)[number];

export function isPurgeMode(v: unknown): v is PurgeMode {
  return v === "dry_run" || v === "live";
}

export type SettingsInput = { ok: true; key: "purge_mode"; value: PurgeMode };

/** POST /api/admin/settings { key: "purge_mode", value: "dry_run" | "live" } — 지금 바꿀 수 있는 설정은 이것 하나 */
export function parseSettingsBody(body: unknown): SettingsInput | Fail {
  const b = asObject(body);
  if (!b) return { ok: false, error: "요청 형식이 올바르지 않습니다." };
  if (b.key !== "purge_mode") return { ok: false, error: "바꿀 수 없는 설정입니다." };
  if (!isPurgeMode(b.value)) return { ok: false, error: "value 는 dry_run 또는 live 여야 합니다." };
  return { ok: true, key: "purge_mode", value: b.value };
}

// ── 로그인한 기기 ────────────────────────────────────────────────────

export type SessionsInput = { ok: true; action: "revoke"; id: string } | { ok: true; action: "revoke_others" };

/** POST /api/admin/sessions { action: "revoke", id } | { action: "revoke_others" } */
export function parseSessionsBody(body: unknown): SessionsInput | Fail {
  const b = asObject(body);
  if (!b) return { ok: false, error: "요청 형식이 올바르지 않습니다." };
  if (b.action === "revoke") {
    if (!isUuid(b.id)) return { ok: false, error: "기기 id 가 올바르지 않습니다." };
    return { ok: true, action: "revoke", id: b.id.toLowerCase() };
  }
  if (b.action === "revoke_others") return { ok: true, action: "revoke_others" };
  return { ok: false, error: "action 은 revoke 또는 revoke_others 여야 합니다." };
}
