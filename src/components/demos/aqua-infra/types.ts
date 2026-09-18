export interface WaterProject {
  id: string;
  title: string;
  category: 'stormwater-tunnel' | 'treatment-plant' | 'transmission-pipe' | 'ecological-river';
  categoryLabel: string;
  capacity: string;
  location: string;
  period: string;
  image: string;
  summary: string;
  specs: string[];
}

export interface WaterProcessStep {
  stepNumber: string;
  title: string;
  engTitle: string;
  subtitle: string;
  description: string;
  techPoints: string[];
  outputQuality: string;
}
