export interface Villa {
  id: string;
  type: 'cliff' | 'presidential' | 'forest';
  name: string;
  nameKo: string;
  badge: string;
  region: string;
  areaText: string;
  description: string;
  specs: {
    suite: string;
    pool: string;
    circulation: string;
  };
  refinements: string[];
  pricePerNight: number;
  imageUrl: string;
  alt: string;
}

export interface Destination {
  id: string;
  name: string;
  nameKo: string;
  multiplier: number;
  temp: string;
  time: string;
}

export interface AddOnOption {
  id: string;
  title: string;
  price: number;
  defaultChecked?: boolean;
}

export interface StayCalculationState {
  destination: Destination;
  villa: Villa;
  nights: number;
  selectedAddonIds: string[];
}

export type ExperiencePillarId = 'gastro' | 'wellness' | 'journeys';

export interface ExperiencePillar {
  id: ExperiencePillarId;
  tabTitle: string;
  category: string;
  title: string;
  description: string;
  stats: {
    label1: string;
    val1: string;
    label2: string;
    val2: string;
  };
  imageUrl: string;
  alt: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  destination: string;
  partySize: string;
  preferredDates: string;
  specialRequirements: string;
}
