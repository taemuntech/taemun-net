// 한국 시간(KST) 날짜 — 서버·브라우저의 로컬 시간대와 무관하게 Asia/Seoul 기준으로 뽑는다.
//
// 왜: Vercel 서버는 UTC 라 `new Date().getDate()` 는 한국 새벽 0~9시에 하루 전 날짜를 준다.
// 접수번호(TM-YYMMDD-NN)의 날짜가 형이 보는 날짜와 어긋나면 안 된다.
// ⚠️ 외부 import 를 두지 않는다 — node 로 바로 시험한다(TZ=UTC 로 돌려 볼 것).

const PARTS = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export type KstParts = { year: string; month: string; day: string; hour: string; minute: string };

export function kstParts(date: Date = new Date()): KstParts {
  const map: Record<string, string> = {};
  for (const p of PARTS.formatToParts(date)) map[p.type] = p.value;
  return { year: map.year, month: map.month, day: map.day, hour: map.hour, minute: map.minute };
}

/** 「260919」 — 접수번호에 쓰는 KST 날짜 */
export function kstYymmdd(date: Date = new Date()): string {
  const { year, month, day } = kstParts(date);
  return `${year.slice(2)}${month}${day}`;
}

/** KST 그날 0시의 UTC 시각 — 「오늘 접수분」을 세는 범위 시작 */
export function kstMidnightUtc(date: Date = new Date()): Date {
  const { year, month, day } = kstParts(date);
  return new Date(`${year}-${month}-${day}T00:00:00+09:00`);
}

/** 「2026년 9월 19일 오후 2:05」 — 화면 표시용 */
export function formatKstLong(date: Date = new Date()): string {
  const { year, month, day, hour, minute } = kstParts(date);
  const h = Number(hour);
  const period = h < 12 ? "오전" : "오후";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${year}년 ${Number(month)}월 ${Number(day)}일 ${period} ${h12}:${minute}`;
}
