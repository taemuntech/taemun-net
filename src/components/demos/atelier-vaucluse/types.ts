export type ProjectCategory = 'all' | 'residential' | 'commercial' | 'renovation';

export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  location: string;
  year: string;
  area: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
  materials: string[];
  keyFeatures: string[];
  clientReview?: string;
  galleryImages?: string[];
}

export interface ConsultationFormData {
  name: string;
  phone: string;
  spaceType: string;
  area: string;
  location: string;
  expectedDate: string;
  notes: string;
  privacyAgreed: boolean;
}
