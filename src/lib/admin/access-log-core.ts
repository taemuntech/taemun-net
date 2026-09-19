// 접속기록 **월 1회 점검용 요약** — 순수 모듈(런타임 import 없음). 2026-09-19 가온, 수정 F7.
//
// 왜 요약부터 보여 주나: 관리자 화면을 열 때마다 접속기록이 한 줄씩 쌓여서, 예전처럼 최근 50줄만 보여 주면
// 하루치밖에 안 보였다. 「월 1회 훑어보세요」가 거짓말이었다. 이제 설정 화면은 최근 35일치를 읽고,
// 형이 봐야 할 것 네 가지를 숫자로 먼저 보여 준다 — 로그인 몇 번 · 비밀번호 틀림 몇 번 · 오류/거절 몇 건 ·
// **처음 보는 IP**(기기 목록에 없는 IP 에서 들어온 기록). 줄 목록은 접어 둔다.
//
// 비밀번호 틀림(login_fail)은 줄 목록에서 빼고 건수만 따로 센다 — 누구나 로그인 주소를 두드릴 수 있어
// 그 줄이 진짜 조회·변경 줄을 묻지 않게 한다(로그인 라우트도 IP 당 첫 번째·잠기는 번째만 남긴다).
// scripts/tests/admin-access-log-core.test.mjs 가 규칙을 시험한다.

/** 요약에 필요한 칸만 — AccessLogRow 의 부분집합(서버 모듈을 끌어오지 않으려고 따로 적는다) */
export type AccessLogSummaryRow = { action: string; outcome: string; ip: string };

export type AccessLogSummary = {
  logins: number;
  /** 못 셌으면 null */
  loginFails: number | null;
  /** 결과가 거절·오류인 줄(비밀번호 틀림 제외) */
  problems: number;
  /** 기기 목록에 없는 IP — 많이 나온 순 */
  unknownIps: { ip: string; count: number }[];
};

/** 주소가 아닌 값(비었음·「unknown」)은 「처음 보는 IP」로 세지 않는다 */
function isRealIp(ip: string): boolean {
  const v = ip.trim();
  return v.length > 0 && v.toLowerCase() !== "unknown";
}

export function summarizeAccessLog(
  rows: AccessLogSummaryRow[],
  loginFailCount: number | null,
  knownIps: (string | null)[],
): AccessLogSummary {
  const known = new Set(knownIps.filter((ip): ip is string => typeof ip === "string").map((ip) => ip.trim()));
  let logins = 0;
  let problems = 0;
  const unknown = new Map<string, number>();
  for (const r of rows) {
    if (r.action === "login_fail") continue;
    if (r.action === "login" && r.outcome === "ok") logins += 1;
    if (r.outcome !== "ok") problems += 1;
    const ip = r.ip.trim();
    if (isRealIp(ip) && !known.has(ip)) unknown.set(ip, (unknown.get(ip) ?? 0) + 1);
  }
  const unknownIps = [...unknown.entries()]
    .map(([ip, count]) => ({ ip, count }))
    // 동점은 문자 코드 순 — localeCompare 는 서버·브라우저 언어 설정에 따라 순서가 달라질 수 있다(화면 맞추기 어긋남)
    .sort((a, b) => b.count - a.count || (a.ip < b.ip ? -1 : a.ip > b.ip ? 1 : 0));
  return {
    logins,
    loginFails: typeof loginFailCount === "number" && Number.isFinite(loginFailCount) ? loginFailCount : null,
    problems,
    unknownIps,
  };
}
