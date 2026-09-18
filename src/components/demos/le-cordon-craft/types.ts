export type CraftDiscipline = 'patisserie' | 'floral';

export interface DessertStep {
  stepNumber: number;
  title: string;
  temperature: string;
  duration: string;
  technique: string;
  scienceNote: string;
  colorCode: string;
  viscosity: string;
}

export interface DessertCourse {
  id: string;
  name: string;
  frenchName: string;
  category: string;
  difficulty: string;
  description: string;
  heroColor: string;
  steps: DessertStep[];
}

export interface FloralTheme {
  id: string;
  themeName: string;
  frenchSubtitle: string;
  palette: { name: string; hex: string; role: string }[];
  compositionRatio: { focal: number; secondary: number; greenery: number };
  description: string;
  recommendedFlowers: string[];
  stylingTips: string;
}

export interface CurriculumItem {
  id: string;
  discipline: CraftDiscipline;
  title: string;
  period: string;
  capacity: string;
  badge: string;
  features: string[];
  target: string;
}

export interface StudentWork {
  id: string;
  discipline: CraftDiscipline;
  title: string;
  author: string;
  track: string;
  imageUrl: string;
  critique: string;
  year: string;
}
