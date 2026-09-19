// 견적 접수(/api/inquiry)의 **판단만** 모은 순수 모듈 — 런타임 import 없음. 2026-09-20 가온, 오픈 주간 P1-5·6.
//
// 왜 따로 두나:
// - 「진짜 고객 문의가 소리 없이 사라지지 않는다」가 이 작업의 목표다. 그 규칙(한도 넘으면 문자를 어떻게 하나,
//   실패 기록을 어떻게 합치나, 문자가 LMS 한도를 넘지 않게 어떻게 자르나)이 route 안에 섞여 있으면 시험할 수가 없다.
//   scripts/tests/inquiry-intake-core.test.mjs 가 이 파일을 node 로 바로 불러 규칙을 못 박는다.
// - 관리자 화면(오늘·설정)과 아침 문자(digest-core)도 같은 기록을 읽는다. 읽는 규칙이 두 벌이면 배너는 「3건」,
//   문자는 「2건」이라고 말하는 날이 생긴다.
//
// 🔒 기록(crm_settings.intake_alert)에는 **건수·시각·접수번호만** 싣는다. 고객 이름·연락처·내용·DB 오류 원문은
//   넣지 않는다 — 설정 표는 관리자 화면 여러 곳이 통째로 읽는다.

// ── 1. 사이트 전체 1시간 한도 → 문자만 묶는다 ────────────────────────────────
//
// 예전(09-18)에는 한 시간에 30건이 넘으면 **접수 자체를 429 로 거절**했다. 번호만 바꿔 30건을 채우는 스크립트 하나로
// 그 한 시간 동안 진짜 고객이 전부 「지금은 온라인 접수를 받을 수 없습니다」를 받았다(오픈 점검 P1-5).
// 이제 접수는 늘 저장하고, 한도를 넘은 뒤로는 **건마다 가는 알림 문자만** 건너뛴다(형 휴대폰에 문자 폭탄이 안 오게).
// 2026-09-20 (오픈 점검 후속): 예전엔 「저장 전 1시간 건수가 **딱** 한도」인 한 건에만 안내 문자를 보냈다. 요청이 동시에 오면
// 여럿이 같은 건수를 읽거나 29 → 31 로 건너뛰어, 아무도 30 을 못 보면 안내 없이 문자가 끊기고(형은 이유를 모른다)
// 여럿이 30 을 보면 안내가 여러 통 갔다. 이제 한도 이상이면 전부 over_cap 이고, 안내 문자는 **기록(crm_settings)을 바꾸는
// 값 비교 쓰기에 성공한 한 요청**만 보낸다 — shouldSendCapNotice 를 그 쓰기 안에서 판단한다(crm-store.recordOverCap).
// 건수를 세는 쿼리가 실패했으면(null) 한도 밖으로 보지 않는다: 알림이 한 통 더 가는 쪽이 문의를 모르고 지나가는 쪽보다 싸다.

export type NotifyDecision = "send" | "over_cap";

/**
 * @param hourlyCountBefore 이 건을 저장하기 **전** 최근 1시간 접수 수(못 셌으면 null)
 * @param cap 사이트 전체 1시간 한도(route 의 GLOBAL_HOURLY_MAX)
 */
export function decideNotify(hourlyCountBefore: number | null, cap: number): NotifyDecision {
  if (hourlyCountBefore === null || !Number.isFinite(hourlyCountBefore)) return "send";
  return hourlyCountBefore < cap ? "send" : "over_cap";
}

const HOUR_MS = 60 * 60 * 1000;

function msOf(iso: string): number {
  const t = Date.parse(iso);
  return Number.isFinite(t) ? t : Number.NaN;
}

/**
 * 한도 안내 문자를 보낼 차례인가 — 기록에 **쓰기 직전의** over_cap 묶음(prev)을 보고 정한다.
 * 묶음이 없거나, 형이 이미 확인했거나(새 묶음이 열린다), 마지막 초과가 1시간보다 오래됐으면(새 도배) 보낸다.
 * 열려 있는 최근 묶음이면 이미 누가 보냈다 — 보내지 않는다. 값 비교 쓰기에 성공한 한 요청만 이 답을 쓰므로 한 통이다.
 */
export function shouldSendCapNotice(prev: IntakeAlert | undefined, nowIso: string): boolean {
  if (!prev || prev.acknowledgedAt !== null) return true;
  const last = msOf(prev.lastAt);
  const now = msOf(nowIso);
  if (!Number.isFinite(last) || !Number.isFinite(now)) return true;
  return now - last > HOUR_MS;
}

