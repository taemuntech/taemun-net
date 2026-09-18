export type MatrixCategory = 'all' | 'sky' | 'metro' | 'national' | 'cpa';

export interface AdmissionCutoffItem {
  id: string;
  name: string;
  division: string;
  quota: string;
  cut2024: string;
  cut2023: string;
  cut2022: string;
  threeYearAvg: string;
  minGpa: string;
  englishReq: string;
  apexShare: string;
  comment: string;
  category: MatrixCategory;
  isCpa?: boolean;
}

export type SeatStatus = 'Available' | 'Occupied' | 'Maintenance';

export interface CarrelSeat {
  id: string;
  seatNumber: string;
  zone: 'A' | 'B' | 'C';
  zoneName: string;
  status: SeatStatus;
  userInitials?: string;
  powerDraw?: string;
  noiseDb?: number;
}

export interface FacultyMember {
  id: string;
  name: string;
  roleBadge: string;
  department: string;
  academicTitle: string;
  description: string;
  achievement: string;
  imageUrl: string;
  imageAlt: string;
  credentials: string[];
  lectures: string[];
}

export interface ApplicationFormData {
  fullName: string;
  mobile: string;
  track: string;
  almaMater: string;
  gpa: string;
  englishScore: string;
  mockScore: string;
  carrelWing: string;
  selectedSeatId?: string;
  commencementDate: string;
  diagnosticMemo: string;
}
