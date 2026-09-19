// 관리자 로그인 판정(guard-core.ts) — 옛 토큰·해제·만료·DB 장애 × basic/pii 갈래.
import { test } from "node:test";
import assert from "node:assert/strict";
import { decideSession, LOGIN_REASON_LABEL, isLoginReason } from "../../src/lib/admin/guard-core.ts";

const NOW = Date.parse("2026-09-19T12:00:00+09:00");
const SID = "11111111-2222-4333-8444-555555555555";
const LIVE = { revokedAt: null, expiresAt: "2026-10-19T12:00:00+09:00" };

test("토큰이 없으면 no-session", () => {
  for (const scope of ["basic", "pii"]) {
    assert.deepEqual(decideSession({ token: null, db: "skipped", scope, now: NOW }), { allow: false, reason: "no-session" });
  }
});

test("옛 토큰(sid 없음): basic 은 통과(확인 안 함), pii 는 다시 로그인", () => {
  assert.deepEqual(decideSession({ token: { sid: null }, db: "skipped", scope: "basic", now: NOW }), { allow: true, checked: false });
  assert.deepEqual(decideSession({ token: { sid: null }, db: "skipped", scope: "pii", now: NOW }), {
    allow: false,
    reason: "relogin-required",
  });
});

test("살아 있는 기기는 두 등급 모두 통과(확인함)", () => {
  for (const scope of ["basic", "pii"]) {
    assert.deepEqual(decideSession({ token: { sid: SID }, db: LIVE, scope, now: NOW }), { allow: true, checked: true });
  }
});

test("모르는 sid(행 없음)는 해제로 본다 — basic 도 막는다", () => {
  for (const scope of ["basic", "pii"]) {
    assert.deepEqual(decideSession({ token: { sid: SID }, db: null, scope, now: NOW }), { allow: false, reason: "revoked" });
  }
});

test("해제된 기기는 막는다", () => {
  const db = { revokedAt: "2026-09-18T00:00:00Z", expiresAt: LIVE.expiresAt };
  assert.deepEqual(decideSession({ token: { sid: SID }, db, scope: "basic", now: NOW }), { allow: false, reason: "revoked" });
});

test("만료된 기기는 막는다(경계 = 만료 시각과 같으면 만료)", () => {
  const db = { revokedAt: null, expiresAt: new Date(NOW).toISOString() };
  assert.deepEqual(decideSession({ token: { sid: SID }, db, scope: "basic", now: NOW }), { allow: false, reason: "expired" });
  const bad = { revokedAt: null, expiresAt: "not-a-date" };
  assert.deepEqual(decideSession({ token: { sid: SID }, db: bad, scope: "basic", now: NOW }), { allow: false, reason: "expired" });
});

test("DB 확인 실패: basic 은 열고(급한 화면), pii 는 닫는다", () => {
  assert.deepEqual(decideSession({ token: { sid: SID }, db: "error", scope: "basic", now: NOW }), { allow: true, checked: false });
  assert.deepEqual(decideSession({ token: { sid: SID }, db: "error", scope: "pii", now: NOW }), {
    allow: false,
    reason: "session-check-failed",
  });
});

test("sid 가 있는데 skipped 면 확인 실패와 같게(닫힌 쪽)", () => {
  assert.deepEqual(decideSession({ token: { sid: SID }, db: "skipped", scope: "pii", now: NOW }), {
    allow: false,
    reason: "session-check-failed",
  });
});

test("로그인 화면 문구 4종 · 이유 판별", () => {
  assert.deepEqual(Object.keys(LOGIN_REASON_LABEL).sort(), ["expired", "relogin-required", "revoked", "session-check-failed"]);
  assert.equal(isLoginReason("revoked"), true);
  assert.equal(isLoginReason("no-session"), false);
  assert.equal(isLoginReason("<script>"), false);
});

// ── F3: 「이 기기 말고 모두 로그아웃」 시각(sessions_invalid_before)은 sid 없는 쿠키만 끊는다 ──
const CUTOFF = Date.parse("2026-09-19T11:00:00+09:00");

