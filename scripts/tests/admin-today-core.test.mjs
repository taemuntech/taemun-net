// 「오늘」 분류(today-core.ts). 날짜는 전부 +09:00 을 붙여 만든다 — 실행 PC 의 시간대와 무관해야 한다.
// 형 PC 는 KST 라 getDate() 결함이 초록으로 숨는다. 그래서 이 파일은 TZ=UTC 로 돌려도 같은 답이어야 한다.
process.env.TZ = "UTC";
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildToday, daysBetween, dLabel, kstDate } from "../../src/lib/admin/today-core.ts";

const NOW = new Date("2026-09-19T10:00:00+09:00");

let seq = 0;
function row(over) {
  seq += 1;
  return {
    id: `00000000-0000-4000-8000-${String(seq).padStart(12, "0")}`,
    requestNo: `TM-260919-${String(seq).padStart(2, "0")}`,
    createdAt: "2026-09-10T09:00:00+09:00",
    status: "contacted",
    services: ["웹사이트"],
    nextAction: null,
    nextActionDue: null,
    updatedAt: null,
    retainUntil: "2027-09-10T09:00:00+09:00",
    retentionBasis: "inquiry",
    purgedAt: null,
    ...over,
  };
}

test("kstDate: KST 00:30 은 UTC 로 전날이어도 KST 날짜를 준다", () => {
  const d = new Date("2026-09-19T00:30:00+09:00");
  assert.equal(d.toISOString().slice(0, 10), "2026-09-18");
  assert.equal(kstDate(d), "2026-09-19");
  assert.equal(kstDate(new Date("2026-09-19T23:59:00+09:00")), "2026-09-19");
});

test("daysBetween·dLabel", () => {
  assert.equal(daysBetween("2026-09-19", "2026-09-21"), 2);
  assert.equal(daysBetween("2026-09-19", "2026-09-16"), -3);
  assert.equal(daysBetween("2026-02-28", "2026-03-01"), 1);
  assert.equal(daysBetween("2026-12-31", "2027-01-01"), 1);
  assert.equal(dLabel(0), "오늘");
  assert.equal(dLabel(2), "D-2");
  assert.equal(dLabel(-3), "3일 지남");
});

test("날짜 칸 나누기(상태 무관) + 정렬", () => {
  const rows = [
    row({ nextActionDue: "2026-09-17", nextAction: "전화" }),
    row({ nextActionDue: "2026-09-18", status: "closed" }),
    row({ nextActionDue: "2026-09-19" }),
    row({ nextActionDue: "2026-09-22" }),
    row({ nextActionDue: "2026-09-23" }),
    row({ nextActionDue: "2026-10-03" }),
    row({ nextActionDue: "2026-10-04" }),
  ];
  const b = buildToday(rows, NOW);
  assert.equal(b.todayKst, "2026-09-19");
  assert.deepEqual(b.overdue.map((i) => i.due), ["2026-09-17", "2026-09-18"]);
  assert.equal(b.overdue[0].title, "전화");
  assert.equal(b.overdue[0].dLabel, "2일 지남");
  assert.equal(b.overdue[0].kind, "due");
  assert.deepEqual(b.today.map((i) => i.dLabel), ["오늘"]);
  assert.deepEqual(b.within3.map((i) => i.due), ["2026-09-22"]);
  assert.deepEqual(b.within14.map((i) => i.due), ["2026-09-23", "2026-10-03"]);
  assert.equal(b.newInquiries.length + b.stalled.length, 0);
});

test("KST 00:30 경계: 오늘 마감이 어제로 밀리지 않는다", () => {
  const early = new Date("2026-09-19T00:30:00+09:00");
  const b = buildToday([row({ nextActionDue: "2026-09-19" }), row({ nextActionDue: "2026-09-18" })], early);
  assert.equal(b.todayKst, "2026-09-19");
  assert.equal(b.today.length, 1);
  assert.equal(b.overdue.length, 1);
});

test("새 문의·멈춘 딜", () => {
  const rows = [
    row({ status: "pending", createdAt: "2026-09-18T09:00:00+09:00" }),
    row({ status: "pending", createdAt: "2026-09-19T08:00:00+09:00", services: [] }),
    row({ status: "quoted", updatedAt: "2026-09-10T09:00:00+09:00" }),
    row({ status: "contacted", updatedAt: "2026-09-17T09:00:00+09:00" }),
    row({ status: "contracted" }),
    row({ status: "closed" }),
  ];
  const b = buildToday(rows, NOW);
  assert.deepEqual(b.newInquiries.map((i) => i.dLabel), ["오늘 접수", "1일 전 접수"]);
  assert.equal(b.newInquiries[0].title, "(내용 없음)");
  assert.equal(b.newInquiries[0].kind, "new");
  assert.deepEqual(b.stalled.map((i) => i.daysSinceActivity), [9, 2]);
  assert.equal(b.stalled[0].status, "quoted");
  assert.equal(b.stalled[0].kind, "stalled");
});

