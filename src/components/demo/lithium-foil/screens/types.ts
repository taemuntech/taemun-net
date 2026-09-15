// 화면(탭) 컴포넌트 props 계약 — DemoApp 이 탭 상태와 화면 간 이동을 소유한다.
// 데이터는 전부 useDemoData() (DemoDataContext) 에서 읽는다. props 로 데이터를 넘기지 않는다.

export type DemoTab = "kpi" | "log" | "trace" | "suggest" | "schema";

/** 계보 조회 대상 — 출하·롤은 역추적, 원료 로트는 정추적(영향 범위) */
export type TraceTarget =
  | { type: "shipment"; id: string }
  | { type: "roll"; id: string }
  | { type: "ingot"; id: string }
  | { type: "material"; id: string };

export type KpiBoardProps = {
  /** 관리도 점·표 행을 누르면 계보 탭으로 이동 */
  onTrace: (target: TraceTarget) => void;
};

export type RollLogFormProps = {
  /** 저장 후 다른 탭으로 이동할 때 */
  onNavigate: (tab: DemoTab) => void;
  onTrace: (target: TraceTarget) => void;
};

export type TraceExplorerProps = {
  /** 바깥에서 지정한 조회 대상 (없으면 빈 검색 상태) */
  target: TraceTarget | null;
  onTargetChange: (target: TraceTarget | null) => void;
};

export type SuggestionsPanelProps = {
  onTrace: (target: TraceTarget) => void;
  onNavigate: (tab: DemoTab) => void;
};

export type SchemaViewProps = {
  onNavigate: (tab: DemoTab) => void;
};
