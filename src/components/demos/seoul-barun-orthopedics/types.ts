export type BodyRegion = 'neck' | 'lumbar' | 'knee' | 'ankle';

export interface SymptomItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface TreatmentStep {
  title: string;
  desc: string;
}

export interface RegionQuizData {
  name: string;
  label: string;
  symptoms: SymptomItem[];
  diagnosis: string;
  step1: TreatmentStep;
  step2: TreatmentStep;
  step3: TreatmentStep;
}

export interface TechnologyItem {
  id: string;
  badge: string;
  badgeClass: string;
  techNum: string;
  title: string;
  description: string;
  targetConditions: string;
  specs: { label: string; value: string; highlight?: boolean }[];
  features?: string[];
  footerNote: string;
  linkText: string;
  fullDetail?: {
    overview: string;
    mechanism: string;
    targetPatients: string[];
    procedureSteps: string[];
    precautions: string;
  };
}

export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  role: string;
  centerBadge: string;
  badgeBg: string;
  quote: string;
  credentials: string[];
  specialties: string[];
  image: string;
}

export interface RehabEquipment {
  id: string;
  title: string;
  badge: string;
  badgeBg: string;
  description: string;
  targetCases: string;
  highlightTag: string;
  image: string;
  features: string[];
}

export interface BookingState {
  part: string;
  doctor: string;
  date: string;
  time: string;
  vas: number;
  duration: string;
  patientName: string;
  patientTel: string;
}
