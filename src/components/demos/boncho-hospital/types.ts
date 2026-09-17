export type ClinicalTab = 'oncology' | 'traffic' | 'rehab';

export interface HerbBatchCertificate {
  code: string;
  name: string;
  targetTherapy: string;
  inspectionDate: string;
  inspector: string;
  batchNumber: string;
  herbs: Array<{
    name: string;
    origin: string;
    grade: string;
    heavyMetals: string;
  }>;
  pesticideResult: string;
  heavyMetalResult: string;
  waterQuality: string;
  sealType: string;
  status: 'passed' | 'reviewing';
}

export interface BedAvailabilityInfo {
  singleRoomsTotal: number;
  singleRoomsAvailable: number;
  doubleRoomsTotal: number;
  doubleRoomsAvailable: number;
  lastUpdated: string;
  emergencyCareAvailable: boolean;
}

export interface ConciergeBookingForm {
  admissionPurpose: 'oncology' | 'traffic' | 'rehab' | 'outpatient';
  roomType: 'royal' | 'harmony' | 'undecided';
  insuranceType: 'auto' | 'silson' | 'health';
  patientName: string;
  contactNumber: string;
  preferredDate: string;
  symptoms?: string;
  agreePrivacy: boolean;
}
