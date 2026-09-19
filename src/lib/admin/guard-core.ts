// 관리자 로그인 판정의 **순수한 부분** — 쿠키 토큰 + 데이터베이스 세션 행 → 들여보낼지 말지.
//
// 왜 따로 떼었나: 판정 규칙이 갈래가 많다(옛 토큰·해제된 기기·만료·DB 장애 × 일반/개인정보 화면).
// 이걸 next/headers 와 섞어 두면 시험을 못 한다. 여기에는 런타임 import 가 하나도 없어서
// `node --test` 가 이 .ts 파일을 그대로 불러 시험한다(scripts/tests/admin-guard-core.test.mjs).
//
// 두 등급:
// - basic — 작업물 공개 관리·「오늘」 화면. **급할 때 반드시 열려야 한다**(항의 전화 중 「전부 내리기」).
//   그래서 DB 가 죽었거나 옛 토큰(sid 없음)이어도 서명만 맞으면 들여보낸다.
// - pii — 고객 이름·연락처가 보이는 화면과 설정. 기기 해제가 **실제로 먹혀야** 하므로
//   세션 행을 확인하지 못하면 들여보내지 않는다(닫힌 쪽으로 실패).
//
// ⚠️ 모르는 sid(행이 없다)는 「해제됨」으로 본다 — 행을 지운 기기가 다시 살아나면 안 된다.
//
// sid 없는 쿠키(P1b 전에 받은 쿠키·기기 표 저장이 실패한 로그인)는 기기 표에 행이 없어서 한 대씩 끊을 수가 없다.
// 그래서 「이 기기 말고 모두 로그아웃」이 crm_settings.sessions_invalid_before 에 그 시각을 적고,
// **sid 없는 쿠키만** 그 시각보다 먼저 발급됐으면 해제로 본다(sidlessCutoffMs).
// - sid 있는 쿠키는 이 시각을 보지 않는다 — 그 기기들은 행 단위로 이미 끊겼고, 누른 기기 자신은 계속 써야 한다.
// - 이 시각을 못 읽으면(DB 장애) 부르는 쪽이 null 을 넘긴다 = 예전처럼 basic 은 연다. 급할 때 「전부 내리기」가 먼저다.

export type AdminScope = "basic" | "pii";

/** 세션 행을 찾아본 결과. "skipped" 는 sid 가 없어서 찾아보지 않은 경우에만 쓴다 */
export type SessionDbState = { revokedAt: string | null; expiresAt: string } | null | "error" | "skipped";

export type SessionDecision =
  | { allow: true; checked: boolean }
  | { allow: false; reason: "no-session" | "revoked" | "expired" | "relogin-required" | "session-check-failed" };

export type SessionDenyReason = Extract<SessionDecision, { allow: false }>["reason"];

/** 로그인 화면으로 돌려보낼 때 주소에 싣는 이유(no-session 은 이유 없이 보낸다) */
export type LoginReason = Exclude<SessionDenyReason, "no-session">;

export const LOGIN_REASONS: readonly LoginReason[] = ["revoked", "expired", "relogin-required", "session-check-failed"];

export function isLoginReason(v: unknown): v is LoginReason {
  return typeof v === "string" && (LOGIN_REASONS as readonly string[]).includes(v);
}

export function decideSession(input: {
  /** issuedAt(ms) 은 sid 없는 쿠키의 일괄 해제 판정에만 쓴다. 없으면 0(= 아주 옛날 발급)으로 본다 */
  token: { sid: string | null; issuedAt?: number } | null;
  db: SessionDbState;
  scope: AdminScope;
  now: number;
  /**
   * 「모두 로그아웃」 시각(ms) — sid 없는 쿠키 중 이보다 먼저 발급된 것은 해제로 본다.
   * null·생략 = 기록 없음 또는 읽지 못함(그때는 예전 규칙 그대로).
   */
  sidlessCutoffMs?: number | null;
}): SessionDecision {
  const { token, db, scope, now } = input;
  if (!token) return { allow: false, reason: "no-session" };

  // 옛 토큰(기기 추적 전 발급) — 급한 화면은 열어 주고, 개인정보 화면은 한 번 다시 로그인하게 한다
  if (token.sid === null) {
    const cutoff = input.sidlessCutoffMs;
    if (typeof cutoff === "number" && Number.isFinite(cutoff)) {
      const issued = typeof token.issuedAt === "number" && Number.isFinite(token.issuedAt) ? token.issuedAt : 0;
      if (issued < cutoff) return { allow: false, reason: "revoked" };
    }
    return scope === "basic" ? { allow: true, checked: false } : { allow: false, reason: "relogin-required" };
  }

  // sid 가 있는데 찾아보지 않았다("skipped")는 부르는 쪽 실수다 — 확인 실패와 같게 다룬다(닫힌 쪽)
  if (db === "error" || db === "skipped") {
    return scope === "basic" ? { allow: true, checked: false } : { allow: false, reason: "session-check-failed" };
  }

  if (db === null) return { allow: false, reason: "revoked" };
  if (db.revokedAt) return { allow: false, reason: "revoked" };
  const expires = Date.parse(db.expiresAt);
  // 날짜를 못 읽으면 만료로 본다(닫힌 쪽)
  if (!Number.isFinite(expires) || expires <= now) return { allow: false, reason: "expired" };
  return { allow: true, checked: true };
}

/** 로그인 화면 위에 띄우는 말 */
export const LOGIN_REASON_LABEL: Record<LoginReason, string> = {
  revoked: "이 기기의 로그인이 해제되었습니다. 다시 로그인해 주세요.",
  expired: "로그인 기간이 끝났습니다. 다시 로그인해 주세요.",
  "relogin-required": "보안 기능이 새로 붙었습니다. 한 번만 다시 로그인해 주세요.",
  "session-check-failed": "로그인 상태를 확인하지 못했습니다. 잠시 뒤 다시 시도해 주세요.",
};

/**
 * 비밀번호 틀림을 접속기록에 남길지 — 남기면 그 줄의 detail, 안 남기면 null.
 *
 * 왜 다 남기지 않나(2026-09-19 수정 F6): 로그인 주소는 누구나 부를 수 있다. 틀릴 때마다 3년 보관 줄을 쓰면
 * 스크립트 하나가 접속기록을 수만 줄로 채워, 형이 월 1회 훑어볼 진짜 조회·변경 줄을 묻어 버린다.
 * 그래서 한 IP 의 제한 창(5분) 안에서 **첫 번째**와 **잠기는 번째(maxFailures)** 만 남긴다.
 * 그 사이의 시도는 제한 창이 세고, 잠긴 뒤(429)는 비밀번호를 보지도 않으니 남길 것이 없다.
 */
export function loginFailLogDetail(countInWindow: number, maxFailures: number): string | null {
  if (!Number.isInteger(countInWindow) || countInWindow < 1) return null;
  if (countInWindow === maxFailures) return `${countInWindow}회째 — 5분 잠김`;
  if (countInWindow === 1) return "1회째";
  return null;
}
