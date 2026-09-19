// 견적 접수 판단(intake-core.ts) — 1시간 한도는 문자만 묶는다 · LMS 2,000바이트 · 접수 이상 기록 합치기/확인.
// 2026-09-20 가온, 오픈 주간 P1-5·6. 목표: 진짜 고객 문의가 소리 없이 사라지지 않고, 사고가 나면 형이 안다.
process.env.TZ = "UTC";
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  INTAKE_ALERT_KINDS,
  LMS_MAX_BYTES,
  SAVE_FAIL_PREFIX,
  SAVE_FAIL_SMS_MAX_PER_HOUR,
  acknowledgeIntakeAlerts,
  acknowledgeSummary,
  capNoticeSmsText,
  decideNotify,
  fitLms,
  intakeAlertLabel,
  mergeIntakeAlert,
  openIntakeAlertCount,
  openIntakeAlerts,
  parseIntakeAlerts,
  saveFailSmsAllowedByRecord,
  saveFailSmsText,
  shouldSendCapNotice,
  slidingWindowAllow,
  smsBytes,
} from "../../src/lib/inquiry/intake-core.ts";
import { INTAKE_ALERT_KIND_VALUES, parseSettingsBody } from "../../src/lib/admin/crm-input.ts";

const CAP = 30;

// ── 1시간 한도 ──

test("한도 아래는 평소처럼 문자", () => {
  assert.equal(decideNotify(0, CAP), "send");
  assert.equal(decideNotify(29, CAP), "send");
});

test("한도 이상이면 전부 over_cap — 동시 요청이 30 을 건너뛰어(29 → 31) 읽어도 한도 초과로 센다(접수는 늘 저장 — 429 없음)", () => {
  assert.equal(decideNotify(30, CAP), "over_cap");
  assert.equal(decideNotify(31, CAP), "over_cap");
  assert.equal(decideNotify(45, CAP), "over_cap");
  assert.equal(decideNotify(500, CAP), "over_cap");
  // 결과 종류에 「거절」이 아예 없다 — 한도가 접수를 막는 길이 없어졌다
  for (const n of [0, 29, 30, 31, 10_000]) assert.ok(["send", "over_cap"].includes(decideNotify(n, CAP)));
});

test("한도 안내 문자는 새 묶음을 여는 쓰기 하나만 — 없음·확인됨·1시간 지난 묶음이면 보내고, 열린 최근 묶음이면 안 보낸다", () => {
  const now = "2026-09-20T05:00:00.000Z";
  assert.equal(shouldSendCapNotice(undefined, now), true);
  const open = { kind: "over_cap", firstAt: "2026-09-20T04:50:00.000Z", lastAt: "2026-09-20T04:59:00.000Z", count: 3, lastRequestNo: null, acknowledgedAt: null };
  assert.equal(shouldSendCapNotice(open, now), false);
  assert.equal(shouldSendCapNotice({ ...open, acknowledgedAt: "2026-09-20T04:59:30.000Z" }, now), true);
  assert.equal(shouldSendCapNotice({ ...open, lastAt: "2026-09-20T03:59:59.000Z" }, now), true, "1시간 넘게 조용했다 — 새 도배");
});

test("같은 기록에 차례로 합친 두 쓰기 중 안내 문자는 정확히 하나만 true(값 비교 쓰기가 한 줄로 세운다)", () => {
  let m = {};
  const answers = [];
  for (const at of ["2026-09-20T05:00:00.000Z", "2026-09-20T05:00:01.000Z", "2026-09-20T05:00:02.000Z"]) {
    answers.push(shouldSendCapNotice(m.over_cap, at));
    m = mergeIntakeAlert(m, { kind: "over_cap", at, requestNo: null });
  }
  assert.deepEqual(answers, [true, false, false]);
  assert.equal(m.over_cap.count, 3);
});

test("모아 쓰기: count 만큼 한 번에 더한다(없거나 이상하면 1)", () => {
  let m = mergeIntakeAlert({}, { kind: "over_cap", at: "2026-09-20T05:00:00.000Z", requestNo: null, count: 7 });
  assert.equal(m.over_cap.count, 7);
  m = mergeIntakeAlert(m, { kind: "over_cap", at: "2026-09-20T05:01:00.000Z", requestNo: null, count: 0 });
  assert.equal(m.over_cap.count, 8);
  m = mergeIntakeAlert(m, { kind: "over_cap", at: "2026-09-20T05:02:00.000Z", requestNo: null, count: Number.NaN });
  assert.equal(m.over_cap.count, 9);
});

