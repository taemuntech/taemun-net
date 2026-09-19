// 관리자 세션 토큰(session.ts) — 환경변수를 먼저 넣고 불러온다(모듈이 읽을 때 값을 잡는다).
import { test } from "node:test";
import assert from "node:assert/strict";

process.env.ADMIN_PASSCODE = "test-passcode-only-for-node-test";
process.env.ADMIN_SESSION_SECRET = "test-secret-only-for-node-test";
const s = await import("../../src/lib/admin/session.ts");

const SID = "11111111-2222-4333-8444-555555555555";
const NOW = Date.parse("2026-09-19T12:00:00+09:00");

function legacyToken(payloadObj) {
  // 옛 모양(sid 없음, actor "admin")을 만들려면 서명이 필요하다 — 새 토큰의 서명 부분을 떼어 쓸 수는 없으니
  // payload 를 바꾼 뒤 서명이 틀어지는지만 따로 본다. 옛 토큰 자체는 createSessionToken(now) 로 만든다(sid 없음).
  return Buffer.from(JSON.stringify(payloadObj)).toString("base64url");
}

test("sid 가 토큰에 실려 왕복한다", () => {
  const token = s.createSessionToken(NOW, SID);
  const v = s.verifySessionToken(token, NOW + 1000);
  assert.ok(v);
  assert.equal(v.sid, SID);
  assert.equal(v.actor, "owner");
  assert.equal(v.expiresAt, NOW + s.ADMIN_SESSION_MAX_AGE * 1000);
});

test("sid 없는(옛) 토큰도 유효 — sid 는 null", () => {
  const token = s.createSessionToken(NOW);
  const v = s.verifySessionToken(token, NOW + 1000);
  assert.ok(v);
  assert.equal(v.sid, null);
});

test("uuid 가 아닌 sid 는 싣지 않는다", () => {
  const v = s.verifySessionToken(s.createSessionToken(NOW, "not-a-uuid"), NOW);
  assert.equal(v?.sid, null);
});

test("payload 를 바꾸면(actor·sid 위조) 무효", () => {
  const token = s.createSessionToken(NOW, SID);
  const sig = token.slice(token.indexOf(".") + 1);
  const forged = `${legacyToken({ actor: "someone", issuedAt: NOW, expiresAt: NOW + 1e9, sid: "99999999-2222-4333-8444-555555555555" })}.${sig}`;
  assert.equal(s.verifySessionToken(forged, NOW), null);
  const flipped = token.slice(0, -2) + (token.endsWith("AA") ? "BB" : "AA");
  assert.equal(s.verifySessionToken(flipped, NOW), null);
});

test("만료 토큰은 무효", () => {
  const token = s.createSessionToken(NOW, SID);
  assert.equal(s.verifySessionToken(token, NOW + s.ADMIN_SESSION_MAX_AGE * 1000), null);
});

test("actor 는 언제나 owner", () => {
  assert.equal(s.ADMIN_ACTOR, "owner");
  const v = s.verifySessionToken(s.createSessionToken(NOW), NOW);
  assert.equal(v?.actor, "owner");
});

test("clientIpFromHeaders 는 clientIp 와 같은 순서", () => {
  const h = new Headers({ "x-forwarded-for": "1.1.1.1, 2.2.2.2", "x-vercel-forwarded-for": "3.3.3.3" });
  assert.equal(s.clientIpFromHeaders(h), "3.3.3.3");
  assert.equal(s.clientIp(new Request("http://x/", { headers: h })), "3.3.3.3");
  assert.equal(s.clientIpFromHeaders(new Headers({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" })), "2.2.2.2");
  assert.equal(s.clientIpFromHeaders(new Headers({ "x-real-ip": " 4.4.4.4 " })), "4.4.4.4");
  assert.equal(s.clientIpFromHeaders(new Headers()), "unknown");
});
