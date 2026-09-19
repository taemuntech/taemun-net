// 「오늘」 화면·아침 문자의 **분류 규칙** — 순수 모듈(런타임 import 없음).
//
// 왜 순수로 두나: 날짜 경계가 이 기능의 전부다. 서버는 UTC 라 `getDate()` 로 세면 한국 새벽 0~9시에
// 하루씩 어긋나고(형 PC 는 KST 라 시험에서도 안 보인다), 그 어긋남이 「오늘 할 일」을 어제로 밀어낸다.
// 그래서 날짜는 전부 Intl(Asia/Seoul)로 「YYYY-MM-DD」 글자를 만든 뒤 **글자끼리** 날수를 센다.
// 이 파일은 `node --test` 가 그대로 불러 KST 00:30(= UTC 전날) 경계를 시험한다(scripts/tests/admin-today-core.test.mjs).
//
// 이 화면에는 고객 이름·연락처를 싣지 않는다 — 읽는 칸 자체가 없다(crm-store.listTodayRows 가 고르는 칸).
// 제목은 「다음 할 일」 글자 또는 서비스 이름이다. 단, 다음 할 일 글자에는 형이 고객 이름을 적을 수 있어서
// 기기 행을 확인하지 못한 로그인(sid 없는 옛 쿠키·DB 장애)에는 서비스 이름만 보여 준다(showNextActionText: false).
//
// 파기 지연/예정은 **실제 파기 실행 시각** 기준이다(2026-09-19 수정 F9). 파기는 매일 00:10 KST(15:10 UTC) 한 번 돈다.
// 보관기한이 03:00 인 문의는 그날 00:10 실행이 못 집고 다음 날 00:10 에 지워진다 — 그걸 08:30 에 「지연」이라 부르면
// 멀쩡한 파기를 매번 「실패」로 알리게 된다. 그래서 「지난 실행 때 이미 기한이 지났는데 남은 것」만 지연이다.

export type TodayRow = {
  id: string;
  requestNo: string | null;
  createdAt: string;
  status: string;
  services: string[] | null;
  nextAction: string | null;
  nextActionDue: string | null;
  updatedAt: string | null;
  retainUntil: string | null;
  retentionBasis: string;
  purgedAt: string | null;
};

export type TodayItemKind = "due" | "new" | "stalled";

export type TodayItem = {
  id: string;
  requestNo: string | null;
  kind: TodayItemKind;
  status: string;
  title: string;
  due: string | null;
  dLabel: string;
  daysSinceActivity: number;
};

export type TodayBuckets = {
  todayKst: string;
  overdue: TodayItem[];
  today: TodayItem[];
  within3: TodayItem[];
  within14: TodayItem[];
  newInquiries: TodayItem[];
  stalled: TodayItem[];
  purgeSoon: { count: number; earliest: string | null };
  purgeOverdue: { count: number; requestNos: string[] };
};

const KST_YMD = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** 「2026-09-19」 — Asia/Seoul 기준 날짜. 실행 환경의 시간대와 무관하다 */
export function kstDate(d: Date): string {
  const map: Record<string, string> = {};
  for (const p of KST_YMD.formatToParts(d)) map[p.type] = p.value;
  return `${map.year}-${map.month}-${map.day}`;
}

const YMD_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

function ymdUtcMs(v: string): number {
  const m = YMD_RE.exec(v);
  if (!m) return Number.NaN;
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/** 달력 날수(to − from). 「YYYY-MM-DD」 글자끼리 — 시각·시간대가 끼지 않는다. 못 읽으면 NaN */
export function daysBetween(fromYmd: string, toYmd: string): number {
  return Math.round((ymdUtcMs(toYmd) - ymdUtcMs(fromYmd)) / 86_400_000);
}

/** 0 → 「오늘」, 2 → 「D-2」, −3 → 「3일 지남」 */
export function dLabel(days: number): string {
  if (days === 0) return "오늘";
  if (days > 0) return `D-${days}`;
  return `${-days}일 지남`;
}

const DAY_MS = 86_400_000;
const PURGE_SOON_DAYS = 30;

/** pg_cron 파기 예약 시각 — 매일 15:10 UTC(= 00:10 KST). 마이그레이션의 '10 15 * * *' 와 같아야 한다 */
const PURGE_RUN_UTC_HOUR = 15;
const PURGE_RUN_UTC_MINUTE = 10;

/** now 이전(같은 시각 포함) 가장 최근의 예약 파기 실행 시각(ms) */
export function lastScheduledPurgeRun(now: Date): number {
  const nowMs = now.getTime();
  const todayRun = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), PURGE_RUN_UTC_HOUR, PURGE_RUN_UTC_MINUTE);
  return todayRun <= nowMs ? todayRun : todayRun - DAY_MS;
}

export type BuildTodayOptions = {
  /**
   * 제목에 다음 할 일 글자를 쓸까(기본 true). 기기 행을 확인하지 못한 로그인이면 false —
   * 그 글자에 고객 이름이 들어 있을 수 있어 서비스 이름으로만 제목을 만든다.
   */
  showNextActionText?: boolean;
};

function titleOf(row: TodayRow, showNextActionText: boolean): string {
  const action = showNextActionText ? row.nextAction?.trim() : undefined;
  if (action) return action;
  const services = (row.services ?? []).filter((s) => typeof s === "string" && s.trim().length > 0);
  if (services.length) return services.join(" · ");
  return "(내용 없음)";
}

function msOf(iso: string | null): number {
  if (!iso) return Number.NaN;
  return Date.parse(iso);
}

function byDueThenCreated(a: TodayItem & { createdMs: number }, b: TodayItem & { createdMs: number }): number {
  const due = (a.due ?? "").localeCompare(b.due ?? "");
  if (due !== 0) return due;
  return a.createdMs - b.createdMs;
}