// ── 「저장 실패」 문자 상한 ──

test("저장 실패 문자: 1시간 안에 연 열린 묶음이 N건이면 문자 없이 기록만", () => {
  const now = "2026-09-20T05:00:00.000Z";
  const bundle = (count, firstAt = "2026-09-20T04:30:00.000Z", acknowledgedAt = null) => ({
    save_fail: { kind: "save_fail", firstAt, lastAt: "2026-09-20T04:59:00.000Z", count, lastRequestNo: null, acknowledgedAt },
  });
  assert.equal(saveFailSmsAllowedByRecord(null, now), true, "기록을 못 읽으면 보낸다(인스턴스 울타리가 따로 있다)");
  assert.equal(saveFailSmsAllowedByRecord({}, now), true);
  assert.equal(saveFailSmsAllowedByRecord(bundle(SAVE_FAIL_SMS_MAX_PER_HOUR - 1), now), true);
  assert.equal(saveFailSmsAllowedByRecord(bundle(SAVE_FAIL_SMS_MAX_PER_HOUR), now), false);
  assert.equal(saveFailSmsAllowedByRecord(bundle(500), now), false);
  assert.equal(saveFailSmsAllowedByRecord(bundle(500, "2026-09-20T03:00:00.000Z"), now), true, "1시간보다 오래 연 묶음은 다시 보낸다");
  assert.equal(saveFailSmsAllowedByRecord(bundle(500, undefined, "2026-09-20T04:59:30.000Z"), now), true, "확인한 묶음은 막지 않는다");
});

test("인스턴스 창: 창 안에서 max 통, 창이 지나면 다시 — 원래 배열은 건드리지 않는다", () => {
  const H = 60 * 60 * 1000;
  let times = [];
  const got = [];
  for (let i = 0; i < 7; i++) {
    const w = slidingWindowAllow(times, 1_000 + i, H, 5);
    got.push(w.allowed);
    times = w.times;
  }
  assert.deepEqual(got, [true, true, true, true, true, false, false]);
  const frozen = Object.freeze([...times]);
  const later = slidingWindowAllow(frozen, 1_000 + H + 10, H, 5);
  assert.equal(later.allowed, true);
  assert.equal(frozen.length, 5);
});

test("건수를 못 셌으면(null·NaN) 문자를 보낸다 — 알림 한 통 더가 문의를 모르는 것보다 싸다", () => {
  assert.equal(decideNotify(null, CAP), "send");
  assert.equal(decideNotify(Number.NaN, CAP), "send");
});

test("한도 안내 문자는 숫자·주소만", () => {
  const t = capNoticeSmsText(30, "taemun.net/admin/today");
  assert.match(t, /30건/);
  assert.match(t, /taemun\.net\/admin\/today$/);
  assert.ok(smsBytes(t) < 200);
});

// ── LMS 2,000바이트 ──

test("바이트 세기: 영문 1 · 한글 2 · 이모지 4", () => {
  assert.equal(smsBytes("abc"), 3);
  assert.equal(smsBytes("가나"), 4);
  assert.equal(smsBytes("😀"), 4);
});

test("짧으면 그대로, 길면 뒤에서 잘라 2,000바이트 안", () => {
  assert.equal(fitLms("안녕"), "안녕");
  const long = `■ 연락처: 010-0000-0001\n■ 문의내용: ${"가".repeat(3000)}`;
  const fit = fitLms(long);
  assert.ok(smsBytes(fit) <= LMS_MAX_BYTES, `${smsBytes(fit)}`);
  assert.ok(fit.startsWith("■ 연락처: 010-0000-0001"), "앞(연락처)은 남아야 한다");
  assert.match(fit, /…\(잘림\)$/);
});

test("정확히 2,000바이트는 자르지 않는다 · 이모지를 반으로 쪼개지 않는다", () => {
  const exact = "a".repeat(LMS_MAX_BYTES);
  assert.equal(fitLms(exact), exact);
  const emoji = "😀".repeat(600);
  const fit = fitLms(emoji);
  assert.ok(smsBytes(fit) <= LMS_MAX_BYTES);
  assert.equal(fit.includes("�"), false);
  for (const ch of fit.replace("…(잘림)", "")) assert.equal(ch, "😀");
});

