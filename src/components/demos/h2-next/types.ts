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
  actionHref: string;
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
