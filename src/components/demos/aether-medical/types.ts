export interface ClinicZone {
  id: string;
  name: string;
  engName: string;
  tag: string;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
}

export interface MedicalMaterial {
  id: string;
  name: string;
  engName: string;
  category: string;
  origin: string;
  specs: string;
  description: string;
  acousticRating?: string;
  certification?: string;
}

export type CircadianLightingMode = 'welcome' | 'treatment' | 'recovery';
