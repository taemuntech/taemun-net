export interface AthleticEvent {
  id: string;
  name: string;
  category: string;
  sensorType: string;
  maleMax: number;
  femaleMax: number;
  unit: string;
  step: number;
  description: string;
  coachingPoint: string;
}

export interface AthleticAdmissionCase {
  id: string;
  title: string;
  university: string;
  suneungScore: string;
  practicalDeduction: string;
  keyEvent: string;
  summary: string;
}

export interface AthleticCourse {
  id: string;
  category: string;
  title: string;
  target: string;
  curriculum: string[];
  recommended?: boolean;
}
