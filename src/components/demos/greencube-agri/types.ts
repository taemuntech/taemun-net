export interface CultivarProfile {
  id: string;
  name: string;
  subName: string;
  description: string;
  yieldMultiplier: number;
  priceMultiplier: number;
  waterMultiplier: number;
  growthDays: number;
  targetBrix: string;
  tag: string;
}

export interface SpectrumMode {
  id: number;
  peakNm: string;
  title: string;
  badge: string;
  colorName: string;
  colorHex: string;
  description: string;
  markerPercent: string;
  ppfd: number;
  photosynthesisRate: number;
  photosynthesisLabel: string;
  nutrientDensity: number;
  nutrientLabel: string;
  crispIndex: number;
  crispLabel: string;
  targetCanopyTitle: string;
}

export interface CalculatorState {
  footprintPyung: number;
  selectedCropId: string;
}

export interface B2BInquiryData {
  inquiryType: 'turnkey' | 'supply' | 'rnd';
  companyName: string;
  representative: string;
  email: string;
  phone: string;
  scaleOption: string;
  tourDate: string;
  details: string;
}
