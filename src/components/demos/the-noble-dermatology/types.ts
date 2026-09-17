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
