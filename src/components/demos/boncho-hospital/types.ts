export type ClinicalTab = 'oncology' | 'traffic' | 'rehab';

export type RoomType = 'royal' | 'harmony';

export type AdmissionPurpose = 'oncology' | 'traffic' | 'rehab' | 'outpatient';

export type InsuranceType = 'auto' | 'silson' | 'health';

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

/** 병동 현황 모달이 그리는 병실 한 칸. 잔여 실수는 이 목록에서 세어 화면 곳곳의 숫자가 갈라지지 않게 한다. */
export interface BedRoom {
  floor: string;
  room: string;
  type: RoomType;
  status: 'available' | 'occupied';
  view: string;
}

export interface ConciergeBookingForm {
  admissionPurpose: AdmissionPurpose;
  roomType: RoomType | 'undecided';
  insuranceType: InsuranceType;
  patientName: string;
  contactNumber: string;
  preferredDate: string;
  symptoms?: string;
  agreePrivacy: boolean;
  /** 광고성 수신 동의 — 수집 동의(필수)와 한 칸에 묶지 않는다 */
  agreeMarketing: boolean;
}
