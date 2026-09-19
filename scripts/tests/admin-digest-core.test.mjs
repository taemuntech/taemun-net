// 아침 문자 본문(digest-core.ts) — 숫자만 싣고, 이름·전화번호·할 일 글자·서비스 이름은 절대 싣지 않는다.
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildToday } from "../../src/lib/admin/today-core.ts";
import { buildDigestText, isMondayKst, parsePgTimestamp, purgeIsStale } from "../../src/lib/admin/digest-core.ts";

const NOW = new Date("2026-09-19T08:30:00+09:00");
const URL = "taemun.net/admin/today";

let seq = 0;
function row(over) {
  seq += 1;
  return {
    id: `00000000-0000-4000-8000-${String(seq).padStart(12, "0")}`,
    requestNo: `TM-260919-${String(seq).padStart(2, "0")}`,
    createdAt: "2026-09-10T09:00:00+09:00",
    status: "contacted",
    services: ["예시서비스알파"],
    nextAction: "예시고객1 010-0000-0001 에게 전화",
    nextActionDue: null,
    updatedAt: null,
    retainUntil: "2027-09-10T09:00:00+09:00",
    retentionBasis: "inquiry",
    purgedAt: null,
    ...over,
  };
}

const FORBIDDEN = [/예시고객/, /010-?0000/, /전화/, /예시서비스알파/, /TM-\d/];

function assertClean(text) {
  for (const re of FORBIDDEN) assert.equal(re.test(text), false, `새면 안 되는 글자 ${re} 가 문자에 있다:\n${text}`);
}

test("할 말이 없으면 null", () => {
  const b = buildToday([row({ status: "contracted" }), row({ status: "closed" })], NOW);
  assert.equal(buildDigestText({ buckets: b, purgeMode: "dry_run", purgeStale: false, weeklyPurged: null, url: URL }), null);
  assert.equal(buildDigestText({ buckets: b, purgeMode: "live", purgeStale: false, weeklyPurged: 0, url: URL }), null);
});

test("숫자만 · 0 인 칸은 빠진다 · 14일 안은 안 센다", () => {
  const rows = [
    row({ nextActionDue: "2026-09-17" }),
    row({ nextActionDue: "2026-09-18" }),
    row({ nextActionDue: "2026-09-19" }),
    row({ nextActionDue: "2026-09-30" }),
    row({ status: "pending", nextAction: null }),
    row({ status: "quoted" }),
  ];
  const text = buildDigestText({
    buckets: buildToday(rows, NOW),
    purgeMode: "live",
    purgeStale: false,
    weeklyPurged: null,
    url: URL,
  });
  assert.equal(text, `[태문넷 오늘] 지남 2 · 오늘 1 · 새 문의 1 · 멈춤 1\n${URL}`);
  assertClean(text);
});

test("파기 줄: 지연(시험 모드) · 멈춤 · 주간 건수", () => {
  const rows = [row({ status: "closed", retainUntil: "2026-09-01T00:00:00+09:00" })];
  const text = buildDigestText({
    buckets: buildToday(rows, NOW),
    purgeMode: "dry_run",
    purgeStale: true,
    weeklyPurged: 3,
    url: URL,
  });
  assert.equal(
    text,
    ["[태문넷 오늘]", "파기 지연 1 (시험 모드)", "파기 작업이 하루 넘게 돌지 않았습니다", "지난 7일 파기 3건", URL].join("\n"),
  );
  assertClean(text);
  const live = buildDigestText({ buckets: buildToday(rows, NOW), purgeMode: "live", purgeStale: false, weeklyPurged: null, url: URL });
  assert.equal(live, `[태문넷 오늘]\n파기 지연 1\n${URL}`);
});

test("여러 행을 섞어도 이름·번호·할 일·서비스가 새지 않는다", () => {
  const rows = [];
  for (let i = 0; i < 40; i++) {
    rows.push(
      row({
        status: ["pending", "contacted", "quoted", "contracted", "closed"][i % 5],
        nextActionDue: i % 3 === 0 ? `2026-09-${String(10 + (i % 15)).padStart(2, "0")}` : null,
        retainUntil: i % 7 === 0 ? "2026-09-01T00:00:00+09:00" : "2027-01-01T00:00:00+09:00",
      }),
    );
  }
  const text = buildDigestText({ buckets: buildToday(rows, NOW), purgeMode: "dry_run", purgeStale: true, weeklyPurged: 5, url: URL });
  assert.ok(text);
  assertClean(text);
  assert.ok(text.endsWith(URL));
});

