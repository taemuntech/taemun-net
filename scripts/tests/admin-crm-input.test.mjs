// 관리대장 입력 검사(crm-input.ts).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  CLOSED_REASONS,
  CLOSED_REASON_LABEL,
  isClosedReason,
  isRealYmd,
  parseNextActionBody,
  parseSessionsBody,
  parseSettingsBody,
  parseTransitionBody,
} from "../../src/lib/admin/crm-input.ts";

const ID = "aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee";

test("종료 사유 목록·라벨", () => {
  assert.deepEqual([...CLOSED_REASONS], ["price", "timing", "no_response", "not_fit", "completed"]);
  assert.equal(CLOSED_REASON_LABEL.not_fit, "안 맞음·기타");
  assert.equal(CLOSED_REASON_LABEL.completed, "진행 완료");
  assert.equal(isClosedReason("price"), true);
  assert.equal(isClosedReason("PRICE"), false);
});

test("상태 바꾸기: 정상", () => {
  assert.deepEqual(parseTransitionBody({ id: ID, status: "contacted" }), {
    ok: true,
    id: ID,
    to: "contacted",
    closedReason: null,
    note: null,
  });
  const r = parseTransitionBody({ id: ID.toUpperCase(), status: "closed", closedReason: "price", note: "  메모 " });
  assert.deepEqual(r, { ok: true, id: ID, to: "closed", closedReason: "price", note: "메모" });
});

test("상태 바꾸기: 종료가 아니면 사유를 버린다", () => {
  const r = parseTransitionBody({ id: ID, status: "quoted", closedReason: "price" });
  assert.equal(r.ok && r.closedReason, null);
});

test("상태 바꾸기: 거절", () => {
  assert.equal(parseTransitionBody(null).ok, false);
  assert.equal(parseTransitionBody([]).ok, false);
  assert.equal(parseTransitionBody({ id: "x", status: "pending" }).ok, false);
  assert.equal(parseTransitionBody({ id: ID, status: "done" }).ok, false);
  assert.equal(parseTransitionBody({ id: ID, status: "closed" }).ok, false);
  assert.equal(parseTransitionBody({ id: ID, status: "closed", closedReason: "bogus" }).ok, false);
  assert.equal(parseTransitionBody({ id: ID, status: "pending", note: "가".repeat(301) }).ok, false);
  assert.equal(parseTransitionBody({ id: ID, status: "pending", note: 3 }).ok, false);
});

test("달력 날짜", () => {
  assert.equal(isRealYmd("2026-02-28"), true);
  assert.equal(isRealYmd("2026-02-29"), false);
  assert.equal(isRealYmd("2028-02-29"), true);
  assert.equal(isRealYmd("2026-13-01"), false);
  assert.equal(isRealYmd("2026-9-1"), false);
});

test("다음 할 일: 정상·비우기·날짜만", () => {
  const today = "2026-09-19";
  assert.deepEqual(parseNextActionBody({ id: ID, text: "  견적서\n보내기 ", due: "2026-09-22" }, today), {
    ok: true,
    id: ID,
    text: "견적서 보내기",
    due: "2026-09-22",
  });
  assert.deepEqual(parseNextActionBody({ id: ID, text: "", due: "" }, today), { ok: true, id: ID, text: null, due: null });
  assert.deepEqual(parseNextActionBody({ id: ID, text: null, due: "2026-09-19" }, today), {
    ok: true,
    id: ID,
    text: null,
    due: "2026-09-19",
  });
});

test("다음 할 일: 범위 경계(−365·+730)", () => {
  const today = "2026-09-19";
  assert.equal(parseNextActionBody({ id: ID, due: "2025-09-19" }, today).ok, true);
  assert.equal(parseNextActionBody({ id: ID, due: "2025-09-18" }, today).ok, false);
  assert.equal(parseNextActionBody({ id: ID, due: "2028-09-18" }, today).ok, true);
  assert.equal(parseNextActionBody({ id: ID, due: "2028-09-19" }, today).ok, false);
});

test("다음 할 일: 거절", () => {
  const today = "2026-09-19";
  assert.equal(parseNextActionBody({ id: ID, text: "가".repeat(201) }, today).ok, false);
  assert.equal(parseNextActionBody({ id: ID, text: "가".repeat(200) }, today).ok, true);
  assert.equal(parseNextActionBody({ id: ID, due: "2026-02-30" }, today).ok, false);
  assert.equal(parseNextActionBody({ id: ID, due: "20260920" }, today).ok, false);
  assert.equal(parseNextActionBody({ id: ID, text: 5 }, today).ok, false);
  assert.equal(parseNextActionBody({ id: "nope" }, today).ok, false);
});

test("설정", () => {
  assert.deepEqual(parseSettingsBody({ key: "purge_mode", value: "live" }), { ok: true, key: "purge_mode", value: "live" });
  assert.equal(parseSettingsBody({ key: "purge_cap", value: "999" }).ok, false);
  assert.equal(parseSettingsBody({ key: "purge_mode", value: "LIVE" }).ok, false);
});

test("기기", () => {
  assert.deepEqual(parseSessionsBody({ action: "revoke", id: ID }), { ok: true, action: "revoke", id: ID });
  assert.deepEqual(parseSessionsBody({ action: "revoke_others" }), { ok: true, action: "revoke_others" });
  assert.equal(parseSessionsBody({ action: "revoke" }).ok, false);
  assert.equal(parseSessionsBody({ action: "delete_all" }).ok, false);
});
