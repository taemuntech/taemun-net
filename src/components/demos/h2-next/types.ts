export interface MetricItem {
  label: string;
  val: string;
  sub: string;
  isPrimary?: boolean;
}

export interface HubData {
  id: string;
  hubNum: string;
  status: string;
  statusType: 'normal' | 'stable' | 'active' | 'construction';
  name: string;
  desc: string;
  badge: string;
  title: string;
  sub: string;
  location: string;
  investment: string;
  metrics: MetricItem[];
  loadText: string;
  barWind: string;
  barH2: string;
  barReserve: string;
}

export interface PillarSpec {
  label: string;
  value: string;
}

/** 「상세 스펙 시트」 버튼이 여는 모달 본문 — 빈 모달이 뜨지 않게 카드마다 반드시 채운다 */
export interface PillarDetail {
  /** 모달 머리말 한 문단 */
  overview: string;
  /** 본문 블록 — 소제목 + 설명 */
  blocks: { title: string; body: string }[];
  /** 적용 분야 칩 */
  applications: string[];
  /** 모달 바닥에 남기는 샘플 고지 */
  note: string;
}

export interface PillarData {
  id: string;
  pillarNum: string;
  title: string;
  desc: string;
  icon: string;
  colorType: 'primary' | 'secondary';
  progressLabel: string;
  progressValue: string;
  progressPercent: number;
  specs: PillarSpec[];
  certLabel: string;
  actionText: string;
  /** 앵커로 보낼 카드만 채운다. 비어 있으면 상세 모달을 연다 */
  actionHref?: string;
  detail: PillarDetail;
}

export interface TrustMetric {
  title: string;
  icon: string;
  value: string;
  unit: string;
  trend: string;
  trendIcon: string;
  isPrimaryColor?: boolean;
}

export interface ESGCertificate {
  issuer: string;
  title: string;
  description: string;
  certCode: string;
  highlightColor: 'primary' | 'secondary';
}
