export interface FloorZone {
  id: string;
  floor: string;
  name: string;
  subtitle: string;
  concept: string;
  area: string;
  ceilingHeight: string;
  lightingTemp: string;
  acousticRating: string;
  description: string;
  imageUrl: string;
  keyMaterials: string[];
  hotspots: {
    x: number; // percentage
    y: number; // percentage
    title: string;
    desc: string;
  }[];
}

export interface MaterialItem {
  id: string;
  name: string;
  engName: string;
  category: 'Concrete' | 'Metal' | 'Stone' | 'Wood' | 'Glass';
  origin: string;
  textureDesc: string;
  durability: string;
  recommendedUse: string;
  colorHex: string;
  lightingPairing: string;
  specDetails: string[];
}

export interface ProjectCase {
  id: string;
  title: string;
  category: 'Retail' | 'F&B' | 'Showroom' | 'Lounge';
  location: string;
  area: string;
  period: string;
  year: string;
  concept: string;
  summary: string;
  thumbnailUrl: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  features: string[];
  clientQuote: string;
}

export interface SpaceEstimateParams {
  businessType: 'fnb' | 'retail' | 'showroom' | 'lounge';
  areaSize: 'under30' | 'size50' | 'size100' | 'over150';
  styleMood: 'industrial' | 'natural_stone' | 'hitech_minimal';
  includeBranding: boolean;
  includeBespokeFurniture: boolean;
}
