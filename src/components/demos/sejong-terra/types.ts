export interface TerraProject {
  id: string;
  title: string;
  category: 'smart-industrial' | 'machine-guidance' | 'utility-tunnel' | 'ground-improvement';
  categoryLabel: string;
  scale: string;
  location: string;
  period: string;
  image: string;
  summary: string;
  specs: string[];
}

export interface EarthworkPhase {
  phaseNumber: string;
  title: string;
  engTitle: string;
  subtitle: string;
  description: string;
  techPoints: string[];
  outputQuality: string;
}
