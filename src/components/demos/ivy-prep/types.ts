export interface AdmissionCompetency {
  key: string;
  name: string;
  score: number;
  fullMark: number;
  description: string;
  strategy: string;
}

export interface AdmissionCase {
  id: string;
  studentInitials: string;
  schoolAdmitted: string;
  gpa: string;
  sat: string;
  apCount: string;
  hook: string;
  summary: string;
}

export interface IvyCourse {
  id: string;
  category: string;
  title: string;
  target: string;
  features: string[];
  recommended?: boolean;
}
