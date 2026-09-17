export interface DiningZone {
  id: string;
  name: string;
  engName: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  features: string[];
  capacity: string;
  lightingSpec: string;
  hotspots: {
    x: number;
    y: number;
    title: string;
    desc: string;
  }[];
}

export interface DiningMaterial {
  id: string;
  name: string;
  engName: string;
  spec: string;
  origin: string;
  desc: string;
  tactileNote: string;
  colorHex: string;
}

export interface LightingMode {
  id: 'daylight' | 'sunset' | 'midnight';
  name: string;
  timeRange: string;
  lux: number;
  kelvin: number;
  desc: string;
}