type Working = TodayItem & { createdMs: number };

function strip(items: Working[]): TodayItem[] {
  return items.map(({ createdMs: _createdMs, ...item }) => item);
}

/**
 * 행들을 「오늘」 칸으로 나눈다.
 * - 파기된 행은 어디에도 넣지 않는다.
 * - 다음 할 일 날짜가 있으면(상태 무관) 날짜 칸: 지남(<0)·오늘(0)·3일 안(1~3)·14일 안(4~14). 15일 이상은 안 싣는다.
 * - 날짜가 없고 접수 상태 → 새 문의. 날짜가 없고 연락함·견적 보냄 → 멈춘 딜.
 * - 파기: 보관 근거가 「문의」이고 아직 안 지운 행 중 지난 예약 실행(00:10 KST) **전에** 기한이 끝났으면 지연,
 *   그 뒤 ~ 지금+30일이면 예정. 계약 상태 행은 파기 함수도 건너뛰므로 여기서도 뺀다.
 */
export function buildToday(rows: TodayRow[], now: Date, opts: BuildTodayOptions = {}): TodayBuckets {
  const showNextActionText = opts.showNextActionText !== false;
  const todayKst = kstDate(now);
  const nowMs = now.getTime();
  const lastRunMs = lastScheduledPurgeRun(now);
  const overdue: Working[] = [];
  const today: Working[] = [];
  const within3: Working[] = [];
  const within14: Working[] = [];
  const newInquiries: Working[] = [];
  const stalled: Working[] = [];
  const purgeOverdueRows: { requestNo: string | null; retainMs: number }[] = [];
  let purgeSoonCount = 0;
  let purgeSoonEarliestMs = Number.POSITIVE_INFINITY;

  for (const row of rows) {
    if (row.purgedAt) continue;

    const createdMs = msOf(row.createdAt);
    const activityIso = row.updatedAt ?? row.createdAt;
    const activityMs = msOf(activityIso);
    const daysSinceActivity = Number.isFinite(activityMs) ? Math.max(0, daysBetween(kstDate(new Date(activityMs)), todayKst)) : 0;
    const base = {
      id: row.id,
      requestNo: row.requestNo,
      status: row.status,
      title: titleOf(row, showNextActionText),
      daysSinceActivity,
      createdMs: Number.isFinite(createdMs) ? createdMs : 0,
    };

    const due = row.nextActionDue && YMD_RE.test(row.nextActionDue) ? row.nextActionDue : null;
    if (due) {
      const d = daysBetween(todayKst, due);
      if (Number.isFinite(d)) {
        const item: Working = { ...base, kind: "due", due, dLabel: dLabel(d) };
        if (d < 0) overdue.push(item);
        else if (d === 0) today.push(item);
        else if (d <= 3) within3.push(item);
        else if (d <= 14) within14.push(item);
      }
    } else if (row.status === "pending") {
      // 「N일 전 접수」는 **접수일** 기준이다 — 다음 할 일을 적거나 상태를 오가면 updated_at 이 바뀌어
      // 열흘 된 문의가 「오늘 접수」로 보였다(수정 F10).
      const receivedDays = Number.isFinite(createdMs)
        ? Math.max(0, daysBetween(kstDate(new Date(createdMs)), todayKst))
        : 0;
      newInquiries.push({
        ...base,
        kind: "new",
        due: null,
        dLabel: receivedDays === 0 ? "오늘 접수" : `${receivedDays}일 전 접수`,
      });
    } else if (row.status === "contacted" || row.status === "quoted") {
      stalled.push({
        ...base,
        kind: "stalled",
        due: null,
        dLabel: daysSinceActivity === 0 ? "오늘 멈춤" : `${daysSinceActivity}일째 멈춤`,
      });
    }

    if (row.retentionBasis === "inquiry" && row.status !== "contracted") {
      const retainMs = msOf(row.retainUntil);
      if (Number.isFinite(retainMs)) {
        if (retainMs < lastRunMs) {
          // 지난 예약 실행 때 이미 기한이 지났는데 남아 있다 = 진짜 지연(시험 모드·상한·작업 멈춤)
          purgeOverdueRows.push({ requestNo: row.requestNo, retainMs });
        } else if (retainMs <= nowMs + PURGE_SOON_DAYS * DAY_MS) {
          // 기한이 이미 지났어도 지난 실행 뒤라면 다음 실행(오늘 밤 00:10)이 지운다 — 예정으로 센다
          purgeSoonCount += 1;
          if (retainMs < purgeSoonEarliestMs) purgeSoonEarliestMs = retainMs;
        }
      }
    }
  }

  overdue.sort(byDueThenCreated);
  today.sort(byDueThenCreated);
  within3.sort(byDueThenCreated);
  within14.sort(byDueThenCreated);
  newInquiries.sort((a, b) => b.createdMs - a.createdMs);
  stalled.sort((a, b) => b.daysSinceActivity - a.daysSinceActivity || a.createdMs - b.createdMs);
  purgeOverdueRows.sort((a, b) => a.retainMs - b.retainMs);

  return {
    todayKst,
    overdue: strip(overdue),
    today: strip(today),
    within3: strip(within3),
    within14: strip(within14),
    newInquiries: strip(newInquiries),
    stalled: strip(stalled),
    purgeSoon: {
      count: purgeSoonCount,
      earliest: purgeSoonCount > 0 ? kstDate(new Date(purgeSoonEarliestMs)) : null,
    },
    purgeOverdue: {
      count: purgeOverdueRows.length,
      requestNos: purgeOverdueRows
        .map((r) => r.requestNo)
        .filter((n): n is string => typeof n === "string" && n.length > 0)
        .slice(0, 5),
    },
  };
}
