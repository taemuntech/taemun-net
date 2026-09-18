export interface CivilProject {
  id: string;
  title: string;
  category: 'bridge' | 'tunnel' | 'highway';
  categoryLabel: string;
  location: string;
  length: string;
  structureType: string;
  period: string;
  image: string;
  summary: string;
  highlights: string[];
}

export interface CivilTech {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  image: string;
}