test("저장 실패 문자: 머리말이 첫 줄, 입력 한도를 다 채워도 2,000바이트 안", () => {
  const body = [
    "[태문넷 신규 견적 접수]",
    "■ 연락처: 010-0000-0001",
    `■ 서비스: ${Array.from({ length: 10 }, () => "가".repeat(60)).join(", ")}`,
    `■ 예산: ${"나".repeat(60)}`,
    `■ 일정: ${"다".repeat(60)}`,
    `■ 이메일: ${"a".repeat(90)}@example.com`,
    `■ 참고URL: https://${"b".repeat(290)}`,
    `■ 문의내용: ${"라".repeat(400)}…(이하 관리자 화면)`,
  ].join("\n");
  assert.ok(smsBytes(body) > LMS_MAX_BYTES, "전제: 한도를 다 채우면 넘는다");
  const t = saveFailSmsText(body);
  assert.equal(t.split("\n")[0], SAVE_FAIL_PREFIX);
  assert.equal(SAVE_FAIL_PREFIX, "[저장 실패 — 이 문자로만 남았습니다]");
  assert.ok(smsBytes(t) <= LMS_MAX_BYTES);
  assert.match(t, /010-0000-0001/, "연락처는 잘리지 않는다 — 이 문자가 유일한 기록이다");
});

// ── 접수 이상 기록 ──

const T1 = "2026-09-20T01:00:00.000Z";
const T2 = "2026-09-20T02:00:00.000Z";
const T3 = "2026-09-20T03:00:00.000Z";

test("종류별로 합친다: 건수·처음/마지막 시각·마지막 접수번호", () => {
  let m = {};
  m = mergeIntakeAlert(m, { kind: "sms_fail", at: T1, requestNo: "TM-260920-01" });
  m = mergeIntakeAlert(m, { kind: "sms_fail", at: T2, requestNo: "TM-260920-02" });
  m = mergeIntakeAlert(m, { kind: "save_fail", at: T2, requestNo: null });
  assert.deepEqual(m.sms_fail, {
    kind: "sms_fail",
    firstAt: T1,
    lastAt: T2,
    count: 2,
    lastRequestNo: "TM-260920-02",
    acknowledgedAt: null,
  });
  assert.equal(m.save_fail.count, 1);
  assert.equal(m.save_fail.lastRequestNo, null);
  assert.equal(m.over_cap, undefined);
});

test("순서가 뒤바뀐 사건도 마지막 시각을 뒤로 돌리지 않는다 · 번호 없는 사건은 옛 번호를 지우지 않는다", () => {
  let m = mergeIntakeAlert({}, { kind: "sms_fail", at: T2, requestNo: "TM-260920-02" });
  m = mergeIntakeAlert(m, { kind: "sms_fail", at: T1, requestNo: null });
  assert.equal(m.sms_fail.lastAt, T2);
  assert.equal(m.sms_fail.firstAt, T1);
  assert.equal(m.sms_fail.lastRequestNo, "TM-260920-02");
});

test("원래 기록은 건드리지 않는다(새 객체)", () => {
  const m0 = mergeIntakeAlert({}, { kind: "over_cap", at: T1, requestNo: null });
  const snapshot = JSON.stringify(m0);
  mergeIntakeAlert(m0, { kind: "over_cap", at: T2, requestNo: null });
  assert.equal(JSON.stringify(m0), snapshot);
});

