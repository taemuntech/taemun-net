// 접속기록 월 점검 요약(access-log-core.ts) — 로그인·비밀번호 틀림·오류/거절·처음 보는 IP.
import { test } from "node:test";
import assert from "node:assert/strict";
import { summarizeAccessLog } from "../../src/lib/admin/access-log-core.ts";

const r = (action, outcome = "ok", ip = "203.0.113.10") => ({ action, outcome, ip });

test("로그인 성공만 센다, 거절·오류는 문제로 센다", () => {
  const s = summarizeAccessLog(
    [r("login"), r("login"), r("view"), r("update", "error"), r("view", "denied"), r("login", "denied")],
    3,
    ["203.0.113.10"],
  );
  assert.equal(s.logins, 2);
  assert.equal(s.problems, 3);
  assert.equal(s.loginFails, 3);
  assert.deepEqual(s.unknownIps, []);
});

test("비밀번호 틀림 줄이 섞여 와도 목록 숫자에 안 들어간다(건수는 따로 받은 값)", () => {
  const s = summarizeAccessLog([r("login_fail", "denied", "198.51.100.99"), r("view")], 7, ["203.0.113.10"]);
  assert.equal(s.problems, 0);
  assert.equal(s.loginFails, 7);
  assert.deepEqual(s.unknownIps, []);
});

test("처음 보는 IP: 기기 목록에 없는 IP 를 많이 나온 순으로, 빈 값·unknown 은 뺀다", () => {
  const s = summarizeAccessLog(
    [
      r("view", "ok", "198.51.100.1"),
      r("view", "ok", "198.51.100.2"),
      r("update", "ok", "198.51.100.2"),
      r("view", "ok", " 203.0.113.10 "),
      r("view", "ok", ""),
      r("view", "ok", "unknown"),
    ],
    0,
    ["203.0.113.10", null],
  );
  assert.deepEqual(s.unknownIps, [
    { ip: "198.51.100.2", count: 2 },
    { ip: "198.51.100.1", count: 1 },
  ]);
});

test("비밀번호 틀림 건수를 못 셌으면 null", () => {
  assert.equal(summarizeAccessLog([], null, []).loginFails, null);
  assert.equal(summarizeAccessLog([], Number.NaN, []).loginFails, null);
});