test("월요일(KST) 판정 — UTC 일요일 밤도 KST 월요일", () => {
  assert.equal(isMondayKst(new Date("2026-09-21T08:30:00+09:00")), true);
  assert.equal(isMondayKst(new Date("2026-09-20T23:30:00Z")), true);
  assert.equal(isMondayKst(new Date("2026-09-20T08:30:00+09:00")), false);
});

test("Postgres 시각 글자 읽기", () => {
  const want = Date.parse("2026-09-19T03:10:00.123Z");
  assert.equal(parsePgTimestamp("2026-09-19 03:10:00.123456+00"), want);
  assert.equal(parsePgTimestamp("2026-09-19T12:10:00.123+09:00"), want);
  assert.equal(parsePgTimestamp("2026-09-19 12:10:00.123+0900"), want);
});

test("파기 멈춤 판정", () => {
  const now = new Date("2026-09-19T08:30:00+09:00");
  assert.equal(purgeIsStale(null, null, now), false);
  assert.equal(purgeIsStale("2026-09-19T00:10:00+09:00", null, now), false);
  assert.equal(purgeIsStale("2026-09-18T06:00:00+09:00", null, now), true);
  // 마지막 실행은 오래됐어도 자체 시험(마이그레이션 적용)이 더 최근이면 아직 멈춘 게 아니다
  assert.equal(purgeIsStale("2026-09-10T00:10:00+09:00", "ok 2026-09-18 23:00:00.5+00", now), false);
  assert.equal(purgeIsStale(null, "ok 2026-09-17 00:00:00+00", now), true);
  // 실패 기록에는 시각이 없다 → 판단 근거 없음
  assert.equal(purgeIsStale(null, "fail 42501 permission denied", now), false);
});

// ── F8: 하루 한 통 — 찜(crm_claim_digest) 규칙과 기록 읽기 ──
import {
  canClaimDigest,
  DIGEST_CLAIM_STALE_MS,
  isDigestSendingFresh,
  parseDigestRecord,
} from "../../src/lib/admin/digest-core.ts";

const TODAY = "2026-09-19";
const NOW_MS = Date.parse("2026-09-19T08:30:00+09:00");
const rec = (over) => JSON.stringify({ date: TODAY, at: "2026-09-19T08:29:00.000Z", sent: false, skipped: null, error: null, summary: "", ...over });

test("찜 규칙: 기록 없음·다른 날·JSON 아님은 찜한다", () => {
  assert.equal(canClaimDigest(null, TODAY, NOW_MS, Number.NaN), true);
  assert.equal(canClaimDigest("", TODAY, NOW_MS, Number.NaN), true);
  assert.equal(canClaimDigest(rec({ date: "2026-09-18", sent: true }), TODAY, NOW_MS, NOW_MS), true);
  assert.equal(canClaimDigest("not json", TODAY, NOW_MS, NOW_MS), true);
  assert.equal(canClaimDigest("[1,2]", TODAY, NOW_MS, NOW_MS), true);
  assert.equal(canClaimDigest('"text"', TODAY, NOW_MS, NOW_MS), true);
});

test("찜 규칙: 오늘 이미 보냄·알릴 것 없음이면 안 찜한다", () => {
  assert.equal(canClaimDigest(rec({ sent: true, state: "done" }), TODAY, NOW_MS, NOW_MS - 3_600_000), false);
  assert.equal(canClaimDigest(rec({ skipped: "nothing", state: "done" }), TODAY, NOW_MS, NOW_MS - 3_600_000), false);
});

test("찜 규칙: 오늘 실패로 끝난 기록은 다시 찜한다(state 유무 무관) — 고친 뒤 재실행이 먹힌다", () => {
  assert.equal(canClaimDigest(rec({ error: "발송 실패", state: "done" }), TODAY, NOW_MS, NOW_MS - 60_000), true);
  assert.equal(canClaimDigest(rec({ error: "발송 실패" }), TODAY, NOW_MS, NOW_MS - 60_000), true);
});

