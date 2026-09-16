export interface HardwareProduct {
  id: string;
  sku: string;
  category: string;
  categoryName: string;
  name: string;
  subtitle: string;
  tag: string;
  tagColor?: string;
  image: string;
  originalPrice: number;
  discountPrice: number;
  discountRate: number;
  rating: number;
  reviewCount: number;
  chips: string[];
  specs: {
    cpu?: string;
    gpu?: string;
    tgp?: string;
    ram?: string;
    storage?: string;
    display?: string;
    cooling?: string;
    weight?: string;
    ports?: string;
  };
}

export interface ComparisonModel {
  id: string;
  badge: string;
  badgeType: 'primary' | 'secondary' | 'accent';
  name: string;
  price: string;
  cpu: string;
  cpuDetail: string;
  gpu: string;
  gpuPercent: number;
  gpuColor: string;
  display: string;
  displayDetail: string;
  cooling: string;
  coolingDetail: string;
  io: string;
  weight: string;
  timeSpy: string;
  timeSpyTarget: string;
  isCurrent?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
  specsSummary: string;
}

export type PowerMode = 'silent' | 'balanced' | 'turbo';
export type FlagshipViewTab = 'exterior' | 'vapor' | 'switches' | 'ports';
