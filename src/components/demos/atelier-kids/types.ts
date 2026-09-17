export interface ArtworkPiece {
  id: string;
  title: string;
  artistAge: string;
  category: 'collage' | 'clay' | 'watercolor' | 'mixed';
  colorTag: string;
  description: string;
  palette: string[];
}

export interface AgeCurriculum {
  id: string;
  ageGroup: string;
  stageName: string;
  theme: string;
  description: string;
  keySkills: string[];
  materials: string[];
}

export interface SensoryMetric {
  name: string;
  score: number;
  description: string;
}