// ── 1-b. 「저장 실패」 문자 상한 ────────────────────────────────────────
//
// 왜: 저장 실패 문자는 그 문의의 유일한 기록이라 보내야 하지만, 상한이 없으면 두 가지로 샌다.
//   · 누구나 저장이 실패하는 요청(예: DB 가 거절하는 글자)을 되풀이해 형 휴대폰으로 **자기가 쓴 글**을 LMS 로 무한히 보낼 수 있었다
//     (솔라피 잔액으로). 번호·시간 한도는 저장된 행만 세므로 실패한 요청은 세지 않는다.
//   · 진짜 DB 장애 때 고객이 「다시 시도」할 때마다 같은 문의로 문자가 또 갔다.
// 그래서 (1) 기록(crm_settings.intake_alert)의 열린 save_fail 묶음이 최근 1시간에 이미 N건이면 문자 없이 기록만,
// (2) 기록을 못 읽을 때를 대비해 인스턴스마다 창(window) 안 발송 수를 따로 센다, (3) 같은 번호는 짧은 창 안에 한 번만.
// 앞 N건의 문자로 형은 「지금 저장이 안 된다」를 이미 안다 — 그 뒤는 배너·아침 문자가 알린다.

/** 기록에서 본 save_fail 묶음이 이미 이만큼이면(1시간 안에 시작한 열린 묶음) 문자를 더 보내지 않는다 */
export const SAVE_FAIL_SMS_MAX_PER_HOUR = 5;

export function saveFailSmsAllowedByRecord(
  map: IntakeAlertMap | null,
  nowIso: string,
  max: number = SAVE_FAIL_SMS_MAX_PER_HOUR,
): boolean {
  const cur = map?.save_fail;
  if (!cur || cur.acknowledgedAt !== null) return true;
  const first = msOf(cur.firstAt);
  const now = msOf(nowIso);
  if (!Number.isFinite(first) || !Number.isFinite(now)) return cur.count < max;
  if (now - first > HOUR_MS) return true;
  return cur.count < max;
}

/**
 * 인스턴스 안 발송 창 — times 는 이 창 안에서 이미 보낸 시각(ms). 원래 배열은 건드리지 않는다.
 * 서버리스라 인스턴스마다 따로 세지만, 기록을 못 읽을 때(키 없음·DB 장애)의 마지막 울타리다.
 */
export function slidingWindowAllow(
  times: readonly number[],
  nowMs: number,
  windowMs: number,
  max: number,
): { allowed: boolean; times: number[] } {
  const kept = times.filter((t) => nowMs - t < windowMs);
  if (kept.length >= max) return { allowed: false, times: kept };
  return { allowed: true, times: [...kept, nowMs] };
}

// ── 2. LMS 2,000바이트 맞추기 ────────────────────────────────────────────
//
// 왜: 알림 문자가 LMS 한도를 넘으면 통째로 안 간다. 입력 한도(서비스 10개×60자·주소 300자·내용은 400자로 자름)를
// 다 채우면 넘을 수 있다 — 저장 실패 문자는 **그 문자 하나가 유일한 기록**이라 안 가면 문의가 사라진다.
// 한글은 2바이트(EUC-KR 기준), 이모지 같은 확장 문자는 넉넉히 4바이트로 센다. 넘으면 **뒤에서** 자른다 —
// 문자 끝줄이 문의 내용이라 연락처·서비스 줄은 남는다.

export const LMS_MAX_BYTES = 2000;
const TRIM_MARK = "…(잘림)";

export function smsBytes(text: string): number {
  let n = 0;
  for (const ch of text) {
    const cp = ch.codePointAt(0) ?? 0;
    n += cp <= 0x7f ? 1 : cp > 0xffff ? 4 : 2;
  }
  return n;
}

export function fitLms(text: string, maxBytes: number = LMS_MAX_BYTES): string {
  if (smsBytes(text) <= maxBytes) return text;
  const budget = maxBytes - smsBytes(TRIM_MARK);
  let used = 0;
  let out = "";
  for (const ch of text) {
    const cp = ch.codePointAt(0) ?? 0;
    const b = cp <= 0x7f ? 1 : cp > 0xffff ? 4 : 2;
    if (used + b > budget) break;
    used += b;
    out += ch;
  }
  return `${out}${TRIM_MARK}`;
}

/** 저장 실패 때 형에게 가는 문자 머리말 — 이 문자가 그 문의의 유일한 기록이라는 것을 첫 줄에서 알린다 */
export const SAVE_FAIL_PREFIX = "[저장 실패 — 이 문자로만 남았습니다]";

export function saveFailSmsText(adminText: string): string {
  return fitLms(`${SAVE_FAIL_PREFIX}\n${adminText}`);
}

