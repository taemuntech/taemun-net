export interface BuildStage {
  stageId: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  period: string;
  progressRange: [number, number];
  summary: string;
  image: string;
  specs: { label: string; value: string }[];
  equipment: string[];
  inspectionPoints: string[];
  safetyGrade: string;
}

export interface RuggedSensor {
  id: string;
  code: string;
  name: string;
  location: string;
  value: string;
  unit: string;
  status: 'NORMAL' | 'CAUTION' | 'STABLE';
  threshold: string;
  trend: 'up' | 'down' | 'flat';
  description: string;
  history: number[];
}

export interface LandmarkProject {
  id: string;
  name: string;
  type: string;
  location: string;
  gfa: string;
  floors: string;
  height: string;
  period: string;
  structuralSystem: string;
  image: string;
  summary: string;
  specs: { label: string; value: string }[];
  keyFeatures: string[];
}

export interface StructuralMaterial {
  id: string;
  name: string;
  code: string;
  category: string;
  spec: string;
  strength: string;
  application: string;
  features: string[];
  testStandard: string;
  image: string;
  summary: string;
}
