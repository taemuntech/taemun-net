export interface MarineProject {
  id: string;
  title: string;
  category: 'container-quay' | 'caisson-breakwater' | 'ttp-protection' | 'dredging-reclamation';
  categoryLabel: string;
  scale: string;
  location: string;
  period: string;
  image: string;
  summary: string;
  specs: string[];
}

export interface CaissonStep {
  stepNumber: string;
  title: string;
  engTitle: string;
  subtitle: string;
  description: string;
  techPoints: string[];
  outputQuality: string;
}
