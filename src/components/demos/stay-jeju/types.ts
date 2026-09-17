export type TimeOfDay = 'day' | 'sunset' | 'night';

export interface TimeMoodPreset {
  id: TimeOfDay;
  name: string;
  koreanName: string;
  timeRange: string;
  colorTemp: string;
  lightConcept: string;
  bgGradient: string;
  imageUrl: string;
  ambientSoundName: string;
  description: string;
  quote: string;
}

export interface SpatialZone {
  id: string;
  name: string;
  subtitle: string;
  area: string;
  ceiling: string;
  viewAngle: string;
  description: string;
  imageUrl: string;
  materials: string[];
  hotspots: {
    x: number;
    y: number;
    title: string;
    desc: string;
  }[];
}

export interface StayMaterial {
  id: string;
  name: string;
  engName: string;
  origin: string;
  textureDesc: string;
  sensoryNote: string;
  craftsmanship: string;
  colorHex: string;
  specs: string[];
}
