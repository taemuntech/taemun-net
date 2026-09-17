export interface LexileBook {
  id: string;
  title: string;
  author: string;
  lexile: number;
  arLevel: number;
  targetAge: string;
  genre: string;
  summary: string;
  keyVocabulary: string[];
  coverColor: string;
}

export interface SpeakingMetric {
  phonics: number;
  fluency: number;
  intonation: number;
  vocabulary: number;
  sentenceComplexity: number;
}

export interface EnglishCourse {
  id: string;
  levelName: string;
  targetGrade: string;
  lexileRange: string;
  description: string;
  weeklySchedule: string;
  keyOutcomes: string[];
  badge?: string;
}

export interface VeritasFaculty {
  name: string;
  role: string;
  almaMater: string;
  experience: string;
  specialty: string;
}
