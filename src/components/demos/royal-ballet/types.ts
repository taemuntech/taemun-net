export interface BalletPosition {
  id: number;
  name: string;
  frenchName: string;
  turnoutAngle: string;
  centerOfGravity: string;
  muscleEngagement: string[];
  description: string;
}

export interface BalletCourse {
  id: string;
  title: string;
  target: string;
  method: string;
  description: string;
  curriculum: string[];
  schedule: string;
}

export interface PerformanceItem {
  id: string;
  title: string;
  composer: string;
  role: string;
  dancer: string;
  year: string;
  award: string;
}