/** 한도에 막 닿았을 때 한 통 — 숫자와 주소만(고객 정보 없음) */
export function capNoticeSmsText(cap: number, url: string): string {
  return `[태문넷] 1시간 접수가 ${cap}건을 넘었습니다. 이후 접수는 문자 없이 저장됩니다.\n${url}`;
}

// ── 3. 접수 이상 기록(crm_settings.intake_alert) ───────────────────────────
//
// 모양: { sms_fail?: IntakeAlert, save_fail?: IntakeAlert, over_cap?: IntakeAlert } — 종류마다 한 칸.
// 왜 종류별로 합치나: 솔라피가 한나절 죽으면 실패가 수십 번 난다. 한 줄씩 쌓으면 설정 값이 끝없이 커지고,
// 형이 보고 싶은 것은 「무슨 일이 몇 번, 처음·마지막 언제」뿐이다.
// 형이 「확인했습니다」를 누르면 acknowledgedAt 이 찍히고, 그 뒤 같은 종류가 또 나면 **새 묶음**(count 1)으로 다시 연다.
// — 확인한 옛 건수에 새 건수를 이어 붙이면 「또 났다」가 안 보인다.

export const INTAKE_ALERT_KINDS = ["sms_fail", "save_fail", "over_cap"] as const;
export type IntakeAlertKind = (typeof INTAKE_ALERT_KINDS)[number];

export type IntakeAlert = {
  kind: IntakeAlertKind;
  firstAt: string;
  lastAt: string;
  count: number;
  /** 저장이 됐으면 그 접수번호. 저장 실패는 번호가 없어 null */
  lastRequestNo: string | null;
  acknowledgedAt: string | null;
};

export type IntakeAlertMap = Partial<Record<IntakeAlertKind, IntakeAlert>>;

/**
 * count: 이 사건이 몇 건을 대표하나(기본 1). 한도 초과는 인스턴스가 몇 건씩 모아 한 번에 쓴다(route 의 over_cap 묶어 쓰기) —
 * 도배 요청마다 기록 쓰기를 돌리면 요청 하나에 DB 왕복이 최대 8번 붙고 같은 행을 두고 서로 밀어내 건수가 사라진다.
 */
export type IntakeAlertEvent = { kind: IntakeAlertKind; at: string; requestNo: string | null; count?: number };

function isKind(v: unknown): v is IntakeAlertKind {
  return typeof v === "string" && (INTAKE_ALERT_KINDS as readonly string[]).includes(v);
}

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

const REQUEST_NO_RE = /^TM-\d{6}-\d{2,}$/;

function parseOne(kind: IntakeAlertKind, v: unknown): IntakeAlert | null {
  if (!isObj(v)) return null;
  if (typeof v.firstAt !== "string" || typeof v.lastAt !== "string") return null;
  const count = typeof v.count === "number" && Number.isFinite(v.count) && v.count > 0 ? Math.floor(v.count) : null;
  if (count === null) return null;
  return {
    kind,
    firstAt: v.firstAt,
    lastAt: v.lastAt,
    count,
    lastRequestNo: typeof v.lastRequestNo === "string" && REQUEST_NO_RE.test(v.lastRequestNo) ? v.lastRequestNo : null,
    acknowledgedAt: typeof v.acknowledgedAt === "string" ? v.acknowledgedAt : null,
  };
}

/** crm_settings.intake_alert 글자 → 종류별 기록. 모양이 이상한 칸은 버린다(화면이 깨지지 않게) */
export function parseIntakeAlerts(raw: string | null | undefined): IntakeAlertMap {
  if (!raw) return {};
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return {};
  }
  if (!isObj(v)) return {};
  const out: IntakeAlertMap = {};
  for (const kind of INTAKE_ALERT_KINDS) {
    const one = parseOne(kind, v[kind]);
    if (one) out[kind] = one;
  }
  return out;
}

/** 사건 하나를 기록에 합친다. 원래 기록은 건드리지 않고 새 객체를 돌려준다 */
export function mergeIntakeAlert(map: IntakeAlertMap, ev: IntakeAlertEvent): IntakeAlertMap {
  if (!isKind(ev.kind)) return map;
  const prev = map[ev.kind];
  const requestNo = ev.requestNo && REQUEST_NO_RE.test(ev.requestNo) ? ev.requestNo : null;
  const add = typeof ev.count === "number" && Number.isFinite(ev.count) && ev.count >= 1 ? Math.floor(ev.count) : 1;
  const next: IntakeAlert =
    prev && prev.acknowledgedAt === null
      ? {
          ...prev,
          // 동시에 들어온 호출이 순서가 바뀌어도 마지막 시각이 뒤로 가지 않게
          lastAt: ev.at > prev.lastAt ? ev.at : prev.lastAt,
          firstAt: ev.at < prev.firstAt ? ev.at : prev.firstAt,
          count: prev.count + add,
          lastRequestNo: requestNo ?? prev.lastRequestNo,
        }
      : { kind: ev.kind, firstAt: ev.at, lastAt: ev.at, count: add, lastRequestNo: requestNo, acknowledgedAt: null };
  return { ...map, [ev.kind]: next };
}

