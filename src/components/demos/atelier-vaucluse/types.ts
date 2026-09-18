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

/** 프로젝트 상세 → 상담 폼으로 내려보내는 선택 내용. nonce 로 같은 값의 재적용을 구분한다 */
export interface ConsultationPrefill {
  nonce: number;
  notes: string;
  spaceType?: string;
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
