export type PetSpecies = 'dog' | 'cat';
export type NeuteredStatus = 'neutered' | 'unneutered';

export interface Product {
  id: string;
  name: string;
  category: 'dog' | 'cat' | 'supplement' | 'barf';
  badge: string;
  subBadge: string;
  badgeType: 'signature' | 'barf' | 'cat' | 'supplement' | 'primary';
  rating: number;
  reviewCount: number;
  image: string;
  kibbleBadge: string;
  tags: string[];
  discountRate: number;
  originalPrice: number;
  price: number;
  unitPrice: string;
  dosageTip?: string;
  isPopular?: boolean;
  allergySafe?: boolean;
  /** 필터바 「생애주기」 칩과 맞물린다 — 값이 없으면 그 상품은 생애주기 필터에서 영원히 걸러진다 */
  lifeStage?: LifeStage;
  /** 필터바 「임상 기능」 칩과 맞물린다 */
  clinicalTarget?: ClinicalTarget;
  /** 「그레인프리」 칩 — 태그 문자열이 아니라 이 값으로 판정한다 */
  grainFree?: boolean;
  /** 「닭고기 제외」 칩 */
  chickenFree?: boolean;
}

/** 'all' 은 필터 상태에만 쓰고 상품에는 쓰지 않는다 */
export type LifeStage = 'puppy' | 'adult' | 'senior' | 'allStage';
export type ClinicalTarget = 'joints' | 'allergies' | 'gut' | 'urinary';

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription: boolean;
  deliveryCycle?: '2w' | '4w' | '6w';
}

export interface PetParentReview {
  id: string;
  petName: string;
  age: string;
  breed: string;
  productFed: string;
  rating: number;
  content: string;
  author: string;
  likes: number;
  image: string;
}

export interface ProfilerState {
  species: PetSpecies;
  isNeutered: boolean;
  age: number;
  weight: number;
  concerns: {
    joints: boolean;
    allergies: boolean;
    weightControl: boolean;
    urinary: boolean;
  };
}
