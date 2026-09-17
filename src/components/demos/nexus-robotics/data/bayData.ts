// 관제 화면(디지털 트윈)의 베이별 예시 데이터.
//
// 왜 파일로 빼는가: 예전에는 BAY 카드 3개와 AMR 노드 칩이 전부 정적 div 라 눌러도 아무 일도 없었고,
// 처리량 카드는 「MAX 의 94%」인 값에 「+24.8% OVER TARGET」이라고 적어 스스로 모순이었다.
// 베이를 고르면 노드·교통 밀도·처리량이 함께 바뀌도록 값을 한곳에 모으고, 목표(TARGET)와
// 설비 능력(CAPACITY)을 갈라 적는다. 전부 예시 수치이며 실제 계측값이 아니다.

export type BayNode = {
  name: string;
  detail: string;
  /** 칩 색 — 이동 중·도킹·배차 대기 */
  tone: 'moving' | 'docking' | 'dispatch';
};

export type BayTelemetry = {
  id: string;
  code: string;
  process: string;
  /** 카드 안 두 번째 줄 */
  statusLabel: string;
  statusTone: 'slate' | 'emerald';
  airFlow: string;
  deadlockRisk: 'LOW' | 'MODERATE';
  nodes: BayNode[];
  /** 시간당 이송 처리량 (예시 수치) — current 는 지금 값, target 은 계획 목표, capacity 는 설비 최대 */
  throughput: { current: number; target: number; capacity: number; unit: string };
};

export const FAB_BAYS: BayTelemetry[] = [
  {
    id: 'bay-01',
    code: 'BAY-01',
    process: 'ETCHING',
    statusLabel: 'DISPATCH: NORMAL',
    statusTone: 'slate',
    airFlow: '0.45 m/s',
    deadlockRisk: 'LOW',
    nodes: [
      { name: 'AMR-500 #08', detail: 'FOUP → BAY-02', tone: 'moving' },
      { name: 'AMR-1500 #24', detail: 'DOCKING ±0.5 mm', tone: 'docking' },
      { name: 'AMR-500 #12', detail: 'DISPATCHING', tone: 'dispatch' },
    ],
    throughput: { current: 1420, target: 1140, capacity: 1500, unit: 'CASSETTES/HR' },
  },
  {
    id: 'bay-02',
    code: 'BAY-02',
    process: 'LITHO-EUV',
    statusLabel: 'AIR-ISOLATION: NOMINAL',
    statusTone: 'emerald',
    airFlow: '0.52 m/s',
    deadlockRisk: 'LOW',
    nodes: [
      { name: 'AMR-500 #03', detail: 'RETICLE POD → STOCKER', tone: 'moving' },
      { name: 'AMR-500 #17', detail: 'DOCKING ±0.3 mm', tone: 'docking' },
    ],
    throughput: { current: 980, target: 1000, capacity: 1200, unit: 'CASSETTES/HR' },
  },
  {
    id: 'bay-03',
    code: 'BAY-03',
    process: 'DEPOSITION',
    statusLabel: 'AMR QUEUE: 2 UNITS',
    statusTone: 'slate',
    airFlow: '0.38 m/s',
    deadlockRisk: 'MODERATE',
    nodes: [
      { name: 'AMR-1500 #31', detail: 'PRECURSOR → BAY-03', tone: 'moving' },
      { name: 'AMR-3000 #05', detail: 'COATER DOCKING', tone: 'docking' },
      { name: 'AMR-1500 #09', detail: 'QUEUED (2)', tone: 'dispatch' },
    ],
    throughput: { current: 1265, target: 1150, capacity: 1400, unit: 'CASSETTES/HR' },
  },
];
