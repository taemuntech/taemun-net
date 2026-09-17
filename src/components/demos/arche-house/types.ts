export interface HouseProject {
  id: string;
  name: string;
  location: string;
  type: string;
  siteArea: string;
  gfa: string;
  structure: string;
  year: string;
  image: string;
  concept: string;
  summary: string;
  features: string[];
}

export interface ArchitectPhilosophy {
  title: string;
  subtitle: string;
  description: string;
  points: { title: string; desc: string }[];
}

export interface CostEstimateOption {
  type: string;
  structure: string;
  pyeong: number;
  designCostPerPyeong: number;
  constructionCostPerPyeong: number;
  description: string;
}