test("찜 규칙: 10분 안의 「보내는 중」은 안 찜하고, 10분 넘으면(도중에 죽음) 다시 찜한다", () => {
  const sending = rec({ state: "sending" });
  assert.equal(canClaimDigest(sending, TODAY, NOW_MS, NOW_MS - 60_000), false);
  assert.equal(canClaimDigest(sending, TODAY, NOW_MS, NOW_MS - DIGEST_CLAIM_STALE_MS), false);
  assert.equal(canClaimDigest(sending, TODAY, NOW_MS, NOW_MS - DIGEST_CLAIM_STALE_MS - 1), true);
  assert.equal(canClaimDigest(sending, TODAY, NOW_MS, Number.NaN), true);
});

test("parseDigestRecord: state 를 읽고, 없거나 이상하면 빼 둔다", () => {
  assert.equal(parseDigestRecord(rec({ state: "sending" })).state, "sending");
  assert.equal(parseDigestRecord(rec({ state: "done", sent: true })).state, "done");
  assert.equal("state" in parseDigestRecord(rec({})), false);
  assert.equal("state" in parseDigestRecord(rec({ state: "weird" })), false);
  assert.equal(parseDigestRecord("nope"), null);
  assert.equal(parseDigestRecord("[]"), null);
  assert.equal(parseDigestRecord(JSON.stringify({ date: TODAY })), null);
  const r = parseDigestRecord(rec({ sent: true, skipped: "other", error: 3 }));
  assert.equal(r.sent, true);
  assert.equal(r.skipped, null);
  assert.equal(r.error, null);
});

test("isDigestSendingFresh: 10분 안의 「보내는 중」만 true", () => {
  const fresh = parseDigestRecord(rec({ state: "sending", at: new Date(NOW_MS - 60_000).toISOString() }));
  const old = parseDigestRecord(rec({ state: "sending", at: new Date(NOW_MS - DIGEST_CLAIM_STALE_MS - 1000).toISOString() }));
  const done = parseDigestRecord(rec({ state: "done", sent: true, at: new Date(NOW_MS - 60_000).toISOString() }));
  assert.equal(isDigestSendingFresh(fresh, NOW_MS), true);
  assert.equal(isDigestSendingFresh(old, NOW_MS), false);
  assert.equal(isDigestSendingFresh(done, NOW_MS), false);
  assert.equal(isDigestSendingFresh(null, NOW_MS), false);
});

// ── 접수 이상 줄(2026-09-20, 오픈 주간 P1-6) ──

test("접수 이상: 확인 안 한 건수만 한 줄 — 다른 할 말이 없는 날에도 문자가 나간다", () => {
  const b = buildToday([row({ status: "contracted" })], NOW);
  const t = buildDigestText({ buckets: b, purgeMode: "dry_run", purgeStale: false, weeklyPurged: null, url: URL, intakeAlerts: 3 });
  assert.equal(t, `[태문넷 오늘]\n접수 이상 3건\n${URL}`);
  assertClean(t);
});

test("접수 이상: 0·없음·NaN 이면 줄이 없다(옛 호출 모양도 그대로)", () => {
  const b = buildToday([row({ status: "contracted" })], NOW);
  for (const intakeAlerts of [0, undefined, Number.NaN, -2]) {
    assert.equal(
      buildDigestText({ buckets: b, purgeMode: "dry_run", purgeStale: false, weeklyPurged: null, url: URL, intakeAlerts }),
      null,
    );
  }
});

test("접수 이상 줄은 파기 안내보다 먼저", () => {
  const b = buildToday([row({ status: "contracted" })], NOW);
  const t = buildDigestText({ buckets: b, purgeMode: "dry_run", purgeStale: true, weeklyPurged: 2, url: URL, intakeAlerts: 1 });
  const lines = t.split("\n");
  assert.equal(lines[1], "접수 이상 1건");
  assert.ok(lines.indexOf("파기 작업이 하루 넘게 돌지 않았습니다") > 1);
});
