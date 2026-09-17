export interface HanokZone {
  id: string;
  name: string;
  engName: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  features: string[];
  capacity: string;
  timberSpec: string;
  hotspots: {
    x: number;
    y: number;
    title: string;
    desc: string;
  }[];
}

export interface HanokMaterial {
  id: string;
  name: string;
  engName: string;
  spec: string;
  craftHeritage: string;
  desc: string;
  sensoryNote: string;
  colorHex: string;
}

export interface WeatherMood {
  id: 'clear' | 'rain' | 'snow';
  name: string;
  koreanPoetic: string;
  soundscape: string;
  temperatureNote: string;
  recommendedTea: string;
}