test("sid 없는 쿠키가 모두 로그아웃 시각보다 먼저 발급됐으면 해제 — basic 도 막는다", () => {
  const token = { sid: null, issuedAt: CUTOFF - 60_000 };
  for (const scope of ["basic", "pii"]) {
    assert.deepEqual(decideSession({ token, db: "skipped", scope, now: NOW, sidlessCutoffMs: CUTOFF }), {
      allow: false,
      reason: "revoked",
    });
  }
});

test("sid 없는 쿠키가 모두 로그아웃 뒤에 발급됐으면 예전 규칙(basic 통과·pii 다시 로그인)", () => {
  const token = { sid: null, issuedAt: CUTOFF + 60_000 };
  assert.deepEqual(decideSession({ token, db: "skipped", scope: "basic", now: NOW, sidlessCutoffMs: CUTOFF }), {
    allow: true,
    checked: false,
  });
  assert.deepEqual(decideSession({ token, db: "skipped", scope: "pii", now: NOW, sidlessCutoffMs: CUTOFF }), {
    allow: false,
    reason: "relogin-required",
  });
  // 경계: 같은 ms 에 발급된 쿠키는 살린다(「보다 먼저」만 끊는다)
  assert.deepEqual(
    decideSession({ token: { sid: null, issuedAt: CUTOFF }, db: "skipped", scope: "basic", now: NOW, sidlessCutoffMs: CUTOFF }),
    { allow: true, checked: false },
  );
});

test("시각을 못 읽으면(null) sid 없는 쿠키도 basic 은 연다 — DB 장애 중 「전부 내리기」 보장", () => {
  const token = { sid: null, issuedAt: CUTOFF - 60_000 };
  assert.deepEqual(decideSession({ token, db: "skipped", scope: "basic", now: NOW, sidlessCutoffMs: null }), {
    allow: true,
    checked: false,
  });
  assert.deepEqual(decideSession({ token, db: "skipped", scope: "basic", now: NOW }), { allow: true, checked: false });
  assert.deepEqual(
    decideSession({ token, db: "skipped", scope: "basic", now: NOW, sidlessCutoffMs: Number.NaN }),
    { allow: true, checked: false },
  );
});

test("issuedAt 이 없는 sid 없는 쿠키는 아주 옛날 발급으로 본다(시각이 있으면 끊긴다)", () => {
  assert.deepEqual(decideSession({ token: { sid: null }, db: "skipped", scope: "basic", now: NOW, sidlessCutoffMs: CUTOFF }), {
    allow: false,
    reason: "revoked",
  });
});

test("sid 있는 쿠키는 모두 로그아웃 시각을 보지 않는다 — 누른 기기 자신은 계속 쓴다", () => {
  const token = { sid: SID, issuedAt: CUTOFF - 3_600_000 };
  for (const scope of ["basic", "pii"]) {
    assert.deepEqual(decideSession({ token, db: LIVE, scope, now: NOW, sidlessCutoffMs: CUTOFF }), { allow: true, checked: true });
  }
  // 행이 해제됐으면 여전히 해제(행 단위 판정이 그대로)
  assert.deepEqual(
    decideSession({ token, db: { revokedAt: "2026-09-19T11:00:00+09:00", expiresAt: LIVE.expiresAt }, scope: "basic", now: NOW, sidlessCutoffMs: CUTOFF }),
    { allow: false, reason: "revoked" },
  );
});

// ── F6: 비밀번호 틀림은 첫 번째와 잠기는 번째만 기록 ──
import { loginFailLogDetail } from "../../src/lib/admin/guard-core.ts";

test("비밀번호 틀림 기록: 1회째·5회째만, 나머지는 안 남긴다", () => {
  assert.equal(loginFailLogDetail(1, 5), "1회째");
  assert.equal(loginFailLogDetail(2, 5), null);
  assert.equal(loginFailLogDetail(3, 5), null);
  assert.equal(loginFailLogDetail(4, 5), null);
  assert.equal(loginFailLogDetail(5, 5), "5회째 — 5분 잠김");
  assert.equal(loginFailLogDetail(6, 5), null);
  assert.equal(loginFailLogDetail(0, 5), null);
  assert.equal(loginFailLogDetail(Number.NaN, 5), null);
  // 한도가 1이면 첫 번째가 곧 잠기는 번째 — 잠김 문구가 이긴다
  assert.equal(loginFailLogDetail(1, 1), "1회째 — 5분 잠김");
});
