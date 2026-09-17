export type ProcedureCategory = 'eye' | 'nose' | 'lifting' | 'contour' | 'petit';

export interface BeforeAfterCase {
  id: string;
  category: ProcedureCategory;
  categoryName: string;
  title: string;
  description: string;
  doctorName: string;
  tags: string[];
  beforeImage: string;
  afterImage: string;
  period: string;
  caution: string;
}

export interface DoctorProfile {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  quote: string;
  career: string[];
  academic: string[];
}

export interface SafetyProtocol {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface RecoveryStep {
  day: string;
  title: string;
  careDetails: string[];
  tips: string;
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  preferredDate: string;
  categories: ProcedureCategory[];
  message: string;
  contactMethod: 'call' | 'kakao';
  agreePrivacy: boolean;
}
