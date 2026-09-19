// 관리대장 설정 — 「개인정보 자동 파기」 모드와 「접수 이상 확인」 두 가지.
// POST { key: "purge_mode", value: "dry_run" | "live" } → 200 { success:true, from, to }
// POST { key: "intake_alert", action: "ack", seen }      → 200 { success:true, acknowledged, keptOpen }  (2026-09-20)
//
// - dry_run(시험 모드, 기본값): 매일 00:10 KST 에 파기 대상을 **세기만** 하고 purge_log 에 남긴다.
// - live(실행 모드): 보관기한(접수일+1년)이 지난 문의의 이름·연락처·내용을 실제로 지운다. **되돌릴 수 없다.**
// 실제 파기는 DB 함수 crm_purge_due(pg_cron)가 한다. 여기서는 스위치만 바꾼다.
//
// 🔒 접속기록을 **먼저** 쓰고, 못 쓰면(503) 바꾸지 않는다 — 「누가 파기를 켰나」가 안 남는 변경은 없다.

import { NextResponse, type NextRequest } from "next/server";
import { parseSettingsBody } from "@/lib/admin/crm-input";
import { acknowledgeIntakeAlert, getCrmSettings, setPurgeMode } from "@/lib/admin/crm-store";
import { logAccessSync, requireAdminApi } from "@/lib/admin/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const gate = await requireAdminApi(req, { scope: "pii", write: true });
  if (!gate.ok) return gate.response;
  const { ctx } = gate;

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  const input = parseSettingsBody(body);
  if (!input.ok) return NextResponse.json({ error: input.error }, { status: 400 });

  // 접수 이상 「확인했습니다」 — 알림 문자 실패·저장 실패·한도 초과를 형이 봤다는 표시.
  // 파기 스위치와 같은 원칙으로 접속기록을 **먼저** 쓰고, 못 쓰면 바꾸지 않는다: 「누가 경보를 껐나」가 안 남는
  // 확인은 없다(경보를 끄는 것은 곧 「문의를 잃었을 수 있다」는 사실을 지우는 일이다).
  if (input.key === "intake_alert") {
    const logged = await logAccessSync(ctx, {
      action: "setting",
      resource: "crm_settings",
      resourceId: "intake_alert",
      detail: "intake_alert ack",
    });
    if (!logged) {
      return NextResponse.json(
        { error: "접속기록을 남기지 못해 바꾸지 않았습니다. 잠시 뒤 다시 시도해 주세요." },
        { status: 503 },
      );
    }
    const acked = await acknowledgeIntakeAlert(ctx.actor, input.seen);
    if (!acked.ok) {
      const status = acked.reason === "no-service-key" ? 503 : 502;
      return NextResponse.json({ error: status === 503 ? "서버 설정 오류입니다." : "저장하지 못했습니다." }, { status });
    }
    return NextResponse.json({
      success: true,
      acknowledged: acked.data.acknowledged,
      keptOpen: acked.data.keptOpen,
    });
  }

  // 기록에 「무엇에서 무엇으로」를 남기려고 지금 값을 먼저 읽는다
  const current = await getCrmSettings();
  if (!current.ok) {
    const status = current.reason === "no-service-key" ? 503 : 502;
    return NextResponse.json(
      { error: status === 503 ? "서버 설정 오류입니다." : "설정을 읽지 못했습니다." },
      { status },
    );
  }
  const from = current.data.purgeMode;

  const logged = await logAccessSync(ctx, {
    action: "setting",
    resource: "crm_settings",
    resourceId: "purge_mode",
    detail: `purge_mode ${from}→${input.value}`,
  });
  if (!logged) {
    return NextResponse.json(
      { error: "접속기록을 남기지 못해 바꾸지 않았습니다. 잠시 뒤 다시 시도해 주세요." },
      { status: 503 },
    );
  }

  const result = await setPurgeMode(input.value, ctx.actor);
  if (!result.ok) {
    const status = result.reason === "no-service-key" ? 503 : 502;
    return NextResponse.json({ error: status === 503 ? "서버 설정 오류입니다." : "저장하지 못했습니다." }, { status });
  }
  return NextResponse.json({ success: true, from: result.data.from, to: result.data.to });
}
