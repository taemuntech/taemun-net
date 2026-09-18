export interface LeetQuestionAnalysis {
  id: string;
  category: string;
  title: string;
  correctRate: string;
  passageSummary: string;
  trapOption: string;
  trapRate: string;
  keyLogic: string;
}

export interface ExamPassCase {
  id: string;
  title: string;
  track: string;
  gpa: string;
  leetScore: string;
  interviewNote: string;
  summary: string;
}

export interface LeetCpaCourse {
  id: string;
  category: string;
  title: string;
  target: string;
  curriculum: string[];
  recommended?: boolean;
}
