export type EngravingMethod = 'gold' | 'blind' | 'rosegold';
export type EngravingFont = 'serif' | 'script' | 'sans';
export type LeatherColor = 'cognac' | 'ebony' | 'green';

/** 컬렉션 필터 키 — 'all' 외에는 Product.category 값과 글자 그대로 같아야 한다 */
export type CategoryKey = 'all' | '가죽공예' | '도예/세라믹' | '금속/목공' | '전통 패브릭';

/** 컬렉션 정렬 키 */
export type SortKey = 'recommended' | 'priceAsc' | 'priceDesc' | 'rating';

export interface EngravingConfig {
  text: string;
  method: EngravingMethod;
  font: EngravingFont;
  leatherColor: LeatherColor;
}

export interface PackagingOption {
  id: string;
  name: string;
  price: number;
  description?: string;
  tag?: string;
  recommendedFor?: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  badge: string;
  badgeColor?: string;
  rating: number;
  reviewCount: number;
  description: string;
  price: number;
  shippingText: string;
  image: string;
  packagingOptions: PackagingOption[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  unitPrice: number;
  packagingName: string;
  packagingPrice: number;
  quantity: number;
  engraving?: {
    text: string;
    method: string;
    font: string;
  };
}

export interface Review {
  id: string;
  authorInitial: string;
  author: string;
  productName: string;
  options: string;
  rating: number;
  content: string;
  date: string;
}

export interface BojagiLookbookItem {
  id: string;
  styleNum: string;
  title: string;
  koreanName: string;
  englishName: string;
  description: string;
  recommendedUse: string;
  priceTag: string;
  isPremium?: boolean;
  image: string;
}
