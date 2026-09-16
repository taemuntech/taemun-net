export interface DivisionInfo {
  id: string;
  code: string;
  name: string;
  enName: string;
  badge: string;
  description: string;
  tags: string[];
  image?: string;
  imageCaption?: string;
  specs: { label: string; value: string }[];
  highlightItems?: { icon: string; title: string; desc: string }[];
}

export interface CoreTechItem {
  id: string;
  code: string;
  title: string;
  desc: string;
  icon: string;
  details?: string;
}

export interface QualityStep {
  stepNumber: number;
  title: string;
  desc: string;
  detailInfo?: string;
}

export interface ConsultationFormData {
  company: string;
  personName: string;
  phone: string;
  email: string;
  divisions: string[];
  timeline: string;
  requirements: string;
  agreedPrivacy: boolean;
}
