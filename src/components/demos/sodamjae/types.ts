export interface Project {
  id: string;
  index: string;
  category: '살림집' | '도심형 한옥' | '별서·세컨하우스' | '한옥 갤러리·카페';
  categoryLabel: string;
  name: string;
  hanjaName: string;
  location: string;
  year: string;
  area: string;
  description: string;
  detailedStory?: string;
  imageUrl: string;
  tags: string[];
  specs: {
    wood: string;
    insulation: string;
    joinery: string;
    heating: string;
  };
}

export interface PhilosophyItem {
  number: string;
  title: string;
  description: string;
  subtext: string;
  iconName: string;
}

export interface EngineeringFeature {
  number: string;
  badge: string;
  title: string;
  description: string;
  iconName: string;
}

export interface RoadmapStep {
  step: string;
  title: string;
  description: string;
  duration: string;
}

export interface ConsultationInquiry {
  name: string;
  phone: string;
  location: string;
  landStatus: string;
  targetArea: string;
  startDate: string;
  message: string;
  privacyAgreed: boolean;
}
