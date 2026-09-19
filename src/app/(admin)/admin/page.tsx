// 관리자 화면 — 작업물의 공개 상태만 바꾼다. 삭제·내용 수정은 일부러 없다.
//
// 읽기를 여기(서버)에서 끝낸다: 상태 API 가 아직 없어도, DB 표가 아직 없어도 화면은 뜬다.
// 관리자 화면만은 캐시된 스냅숏(getState, 5분)이 아니라 readStateUncached() 를 쓴다 —
// 방금 누른 것이 그대로 보여야 하기 때문이다.

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readAdminSession } from "@/lib/admin/session";
import { FLAG_LABEL, listLog, type LogEntry } from "@/lib/admin/store";
import { existingPublicFile } from "@/lib/portfolio/gallery-items";
import { getPortfolio } from "@/lib/portfolio/registry";
import { KIND_LABEL, industryLabel } from "@/lib/portfolio/schema";
import {
  EMPTY_FLAGS,
  PORTFOLIO_STATUSES,
  STATUS_HELP,
  STATUS_LABEL,
  defaultStatus,
  hasServiceRoleKey,
  readStateUncached,
  resolveStatus,
  type StateSnapshot,
} from "@/lib/portfolio/state";
import type { AdminItem } from "@/components/admin/types";
import AdminView from "./AdminView";

export const metadata: Metadata = {
  title: "관리자",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

/**
 * 못 읽었을 때 **다음에 할 일**을 사람 말로 적는다.
 *
 * 왜: 지금 운영 데이터베이스에 표 3개가 없다. 그 상태로 들어가면 배너가 Postgres 원문
 * (relation "public.portfolio_state" does not exist)만 보여 주고 무엇을 해야 하는지 한 글자도 없다.
 * 게다가 그 순간 쓰기 버튼이 전부 잠긴다. 형은 비개발자이고, 이 화면을 처음 여는 날이 바로 이 상태다.
 */
function stateHintOf(snapshot: StateSnapshot, hasKey: boolean): string | null {
  if (snapshot.ok) return null;
  if (!hasKey) {
    return "Vercel 의 환경변수에 SUPABASE_SERVICE_ROLE_KEY 를 넣고 다시 배포하면 됩니다. 순서는 docs/ADMIN_SETUP.md ②번에 있습니다.";
  }
  const message = snapshot.error ?? "";
  if (message.includes("42P01") || message.includes("does not exist")) {
    return "아직 표를 만들지 않았습니다. Supabase 대시보드의 SQL 편집기에서 supabase/migrations/20260916120000_portfolio_state.sql 을 한 번 실행해 주세요. 순서는 docs/ADMIN_SETUP.md ①번에 있습니다.";
  }
  if (/timeout|aborted|abort|fetch failed|ENOTFOUND|ECONN/i.test(message)) {
    return "데이터베이스가 잠시 느리거나 응답하지 않습니다. 아래 「다시 시도」를 한 번 눌러 보시고, 계속 이러면 Supabase 대시보드에서 서비스 상태를 확인해 주세요.";
  }
  return "아래 「다시 시도」를 눌러 보시고, 그래도 안 되면 docs/ADMIN_SETUP.md 의 점검 순서를 따라가 주세요.";
}

export default async function AdminPage() {
  const session = readAdminSession(await cookies());
  if (!session) redirect("/admin/login");

  const cards = getPortfolio();

  // 상태를 못 읽어도 화면은 떠야 한다 — readStateUncached 는 던지지 않고 ok:false 로 알린다.
  let snapshot: StateSnapshot;
  try {
    snapshot = await readStateUncached();
  } catch (e) {
    snapshot = {
      rows: {},
      flags: EMPTY_FLAGS,
      ok: false,
      error: e instanceof Error ? e.message : String(e),
      fetchedAt: Date.now(),
    };
  }

  // 이력도 여기서 읽는다(전용 API 없이). 실패해도 화면은 뜬다 — 이력 칸에만 이유를 적는다.
  let log: LogEntry[] = [];
  let logError: string | null = null;
  try {
    const result = await listLog(20);
    if (result.ok) log = result.data;
    else logError = result.reason === "no-service-key" ? "서버 설정 오류입니다." : result.message;
  } catch (e) {
    logError = e instanceof Error ? e.message : String(e);
  }

  const items: AdminItem[] = cards
    .map((card, index) => {
      const row = snapshot.rows[card.slug];
      const stored = row?.status ?? defaultStatus(card.kind);
      const effective = resolveStatus(snapshot, card.slug, card.kind);
      return {
        item: {
          slug: card.slug,
          title: card.title,
          subtitle: card.subtitle,
          kind: card.kind,
          kindLabel: KIND_LABEL[card.kind],
          industryLabel: industryLabel(card.industry),
          liveUrl: card.liveUrl,
          thumbnailSrc: existingPublicFile(card.thumbnail.desktop),
          // 상태를 못 읽었으면 저장값을 아는 척하지 않는다 — 지금 실제로 적용 중인 값을 보여 준다
          status: snapshot.ok ? stored : effective,
          effectiveStatus: effective,
          featured: row?.featured ?? card.featured ?? false,
          sortOrder: row?.sortOrder ?? null,
          updatedAt: row?.updatedAt ?? "",
          updatedBy: row?.updatedBy ?? "",
        } satisfies AdminItem,
        // 정렬 키: DB 순서 > JSON order > 원래 자리
        key: row?.sortOrder ?? card.order ?? 1000 + index,
        index,
        // **제안 시안을 맨 위로.** 회사 이름이 걸린 것이 위험한 것들이고, 항의 전화를 받으며 급히
        // 찾는 것도 그것들이다. 예전에는 3·5·7번째에 흩어져 있어 폰에서 카드 4장을 지나야 했다.
        group: card.kind === "proposal" ? 0 : 1,
      };
    })
    .sort((a, b) => a.group - b.group || a.key - b.key || a.index - b.index)
    .map((e) => e.item);

  return (
    <AdminView
      items={items}
      flags={snapshot.flags}
      stateOk={snapshot.ok}
      stateError={snapshot.error ?? null}
      stateHint={stateHintOf(snapshot, hasServiceRoleKey())}
      hasServiceRole={hasServiceRoleKey()}
      fixture={snapshot.fixture === true}
      statuses={[...PORTFOLIO_STATUSES]}
      statusLabel={STATUS_LABEL}
      statusHelp={STATUS_HELP}
      flagLabel={FLAG_LABEL}
      actor={session.actor}
      log={log}
      logError={logError}
    />
  );
}