test("확인하면 배너·아침 문자에서 빠지고, 또 나면 1건부터 새로 연다", () => {
  let m = mergeIntakeAlert({}, { kind: "sms_fail", at: T1, requestNo: null });
  m = mergeIntakeAlert(m, { kind: "sms_fail", at: T2, requestNo: null });
  m = mergeIntakeAlert(m, { kind: "over_cap", at: T2, requestNo: null });
  assert.equal(openIntakeAlertCount(m), 3);
  const acked = acknowledgeIntakeAlerts(m, T3, { sms_fail: { lastAt: T2, count: 2 }, over_cap: { lastAt: T2, count: 1 } });
  assert.equal(openIntakeAlertCount(acked), 0);
  assert.equal(openIntakeAlerts(acked).length, 0);
  assert.equal(acked.sms_fail.acknowledgedAt, T3);
  assert.equal(acked.sms_fail.count, 2, "확인은 지우지 않는다 — 기록은 흐리게 남는다");
  const again = mergeIntakeAlert(acked, { kind: "sms_fail", at: "2026-09-20T04:00:00.000Z", requestNo: null });
  assert.equal(again.sms_fail.count, 1);
  assert.equal(again.sms_fail.acknowledgedAt, null);
  assert.equal(again.sms_fail.firstAt, "2026-09-20T04:00:00.000Z");
  assert.equal(openIntakeAlertCount(again), 1);
  // 이미 확인한 칸에 다시 확인을 눌러도 옛 확인 시각은 그대로
  const twice = acknowledgeIntakeAlerts(acked, "2026-09-21T00:00:00.000Z", { over_cap: { lastAt: T2, count: 1 } });
  assert.equal(twice.over_cap.acknowledgedAt, T3);
});

test("확인은 화면이 본 것만: 못 본 save_fail·본 뒤 늘어난 칸은 열어 둔다, 정확히 본 칸만 확인", () => {
  let m = mergeIntakeAlert({}, { kind: "sms_fail", at: T1, requestNo: null });
  m = mergeIntakeAlert(m, { kind: "sms_fail", at: T2, requestNo: null });
  // 형이 화면을 연 뒤(sms_fail 2건을 봄) 저장 실패가 새로 난다
  const seen = { sms_fail: { lastAt: T2, count: 2 } };
  m = mergeIntakeAlert(m, { kind: "save_fail", at: T3, requestNo: null });
  const acked = acknowledgeIntakeAlerts(m, "2026-09-20T04:00:00.000Z", seen);
  assert.equal(acked.sms_fail.acknowledgedAt, "2026-09-20T04:00:00.000Z", "본 칸은 확인");
  assert.equal(acked.save_fail.acknowledgedAt, null, "못 본 저장 실패는 열린 채 — 배너·아침 문자에 남는다");
  assert.deepEqual(acknowledgeSummary(m, seen), { acknowledged: 2, keptOpen: 1 });

  // 늦게 도착한 기록: 시각은 앞이라 lastAt 은 그대로인데 건수만 오른다 → 본 건수보다 많으니 열어 둔다
  const late = mergeIntakeAlert(
    mergeIntakeAlert({}, { kind: "sms_fail", at: T2, requestNo: null }),
    { kind: "sms_fail", at: T1, requestNo: null },
  );
  assert.equal(late.sms_fail.lastAt, T2);
  const kept = acknowledgeIntakeAlerts(late, T3, { sms_fail: { lastAt: T2, count: 1 } });
  assert.equal(kept.sms_fail.acknowledgedAt, null, "건수가 본 것보다 많으면 열어 둔다");
  const exact = acknowledgeIntakeAlerts(late, T3, { sms_fail: { lastAt: T2, count: 2 } });
  assert.equal(exact.sms_fail.acknowledgedAt, T3, "정확히 본 그대로면 확인");
  assert.deepEqual(acknowledgeIntakeAlerts(late, T3, {}), late, "아무것도 안 봤으면 아무것도 확인하지 않는다");
});

test("급한 순서: 저장 실패 → 문자 실패 → 한도 초과", () => {
  let m = {};
  m = mergeIntakeAlert(m, { kind: "over_cap", at: T1, requestNo: null });
  m = mergeIntakeAlert(m, { kind: "sms_fail", at: T1, requestNo: null });
  m = mergeIntakeAlert(m, { kind: "save_fail", at: T1, requestNo: null });
  assert.deepEqual(openIntakeAlerts(m).map((a) => a.kind), ["save_fail", "sms_fail", "over_cap"]);
});

