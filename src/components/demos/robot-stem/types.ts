export interface RobotPart {
  id: string;
  name: string;
  category: string;
  spec: string;
  explodedOffset: { x: number; y: number };
  description: string;
}

export interface StemProject {
  id: string;
  title: string;
  author: string;
  category: string;
  hardware: string;
  software: string;
  description: string;
}

export interface RobotCourse {
  id: string;
  title: string;
  target: string;
  duration: string;
  description: string;
  curriculum: string[];
  recommended?: boolean;
}
