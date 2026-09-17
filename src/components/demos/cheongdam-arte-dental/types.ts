export interface ComparisonData {
  cutVal: string;
  cutDesc: string;
  painVal: string;
  painDesc: string;
  visitVal: string;
  visitDesc: string;
  timeVal: string;
  timeDesc: string;
  safeVal: string;
  safeDesc: string;
}

export interface VeneerCase {
  id: number;
  tag: string;
  title: string;
  desc: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel?: string;
  afterLabel?: string;
  shadeApplied?: string;
}

export interface DoctorProfile {
  name: string;
  title: string;
  department: string;
  almaMater: string;
  image: string;
  quote: string;
  credentials: string[];
  specialty: string;
  tagColor: 'primary' | 'secondary';
}

export interface BookingFormData {
  treatment: string;
  doctor: string;
  date: string;
  time: string;
  fears: string[];
  patientName: string;
  patientPhone: string;
}

export interface ClinicFacility {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  specs: string[];
}
