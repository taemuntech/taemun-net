export type Language = 'ko' | 'en';

export interface TelemetrySensor {
  id: string;
  nameKo: string;
  nameEn: string;
  gasType: string;
  pressure: number; // MPa
  targetPressure: number;
  flowRate: number; // SLPM
  valveStatus: 'OPEN' | 'CLOSED';
  ppm: number;
  status: 'NORMAL' | 'WARNING' | 'INTERLOCK';
}

export interface ProductSpec {
  id: string;
  category: 'cleaning' | 'gas' | 'scada';
  titleKo: string;
  titleEn: string;
  subtitleKo: string;
  subtitleEn: string;
  descriptionKo: string;
  descriptionEn: string;
  image: string;
  featuresKo: string[];
  featuresEn: string[];
  specs: { labelKo: string; labelEn: string; valueKo: string; valueEn: string }[];
}

export interface HistoryItem {
  year: string;
  month: string;
  titleKo: string;
  titleEn: string;
  highlight?: boolean;
}

export interface CertificationItem {
  id: string;
  titleKo: string;
  titleEn: string;
  issuerKo: string;
  issuerEn: string;
  year: string;
  badge: string;
  descriptionKo: string;
  descriptionEn: string;
}
