export type ScreenType = 'overview' | 'fleet' | 'solutions' | 'payloads' | 'dock-system' | 'case-studies' | 'specs';

export interface DroneSpec {
  id: string;
  name: string;
  category: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  statusBadge: string;
  statusText: string;
  specs: {
    label: string;
    value: string;
    subtext?: string;
  }[];
  primaryUseCase: string;
  leadTime: string;
  features: string[];
}

export interface DefectItem {
  id: string;
  type: string;
  location: string;
  severity: 'A' | 'B' | 'C' | 'D' | 'E';
  severityLabel: string;
  crackWidth: string;
  depth: string;
  confidence: number;
  timestamp: string;
  status: '정상' | '주의' | '위험';
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  tag: string;
  client: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  results: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
}

export interface PocFormState {
  company: string;
  infrastructure: string;
  name: string;
  phone: string;
  email: string;
  preferredDate?: string;
  notes?: string;
}