/** 화면이 「확인했습니다」를 누를 때 **그려 놓았던** 칸마다의 건수·마지막 시각 */
export type IntakeAlertSeen = Partial<Record<IntakeAlertKind, { lastAt: string; count: number }>>;

/**
 * 「확인했습니다」 — 형이 **본 것만** 확인으로 찍는다(이미 확인한 칸의 옛 시각은 그대로).
 * 왜 seen 을 받나: 예전엔 지금 DB 값의 열린 칸 전부에 시각을 찍었다. 화면을 열어 둔 사이에 저장 실패가 새로 나면
 * 형이 본 적 없는 그 건까지 확인돼 배너·아침 문자에서 사라졌다 — 문자로만 남은 문의의 유일한 알림이 꺼졌다.
 * 이제 칸마다 「본 건수 이하 · 본 마지막 시각 이하」일 때만 찍고, 그 뒤 늘었으면 열어 둔다.
 * 건수도 보는 까닭: 늦게 도착한 기록(after)은 시각이 앞이라 lastAt 은 그대로인 채 건수만 오른다(merge 가 lastAt 을 최댓값으로 둔다).
 * seen 을 부풀려 보내도 예전 동작(전부 확인)보다 넓어지지 않는다.
 */
export function acknowledgeIntakeAlerts(map: IntakeAlertMap, at: string, seen: IntakeAlertSeen): IntakeAlertMap {
  const out: IntakeAlertMap = {};
  for (const kind of INTAKE_ALERT_KINDS) {
    const a = map[kind];
    if (!a) continue;
    const s = seen[kind];
    const sawIt = Boolean(s && a.count <= s.count && a.lastAt <= s.lastAt);
    out[kind] = a.acknowledgedAt === null && sawIt ? { ...a, acknowledgedAt: at } : a;
  }
  return out;
}

/** seen 기준으로 실제로 확인될 칸들의 건수 합 · 새로 늘어 열어 둔 칸 수 */
export function acknowledgeSummary(map: IntakeAlertMap, seen: IntakeAlertSeen): { acknowledged: number; keptOpen: number } {
  let acknowledged = 0;
  let keptOpen = 0;
  for (const a of openIntakeAlerts(map)) {
    const s = seen[a.kind];
    if (s && a.count <= s.count && a.lastAt <= s.lastAt) acknowledged += a.count;
    else keptOpen += 1;
  }
  return { acknowledged, keptOpen };
}

/** 확인 안 한 기록 — 급한 순서(저장 실패 → 문자 실패 → 한도 초과) */
export function openIntakeAlerts(map: IntakeAlertMap): IntakeAlert[] {
  const order: IntakeAlertKind[] = ["save_fail", "sms_fail", "over_cap"];
  return order.map((k) => map[k]).filter((a): a is IntakeAlert => Boolean(a && a.acknowledgedAt === null));
}

/** 확인 안 한 사건 수 합 — 아침 문자 「접수 이상 N건」 */
export function openIntakeAlertCount(map: IntakeAlertMap): number {
  return openIntakeAlerts(map).reduce((sum, a) => sum + a.count, 0);
}

/**
 * 배너·설정 화면 한 줄. 시각 글자는 부르는 쪽이 KST 로 만들어 넘긴다(이 파일은 런타임 import 가 없다).
 * 「실시간」 같은 과장 없이 사실(건수·마지막 시각·접수번호)만 적는다.
 */
export function intakeAlertLabel(a: IntakeAlert, lastAtText: string): string {
  const no = a.lastRequestNo ? ` · ${a.lastRequestNo}` : "";
  switch (a.kind) {
    case "sms_fail":
      return `접수 알림 문자 ${a.count}건 실패 · 마지막 ${lastAtText}${no}`;
    case "save_fail":
      return `저장 실패 ${a.count}건 — 문자로만 남음 · 마지막 ${lastAtText}`;
    case "over_cap":
      return `1시간 접수 한도 초과 ${a.count}건 — 문자 없이 저장됨 · 마지막 ${lastAtText}${no}`;
  }
}
