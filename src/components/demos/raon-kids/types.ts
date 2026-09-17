export interface KidsZone {
  id: string;
  name: string;
  engName: string;
  tag: string;
  description: string;
  safetyPoints: string[];
  image: string;
}

export interface KidsMaterial {
  id: string;
  name: string;
  engName: string;
  category: string;
  origin: string;
  specs: string;
  description: string;
  safetyCert?: string;
}
