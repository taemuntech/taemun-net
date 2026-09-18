export interface TrackChannel {
  id: string;
  name: string;
  category: 'vocal' | 'piano' | 'bass' | 'drum';
  volume: number;
  isMuted: boolean;
  isSolo: boolean;
  color: string;
}

export interface VocalTrackSample {
  id: string;
  title: string;
  artist: string;
  genre: string;
  bpm: number;
  key: string;
  duration: string;
  description: string;
}

export interface VocalCourse {
  id: string;
  title: string;
  target: string;
  duration: string;
  description: string;
  features: string[];
  recommended: boolean;
}

export interface StudioGear {
  category: string;
  model: string;
  brand: string;
  description: string;
}
