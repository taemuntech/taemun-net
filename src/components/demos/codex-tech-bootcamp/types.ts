export interface StudentProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  techStack: string[];
  metrics: string;
  team: string;
}

export interface BootcampCourse {
  id: string;
  phase: string;
  title: string;
  duration: string;
  description: string;
  topics: string[];
  recommended?: boolean;
}

export interface CommitDay {
  date: string;
  week: number;
  count: number;
  commitMsg: string;
}
