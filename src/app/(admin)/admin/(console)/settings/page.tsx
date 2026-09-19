// 관리자 설정 화면 — 2026-09-19 가온, 관리자 개편 P1b.
//
// 여기 모인 것: 로그인한 기기(원격 로그아웃) · 개인정보 자동 파기(시험/실행) · 아침 요약 문자 상태 · 접속 기록 · 유출 대응.
// 왜 한 화면인가: 전부 「평소엔 안 보지만, 일이 터졌을 때 한 번에 찾아야 하는 것」이다.
// 폰을 잃어버렸을 때 → 다른 기기로 들어와 「이 기기 말고 모두 로그아웃」. 유출이 의심될 때 → 접속 기록과 대응 순서.
//
// ⚠️ 접속 기록에 IP·기기 정보가 있어 개인정보 등급(pii)으로 연다 — 옛 쿠키(기기 번호 없음)는 한 번 다시 로그인해야 한다.
// ⚠️ 각 칸은 따로 읽는다. 하나를 못 읽어도(예: 마이그레이션 전) 나머지 칸과 로그아웃 버튼은 떠야 한다.
// 접속 기록은 **최근 35일**(월 1회 점검 + 여유)을 최대 1000줄 읽는다. 비밀번호 틀림은 줄로 읽지 않고 건수만 센다
// — 누구나 로그인 주소를 두드릴 수 있어 그 줄이 진짜 조회·변경 줄을 밀어내면 안 된다(수정 F6·F7).

import type { Metadata } from "next";
import { logAccess, requireAdminPage } from "@/lib/admin/guard";
import {
  ACCESS_LOG_MAX_LIMIT,
  countAccessLog,
  getCrmSettings,
  listAccessLog,
  listAdminSessions,
  listPurgeLog,
  type CrmFailure,
} from "@/lib/admin/crm-store";
import { SettingsView } from "./SettingsView";

export const metadata: Metadata = {
  title: "설정",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function failureText(f: CrmFailure, what: string): string {
  if (f.reason === "no-service-key") return "서버 설정 오류입니다. (SUPABASE_SERVICE_ROLE_KEY 없음)";
  return `${what}을 읽지 못했습니다. 관리대장 마이그레이션을 적용했는지 확인해 주세요.`;
}

/** 접속 기록 점검 창 — 월 1회 훑어보는데 달마다 날수가 달라 며칠 여유를 둔다 */
const ACCESS_LOG_DAYS = 35;

export default async function AdminSettingsPage() {
  const ctx = await requireAdminPage({ scope: "pii", route: "/admin/settings" });

  const now = new Date();
  const sinceIso = new Date(now.getTime() - ACCESS_LOG_DAYS * 86_400_000).toISOString();
  const [sessions, settings, purgeLog, accessLog, loginFails] = await Promise.all([
    listAdminSessions(),
    getCrmSettings(),
    listPurgeLog(10),
    listAccessLog({ sinceIso, limit: ACCESS_LOG_MAX_LIMIT, excludeActions: ["login_fail"] }),
    countAccessLog({ sinceIso, action: "login_fail" }),
  ]);

  logAccess(ctx, { action: "view", resource: "settings" });

  return (
    <SettingsView
      nowIso={now.toISOString()}
      currentSessionId={ctx.sessionId}
      sessions={sessions.ok ? sessions.data : null}
      sessionsError={sessions.ok ? null : failureText(sessions, "기기 목록")}
      settings={settings.ok ? settings.data : null}
      settingsError={settings.ok ? null : failureText(settings, "파기 설정")}
      purgeLog={purgeLog.ok ? purgeLog.data : null}
      purgeLogError={purgeLog.ok ? null : failureText(purgeLog, "파기 기록")}
      accessLog={accessLog.ok ? accessLog.data : null}
      accessLogError={accessLog.ok ? null : failureText(accessLog, "접속 기록")}
      accessLogDays={ACCESS_LOG_DAYS}
      accessLogTruncated={accessLog.ok && accessLog.data.length >= ACCESS_LOG_MAX_LIMIT}
      loginFailCount={loginFails.ok ? loginFails.data : null}
      hasCronSecret={Boolean(process.env.CRON_SECRET)}
    />
  );
}
