export interface PolyhedronData {
  id: string;
  name: string;
  koreanName: string;
  vertices: number;
  edges: number;
  faces: number;
  shape: string;
  description: string;
}

export interface MathCourse {
  id: string;
  title: string;
  target: string;
  schedule: string;
  description: string;
  curriculum: string[];
  recommended?: boolean;
}

export interface EulerProblem {
  id: string;
  title: string;
  category: '기하' | '정수' | '대수' | '조합';
  difficulty: string;
  question: string;
  keyInsight: string;
  steps: string[];
}
