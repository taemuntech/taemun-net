export interface EssayCritique {
  id: string;
  category: '인문논술' | '의대 MMI';
  title: string;
  targetUniv: string;
  beforeText: string;
  afterText: string;
  critiqueNotes: string[];
  scoreBefore: number;
  scoreAfter: number;
}

export interface MmiScenario {
  id: string;
  roomName: string;
  stationType: string;
  scenario: string;
  ethicalDilemma: string;
  followUpQuestions: string[];
  evaluationRubric: string[];
}

export interface EssayCourse {
  id: string;
  title: string;
  target: string;
  schedule: string;
  description: string;
  features: string[];
  recommended?: boolean;
}
