export type EventType = 'long-jump' | 'sprint-100m' | 'grip-force' | 'sit-ups' | 'back-force';

export interface EventConfig {
  id: EventType;
  label: string;
  englishLabel: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  rulerMarkers: {
    val: number;
    label: string;
    highlight?: boolean;
    colorClass?: string;
  }[];
  targets: {
    id: string;
    sectionTag: string;
    category: string;
    institution: string;
    maxCriteria: string;
    maxScore: number;
    scoreUnit: string;
    calculateScore: (val: number) => {
      score: number;
      percentage: number;
      tier: string;
      tierClass: string;
    };
  }[];
}

export interface SimulationState {
  isOpen: boolean;
  type: 'sprint' | 'jump' | 'grip';
  title: string;
}

export interface BookingFormData {
  candidateName: string;
  phone: string;
  targetExam: string;
  currentRecord: string;
  labLocation: string;
  slotDateTime: string;
  consent: boolean;
}

export interface CohortRecord {
  id: string;
  name: string;
  target: string;
  examYear: string;
  admissionStatus: string;
  verifiedScore: string;
  keyMetric: string;
  gain: string;
  sensorVerification: string;
  forcePlateId: string;
}
