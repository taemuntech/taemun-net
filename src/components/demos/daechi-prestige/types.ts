export interface CompetencyAxis {
  id: string;
  name: string;
  baseline: number; // e.g. 64%
  target: number;   // e.g. 98%
  badge: string;    // e.g. '12주 완성', '속도 혁신'
  growth: string;   // e.g. '+34% UP', '-78% Time'
  description: string;
  details: string;
  clinicalNote: string;
}

export interface FunnelStage {
  stage: string;
  icon: string;
  title: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  progressPercent: number;
  colorType: 'primary' | 'tertiary';
  curriculum: string[];
}

export interface KillerCallout {
  id: 'A' | 'B' | 'C';
  title: string;
  description: string;
  badge: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
}

export interface LearningScheduleItem {
  time: string;
  title: string;
  description: string;
  highlight?: boolean;
  category: string;
}

export interface UniversityAdmission {
  id: string;
  code: string;
  name: string;
  baseConvertedScore: number;
  weightKorean: number;
  weightMath: number;
  weightScience: number;
  statusThreshSafe: number;
  statusThreshOptimal: number;
  statusThreshChallenge: number;
  quotaNote: string;
}

export interface ReservationFormData {
  grade: string;
  targetMajor: string;
  preferredDate: string;
  preferredTime: string;
  studentName: string;
  parentContact: string;
  currentMathPercentile?: string;
  notes?: string;
}
