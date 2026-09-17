export type SpectrumMode = 'normal' | 'polarized' | 'crosspol' | 'uv';

export interface SpectrumData {
  id: SpectrumMode;
  number: string;
  nameKr: string;
  nameEn: string;
  tag: string;
  title: string;
  param1: string;
  param2: string;
  desc: string;
  filterStyle: string;
  highlightZone: string;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  roleEn: string;
  specialty: string;
  image: string;
  credentials: string[];
  quote: string;
}

export interface Treatment {
  id: string;
  category: string;
  categoryEn: string;
  partner: string;
  title: string;
  description: string;
  duration: string;
  recovery: string;
  painCare: string;
  recommendation: string;
  badge: string;
  /** 예약 폼 1단계 「피부 고민」 항목 이름 — 시술 카드에서 상담을 누르면 이 항목이 실제로 선택된다 */
  concern: string;
}

export interface VerificationResult {
  serialNumber: string;
  device: string;
  status: string;
  expiry: string;
  distributor: string;
  verifiedAt: string;
  authenticityCode: string;
  shotsTotal?: number;
}

export interface BookingFormState {
  concerns: string[];
  doctor: string;
  date: string;
  timeSlot: string;
  painSensitivity: string;
  downtimePreference: string;
  valetRequired: string;
  customerName: string;
  customerPhone: string;
}