test("제목: 할 일 → 서비스 → (내용 없음)", () => {
  const b = buildToday(
    [
      row({ nextActionDue: "2026-09-19", nextAction: "  견적서 보내기 " }),
      row({ nextActionDue: "2026-09-19", services: ["웹사이트", "앱"], createdAt: "2026-09-11T00:00:00+09:00" }),
    ],
    NOW,
  );
  assert.deepEqual(b.today.map((i) => i.title), ["견적서 보내기", "웹사이트 · 앱"]);
});

test("파기된 행은 어디에도 없다", () => {
  const b = buildToday(
    [row({ purgedAt: "2026-09-01T00:00:00Z", nextActionDue: "2026-09-19", status: "pending", retainUntil: "2026-09-01T00:00:00Z" })],
    NOW,
  );
  assert.equal(b.today.length + b.newInquiries.length + b.purgeOverdue.count + b.purgeSoon.count, 0);
});

test("파기 지연·예정", () => {
  const rows = [
    row({ retainUntil: "2026-09-16T10:00:00+09:00", requestNo: "TM-250916-01" }),
    row({ retainUntil: "2026-09-19T10:00:00+09:00", requestNo: null }),
    row({ retainUntil: "2026-10-09T10:00:00+09:00" }),
    row({ retainUntil: "2026-10-19T10:00:00+09:00" }),
    row({ retainUntil: "2026-10-19T10:00:01+09:00" }),
    row({ retainUntil: null, retentionBasis: "contract", status: "contracted" }),
    row({ retainUntil: "2026-09-01T00:00:00+09:00", retentionBasis: "contract", status: "contracted" }),
  ];
  const b = buildToday(rows, NOW);
  // 09-19 10:00 KST 에 기한이 끝난 행은 지난 실행(09-19 00:10 KST) 뒤라 지연이 아니라 오늘 밤 파기 예정(수정 F9)
  assert.deepEqual(b.purgeOverdue, { count: 1, requestNos: ["TM-250916-01"] });
  assert.equal(b.purgeSoon.count, 3);
  assert.equal(b.purgeSoon.earliest, "2026-09-19");
});

test("파기 예정 가장 이른 날은 KST 날짜", () => {
  const b = buildToday([row({ retainUntil: "2026-09-20T00:30:00+09:00" })], NOW);
  assert.equal(b.purgeSoon.earliest, "2026-09-20");
});

// ── F9: 파기 지연은 지난 예약 실행(00:10 KST = 15:10 UTC) 기준 ──
import { lastScheduledPurgeRun } from "../../src/lib/admin/today-core.ts";

test("지난 예약 파기 시각: 00:10 KST 전이면 어제 00:10, 뒤면 오늘 00:10", () => {
  assert.equal(
    new Date(lastScheduledPurgeRun(new Date("2026-09-19T08:30:00+09:00"))).toISOString(),
    "2026-09-18T15:10:00.000Z",
  );
  assert.equal(
    new Date(lastScheduledPurgeRun(new Date("2026-09-19T00:05:00+09:00"))).toISOString(),
    "2026-09-17T15:10:00.000Z",
  );
  // 정확히 실행 시각이면 그 실행을 「지난 실행」으로 본다
  assert.equal(
    new Date(lastScheduledPurgeRun(new Date("2026-09-19T00:10:00+09:00"))).toISOString(),
    "2026-09-18T15:10:00.000Z",
  );
});

test("03:00 KST 에 기한이 끝난 문의를 08:30 에 보면 지연이 아니라 예정(오늘 밤 지운다)", () => {
  const at0830 = new Date("2026-09-19T08:30:00+09:00");
  const b = buildToday([row({ retainUntil: "2026-09-19T03:00:00+09:00", requestNo: "TM-250919-01" })], at0830);
  assert.equal(b.purgeOverdue.count, 0);
  assert.equal(b.purgeSoon.count, 1);
  assert.equal(b.purgeSoon.earliest, "2026-09-19");
});