test("저장 글자 왕복 · 이상한 값은 버린다(화면이 깨지지 않게)", () => {
  const m = mergeIntakeAlert({}, { kind: "save_fail", at: T1, requestNo: null });
  assert.deepEqual(parseIntakeAlerts(JSON.stringify(m)), m);
  assert.deepEqual(parseIntakeAlerts(null), {});
  assert.deepEqual(parseIntakeAlerts(""), {});
  assert.deepEqual(parseIntakeAlerts("not json"), {});
  assert.deepEqual(parseIntakeAlerts("[]"), {});
  const weird = parseIntakeAlerts(
    JSON.stringify({
      sms_fail: { firstAt: T1, lastAt: T1, count: -1 },
      save_fail: { firstAt: T1, lastAt: T2, count: 2, lastRequestNo: "010-0000-0001", acknowledgedAt: 5 },
      other: { firstAt: T1, lastAt: T1, count: 1 },
    }),
  );
  assert.equal(weird.sms_fail, undefined, "건수가 0 이하면 버린다");
  assert.equal(weird.save_fail.count, 2);
  assert.equal(weird.save_fail.lastRequestNo, null, "접수번호 모양이 아니면(전화번호 등) 싣지 않는다");
  assert.equal(weird.save_fail.acknowledgedAt, null);
  assert.equal("other" in weird, false);
});

test("기록에 접수번호 모양이 아닌 값은 들어가지 않는다(고객 정보가 새어 들 자리 없음)", () => {
  const m = mergeIntakeAlert({}, { kind: "sms_fail", at: T1, requestNo: "예시 고객 010-0000-0001" });
  assert.equal(m.sms_fail.lastRequestNo, null);
  assert.deepEqual(Object.keys(m.sms_fail).sort(), ["acknowledgedAt", "count", "firstAt", "kind", "lastAt", "lastRequestNo"]);
});

test("배너 글자 세 종류", () => {
  const base = { firstAt: T1, lastAt: T2, count: 3, lastRequestNo: "TM-260920-03", acknowledgedAt: null };
  assert.equal(
    intakeAlertLabel({ ...base, kind: "sms_fail" }, "9월 20일 오전 11:00"),
    "접수 알림 문자 3건 실패 · 마지막 9월 20일 오전 11:00 · TM-260920-03",
  );
  assert.equal(
    intakeAlertLabel({ ...base, kind: "save_fail", lastRequestNo: null }, "9월 20일 오전 11:00"),
    "저장 실패 3건 — 문자로만 남음 · 마지막 9월 20일 오전 11:00",
  );
  assert.equal(
    intakeAlertLabel({ ...base, kind: "over_cap" }, "9월 20일 오전 11:00"),
    "1시간 접수 한도 초과 3건 — 문자 없이 저장됨 · 마지막 9월 20일 오전 11:00 · TM-260920-03",
  );
});

// ── 설정 API 입력 ──

test("설정 API: { key:'intake_alert', action:'ack', seen } — seen 은 종류·ISO 시각·양의 정수 건수만", () => {
  const seen = { save_fail: { lastAt: T2, count: 2 }, over_cap: { lastAt: "2026-09-20T02:00:00Z", count: 1 } };
  assert.deepEqual(parseSettingsBody({ key: "intake_alert", action: "ack", seen }), { ok: true, key: "intake_alert", action: "ack", seen });
  assert.deepEqual(parseSettingsBody({ key: "intake_alert", action: "ack", seen: {} }), {
    ok: true,
    key: "intake_alert",
    action: "ack",
    seen: {},
  });
  assert.equal(parseSettingsBody({ key: "intake_alert", action: "ack" }).ok, false, "seen 없는 옛 화면은 새로 고치라고 돌려보낸다");
  assert.equal(parseSettingsBody({ key: "intake_alert" }).ok, false);
  assert.equal(parseSettingsBody({ key: "intake_alert", action: "clear", seen: {} }).ok, false);
  for (const bad of [
    { other: { lastAt: T2, count: 1 } },
    { sms_fail: { lastAt: "어제", count: 1 } },
    { sms_fail: { lastAt: T2, count: 0 } },
    { sms_fail: { lastAt: T2, count: 1.5 } },
    { sms_fail: { lastAt: T2, count: "2" } },
    { sms_fail: null },
    [],
  ]) {
    assert.equal(parseSettingsBody({ key: "intake_alert", action: "ack", seen: bad }).ok, false, JSON.stringify(bad));
  }
  // 파기 스위치는 그대로
  assert.deepEqual(parseSettingsBody({ key: "purge_mode", value: "live" }), { ok: true, key: "purge_mode", value: "live" });
});

test("crm-input 이 따로 적은 종류 목록 = intake-core 목록", () => {
  assert.deepEqual([...INTAKE_ALERT_KIND_VALUES], [...INTAKE_ALERT_KINDS]);
});
