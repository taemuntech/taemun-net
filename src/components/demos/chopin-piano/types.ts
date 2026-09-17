export interface PianoKey {
  note: string;
  name: string;
  isBlack: boolean;
  freq: number;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  almaMater: string;
  bio: string;
  badge: string;
  specialty: string;
}

export interface MasterclassCourse {
  id: string;
  title: string;
  target: string;
  duration: string;
  capacity: string;
  curriculum: string[];
  price: string;
}

export interface PracticeRoom {
  id: string;
  name: string;
  pianoModel: string;
  reverbTime: string;
  hourlyRate: string;
  features: string[];
}
