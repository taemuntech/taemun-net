export interface SoundZone {
  id: string;
  name: string;
  engName: string;
  tag: string;
  description: string;
  acousticSpecs: { label: string; value: string }[];
  image: string;
}

export interface SoundMaterial {
  id: string;
  name: string;
  engName: string;
  category: string;
  origin: string;
  specs: string;
  description: string;
  absorptionRate?: string;
  frequencyRange?: string;
}

export type MusicGenreMode = 'vocal-jazz' | 'chamber' | 'symphony';
