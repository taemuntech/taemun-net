export interface WorkspaceZone {
  id: string;
  name: string;
  engName: string;
  subtitle: string;
  area: string;
  capacity: string;
  acousticsGrade: string;
  description: string;
  imageUrl: string;
  features: string[];
  hotspots: {
    x: number;
    y: number;
    title: string;
    desc: string;
  }[];
}

export interface SmartMeetingRoom {
  id: string;
  name: string;
  type: string;
  capacity: number;
  currentTemp: number;
  co2Level: number;
  lux: number;
  isOccupied: boolean;
  smartGlassPrivacy: boolean;
  equipment: string[];
}

export interface AcousticMaterial {
  id: string;
  name: string;
  engName: string;
  nrcGrade: string;
  ecoCert: string;
  desc: string;
  sensoryNote: string;
  colorHex: string;
  specs: string[];
}
