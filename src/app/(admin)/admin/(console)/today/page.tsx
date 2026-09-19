// 관리자 「오늘」 화면 — 2026-09-19 가온, 관리자 개편 P1b.
//
// 왜 이 화면이 첫 화면인가:
// - 문의가 쌓이면 형이 매번 목록을 끝까지 내려 보며 「이 건 연락했었나」를 기억으로 가려야 한다. 딜은 그 사이에 식는다.
//   그래서 로그인하면 **오늘 챙길 것만** 먼저 보여 준다 — 날짜가 지난 할 일, 오늘 할 일, 새 문의, 멈춘 딜.
// - 아침 문자(/api/cron/digest)와 **같은 분류 규칙**(today-core.buildToday)을 쓴다. 문자에 「지남 2」가 왔는데
//   화면에 1건만 보이는 일이 없게 규칙을 한 곳에 둔다.
//
// ⚠️ 이 화면에는 고객 이름·연락처를 싣지 않는다 — listTodayRows 가 그 칸을 아예 읽지 않는다.
//    그래서 기본 등급(basic)으로 연다. 이름·연락처는 줄을 눌러 들어간 문의 화면(개인정보 등급)에서만 보인다.
// ⚠️ 날짜 경계는 전부 KST 다(today-core). 서버는 UTC 라 getDate() 로 세면 한국 새벽에 하루 어긋난다.
// ⚠️ 「다음 할 일」 글자에는 형이 고객 이름을 적을 수 있다(접속기록에도 안 남기는 글자다). basic 등급은
//    sid 없는 옛 쿠키·기기 확인 실패도 들여보내므로, 기기 행을 **확인한** 로그인(ctx.sessionChecked)에만 그 글자를
//    제목으로 보여 준다. 아니면 서비스 이름으로만 제목을 만들고 「다시 로그인하면 보입니다」를 적는다.

import type { Metadata } from "next";
import { logAccess, requireAdminPage } from "@/lib/admin/guard";
import { getCrmSettings, listTodayRows } from "@/lib/admin/crm-store";
import { buildToday, kstDate, type TodayBuckets } from "@/lib/admin/today-core";
import { purgeIsStale } from "@/lib/admin/digest-core";
import { openIntakeAlerts, intakeAlertLabel } from "@/lib/inquiry/intake-core";
import { agoLabel, formatKstMonthDayTime } from "@/components/admin/types";
import { TodayView, type TodayPurgeSummary } from "./TodayView";

export const metadata: Metadata = {
  title: "오늘",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminTodayPage() {
  const ctx = await requireAdminPage({ scope: "basic", route: "/admin/today" });

  const now = new Date();
  const nowIso = now.toISOString();
  const [rowsResult, settingsResult] = await Promise.all([listTodayRows(), getCrmSettings()]);

  let buckets: TodayBuckets | null = null;
  let error: string | null = null;
  if (rowsResult.ok) {
    buckets = buildToday(rowsResult.data, now, { showNextActionText: ctx.sessionChecked });
  } else if (rowsResult.reason === "no-service-key") {
    error = "서버 설정 오류입니다. Vercel 환경변수에 SUPABASE_SERVICE_ROLE_KEY 가 있어야 목록을 읽습니다.";
  } else {
    // 표가 없으면(마이그레이션 전) 여기로 온다 — 다음에 할 일을 같이 적는다
    error = `오늘 목록을 읽지 못했습니다. 관리대장 마이그레이션(20260919120000_admin_crm_p1.sql)을 적용했는지 확인해 주세요. (${rowsResult.message})`;
  }

  let purge: TodayPurgeSummary | null = null;
  let purgeStale = false;
  // 접수 이상(2026-09-20) — 확인 안 한 것만 한 줄씩. 시각은 KST 로 여기서 글자로 만든다(서버가 그린 글자를 그대로 보인다).
  // 글자에는 건수·시각·접수번호만 있다(고객 이름·연락처 없음) — 이 화면이 basic 등급이라도 괜찮은 이유.
  let intakeAlerts: string[] = [];
  if (settingsResult.ok) {
    const s = settingsResult.data;
    intakeAlerts = openIntakeAlerts(s.intakeAlerts).map((a) => intakeAlertLabel(a, formatKstMonthDayTime(a.lastAt)));
    // 기록 행이 없으면 기록 쓰기가 전부 실패하는 중이다(마이그레이션 전) — 배너가 없는 것을 「이상 없음」으로 읽지 않게 한 줄 띄운다
    if (!s.intakeAlertReady) {
      intakeAlerts.unshift("접수 이상 기록을 아직 쓸 수 없습니다 — 마이그레이션 20260920090000_intake_alert.sql 을 적용해 주세요.");
    }
    purgeStale = purgeIsStale(s.purgeLastRun, s.purgeSelftest, now);
    purge = {
      mode: s.purgeMode,
      lastRunAgo: agoLabel(s.purgeLastRun, nowIso),
    };
  }

  if (buckets) {
    // 이 화면에 뜬 문의만 접속 기록에 남긴다(누가 어떤 건을 봤는지). 이름·연락처는 이 화면에 없다.
    const ids = [
      ...buckets.overdue,
      ...buckets.today,
      ...buckets.within3,
      ...buckets.within14,
      ...buckets.newInquiries,
      ...buckets.stalled,
    ].map((i) => i.id);
    logAccess(ctx, { action: "view", resource: "today", subjectIds: [...new Set(ids)] });
  } else {
    logAccess(ctx, { action: "view", resource: "today", outcome: "error", detail: "today rows unavailable" });
  }

  return (
    <TodayView
      todayKst={buckets?.todayKst ?? kstDate(now)}
      buckets={buckets}
      error={error}
      purge={purge}
      purgeError={settingsResult.ok ? null : "파기 설정을 읽지 못했습니다."}
      purgeStale={purgeStale}
      intakeAlerts={intakeAlerts}
      nextActionHidden={!ctx.sessionChecked}
    />
  );
}
