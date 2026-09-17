export type Language = 'KR' | 'EN';

export type ProcedureTab = 'smile' | 'lasik' | 'lasek';

export type MyopiaLevel = 'mild' | 'moderate' | 'severe';
export type AstigmatismLevel = 'mild' | 'severe';
export type CorneaThickness = 'normal' | 'thin' | 'unknown';
export type LifestyleType = 'sports' | 'screen' | 'night';

export interface CalculatorState {
  myopia: MyopiaLevel;
  astigmatism: AstigmatismLevel;
  cornea: CorneaThickness;
  lifestyle: LifestyleType;
}

export interface CalculatorResult {
  title: string;
  matchRate: number;
  description: string;
  tags: string[];
  recommendedService: string;
}

export type LensMode = 'mono' | 'edof' | 'multi';

export interface BookingState {
  service: string;
  doctor: string;
  sameday: string;
  date: string;
  time: string;
  patientName: string;
  patientPhone: string;
  lensCautionAccepted: boolean;
}
