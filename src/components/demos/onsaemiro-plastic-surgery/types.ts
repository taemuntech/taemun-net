export interface HUDParameters {
  upper: number;       // Upper facial ratio: 0.80 - 1.20
  mid: number;         // Mid facial ratio: 0.80 - 1.20
  lower: number;       // Lower facial ratio: 0.70 - 1.10
  angle: number;       // Nasolabial angle (degrees): 88 - 112
  projection: number;  // Chin projection (mm): -5.0 - +5.0
}

export interface BeforeAfterCase {
  id: string;
  category: 'eye' | 'nose' | 'lift';
  title: string;
  subtitle: string;
  desc: string;
  beforeImg: string;
  afterImg: string;
  recoveryPeriod: string;
  keyPoints: string[];
}

export interface RoadmapStage {
  id: string;
  stageName: string;
  stageBadge: string;
  title: string;
  description: string;
  residualEdemaPct: number;
  badge: string;
  careDetails: string[];
}

export interface DoctorProfile {
  id: string;
  name: string;
  role: string;
  subRole: string;
  quote: string;
  credentials: string[];
  specialties: string;
  image: string;
}

export interface ReservationPayload {
  interests: string[];
  doctorId: string;
  preferredDate: string;
  name: string;
  phone: string;
  notes: string;
  privacyAgreed: boolean;
}