test("00:05 KST 에 기한이 끝난 문의는 00:10 실행이 지웠어야 한다 — 08:30 에 남아 있으면 지연", () => {
  const at0830 = new Date("2026-09-19T08:30:00+09:00");
  const b = buildToday([row({ retainUntil: "2026-09-19T00:05:00+09:00", requestNo: "TM-250919-02" })], at0830);
  assert.deepEqual(b.purgeOverdue, { count: 1, requestNos: ["TM-250919-02"] });
  assert.equal(b.purgeSoon.count, 0);
});

test("00:05 KST(실행 전)에 보면 어제 03:00 에 끝난 문의는 아직 예정 — 오늘 00:10 이 지운다", () => {
  const at0005 = new Date("2026-09-19T00:05:00+09:00");
  const b = buildToday([row({ retainUntil: "2026-09-18T03:00:00+09:00" })], at0005);
  assert.equal(b.purgeOverdue.count, 0);
  assert.equal(b.purgeSoon.count, 1);
});

test("계약 상태 행은 보관 근거가 어긋나 있어도 파기 지연·예정에 없다(파기 함수도 건너뛴다)", () => {
  const b = buildToday(
    [row({ status: "contracted", retentionBasis: "inquiry", retainUntil: "2026-09-01T00:00:00+09:00" })],
    NOW,
  );
  assert.equal(b.purgeOverdue.count + b.purgeSoon.count, 0);
});

// ── F10: 새 문의 라벨은 접수일, 멈춤 0일은 「오늘 멈춤」 ──

test("새 문의 라벨은 updated_at 이 아니라 접수일(createdAt)로 센다", () => {
  const b = buildToday(
    [
      row({
        status: "pending",
        createdAt: "2026-09-09T09:00:00+09:00",
        updatedAt: "2026-09-19T09:30:00+09:00",
        nextAction: "통화하기",
      }),
    ],
    NOW,
  );
  assert.equal(b.newInquiries.length, 1);
  assert.equal(b.newInquiries[0].dLabel, "10일 전 접수");
  // 활동 날수는 그대로 updated_at 기준(오늘 손댔다)
  assert.equal(b.newInquiries[0].daysSinceActivity, 0);
});

test("새 문의: KST 00:30 에 들어온 문의는 UTC 로 전날이어도 「오늘 접수」", () => {
  const b = buildToday(
    [row({ status: "pending", createdAt: "2026-09-19T00:30:00+09:00" })],
    new Date("2026-09-19T08:30:00+09:00"),
  );
  assert.equal(b.newInquiries[0].dLabel, "오늘 접수");
});

test("멈춘 딜 0일은 「0일째 멈춤」이 아니라 「오늘 멈춤」", () => {
  const b = buildToday(
    [
      row({ status: "contacted", updatedAt: "2026-09-19T09:00:00+09:00" }),
      row({ status: "quoted", updatedAt: "2026-09-16T09:00:00+09:00" }),
    ],
    NOW,
  );
  assert.deepEqual(b.stalled.map((i) => i.dLabel), ["3일째 멈춤", "오늘 멈춤"]);
});

// ── F5: 확인 안 된 로그인에는 다음 할 일 글자를 제목으로 쓰지 않는다 ──

test("showNextActionText:false 면 제목은 서비스 이름뿐 — 다음 할 일 글자가 어디에도 없다", () => {
  const rows = [
    row({ nextActionDue: "2026-09-19", nextAction: "예시 고객 1 대표에게 견적 재발송", services: ["웹사이트", "앱"] }),
    row({ nextActionDue: "2026-09-17", nextAction: "예시 고객 2 통화", services: [] }),
    row({ status: "pending", nextAction: "예시 고객 3 확인", services: ["쇼핑몰"] }),
  ];
  const hidden = buildToday(rows, NOW, { showNextActionText: false });
  assert.deepEqual(hidden.today.map((i) => i.title), ["웹사이트 · 앱"]);
  assert.deepEqual(hidden.overdue.map((i) => i.title), ["(내용 없음)"]);
  assert.deepEqual(hidden.newInquiries.map((i) => i.title), ["쇼핑몰"]);
  assert.equal(JSON.stringify(hidden).includes("예시 고객"), false);

  // 기본값(옵션 없음)은 예전처럼 할 일 글자
  const shown = buildToday(rows, NOW);
  assert.equal(shown.today[0].title, "예시 고객 1 대표에게 견적 재발송");
  assert.equal(buildToday(rows, NOW, { showNextActionText: true }).overdue[0].title, "예시 고객 2 통화");
});
