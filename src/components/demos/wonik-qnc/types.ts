export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  category: string;
  posterUrl: string;
  description: string;
  badge?: string;
  isUhd?: boolean;
  chapterText?: string;
}

export interface BusinessDivision {
  id: string;
  divisionNumber: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor?: string;
  imageUrl?: string;
  isSpecialOptics?: boolean;
  wavelength?: string;
  description: string;
  subCategory: string;
  highlights: string[];
}

export interface EsgPillar {
  number: string;
  name: string;
  title: string;
  description: string;
  badge: string;
  iconName: 'eco' | 'diversity' | 'gavel' | 'handshake';
}

export interface StockData {
  code: string;
  name: string;
  englishName: string;
  price: number;
  change: number;
  changeRate: number;
  prevClose: number;
  marketCap: string;
  foreignOwnership: string;
  timestamp: string;
}

export interface IrHubItem {
  id: string;
  title: string;
  description: string;
  iconType: 'balance' | 'document' | 'download' | 'support';
  detail: string;
}

export interface NewsItem {
  id: number;
  category: string;
  categoryType: 'community' | 'certification' | 'tech';
  date: string;
  title: string;
  summary: string;
  readTime?: string;
}

export interface FamilySite {
  name: string;
  url: string;
}
