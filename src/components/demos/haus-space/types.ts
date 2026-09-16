export interface ProjectItem {
  id: string;
  title: string;
  category: 'Luxury Residential' | 'Commercial Lounge' | 'Workspace';
  koreanCategory: string;
  area: string;
  completionYear: string;
  location: string;
  subtitle: string;
  description: string;
  materialsUsed: string;
  image: string;
  renderImage?: string;
  gallery?: string[];
  specs?: {
    label: string;
    value: string;
  }[];
  features?: string[];
}

export interface MaterialSpecimen {
  id: string;
  tag: string;
  title: string;
  description: string;
  origin: string;
  image: string;
  specsDetails?: {
    grade?: string;
    finish?: string;
    thickness?: string;
    application?: string;
  };
}

export interface ConsultationFormState {
  clientName: string;
  phone: string;
  location: string;
  area: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  message: string;
  privacyAgree: boolean;
}
