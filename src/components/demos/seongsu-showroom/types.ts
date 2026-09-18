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
  /** 이 사례 전용 사진이 있을 때만 쓴다. 없으면 화면은 개념 판(타이포)을 그린다 —
   *  다른 구역의 사진을 돌려 쓰지 않기 위해 **선택 항목**으로 둔다. */
  thumbnailUrl?: string;
  features: string[];
  clientQuote: string;
}
