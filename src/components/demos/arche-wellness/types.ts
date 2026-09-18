export interface WellnessZone {
  id: string;
  name: string;
  engName: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  features: string[];
  capacity: string;
  airSpec: string;
  hotspots: {
    x: number;
    y: number;
    title: string;
    desc: string;
  }[];
}

export interface WellnessMaterial {
  id: string;
  name: string;
  engName: string;
  spec: string;
  ecoCert: string;
  desc: string;
  sensoryNote: string;
  colorHex: string;
}

export interface AirSensorTelemetry {
  oxygenRate: number; // 21.2%
  co2Level: number; // 420 ppm
  humidity: number; // 52%
  temperature: number; // 23.5 C
}
