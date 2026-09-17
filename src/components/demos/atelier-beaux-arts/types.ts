export interface ExamArtwork {
  id: string;
  university: string;
  major: string;
  year: string;
  title: string;
  examTopic: string;
  analysisPoints: string[];
  compositionRatio: string;
  badge: string;
}

export interface ExamQuestion {
  id: string;
  university: string;
  track: string;
  year: string;
  problemText: string;
  givenObjects: string[];
  keyStrategies: string[];
}

export interface ArtCourse {
  id: string;
  title: string;
  target: string;
  schedule: string;
  description: string;
  features: string[];
}
