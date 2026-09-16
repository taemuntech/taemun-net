// 관리자 화면이 주고받는 모양 — 서버 page 가 만들고 클라이언트 뷰가 받는다.
// **직렬화 가능한 값만** 담는다(아이콘·함수 금지). state.ts 는 next/cache 를 끌고 오므로
// 클라이언트에서 값(STATUS_LABEL 등)을 import 하지 않고 여기 props 로 받아 쓴다. 타입만 `import type` 으로 가져온다.

import type { VerifyCheck } from "@/app/api/admin/verify/route";
import type { LogEntry } from "@/lib/admin/store";
import type { PortfolioKind } from "@/lib/portfolio/schema";
import type { PortfolioFlags, PortfolioStatus } from "@/lib/portfolio/state";

// verify 라우트·store 가 내보내는 모양을 그대로 쓴다(같은 모양을 두 벌 적지 않는다).
export type { LogEntry, VerifyCheck };

export type AdminItem = {
  slug: string;
  title: string;
  subtitle: string;
  kind: PortfolioKind;
  kindLabel: string;
  industryLabel: string;
  /** "/demo/<slug>" 또는 https:// 주소 */
  liveUrl: string;
  /** public 아래에 실제로 있는 썸네일만. 없으면 null */
  thumbnailSrc: string | null;
  /** 저장된(또는 종류 기본) 상태 — 버튼이 칠해지는 기준 */
  status: PortfolioStatus;
  /** 전역 스위치·DB 장애까지 반영한 지금 실제 상태 */
  effectiveStatus: PortfolioStatus;
  featured: boolean;
  /** DB 에 저장된 순서. null 이면 JSON 규칙대로 */
  sortOrder: number | null;
  updatedAt: string;
  updatedBy: string;
};

export type AdminViewProps = {
  items: AdminItem[];
  flags: PortfolioFlags;
  /** 상태 표를 읽었는가. false 면 쓰기 버튼을 잠그고 「제안 시안은 자동으로 내려가 있습니다」를 띄운다 */
  stateOk: boolean;
  stateError: string | null;
  /**
   * 못 읽었을 때 **다음에 할 일**을 사람 말로 적은 한 줄(예: 「Supabase 대시보드에서 … 을 실행하세요」).
   * 데이터베이스 원문만 보여 주면 비개발자는 무엇을 해야 할지 알 수 없다 — 이 화면을 처음 여는 날이 바로 그 상태다.
   */
  stateHint: string | null;
  /** 저장에 필요한 service_role 키가 서버에 있는가 */
  hasServiceRole: boolean;
  /** 지금 화면이 **가짜 상태**(PORTFOLIO_STATE_FIXTURE)를 읽고 있는가 — 저장은 진짜 데이터베이스로 간다 */
  fixture: boolean;
  statuses: PortfolioStatus[];
  statusLabel: Record<PortfolioStatus, string>;
  statusHelp: Record<PortfolioStatus, string>;
  /** 전역 스위치 키 → 사람이 읽는 이름 (이력 화면이 `flag:proposals_down` 을 옮겨 적는 데 쓴다) */
  flagLabel: Record<string, string>;
  actor: string;
  /** 최근 변경 이력 — 서버에서 미리 읽어 넘긴다. 못 읽었으면 빈 배열 + logError */
  log: LogEntry[];
  logError: string | null;
};

/** POST /api/admin/verify 응답 중 화면이 쓰는 부분 */
export type VerifyResponse = {
  baseUrl: string;
  checkedAt: string;
  stateOk: boolean;
  stateError: string | null;
  listingPages: { portfolio: number | null; home: number | null };
  checks: VerifyCheck[];
};
