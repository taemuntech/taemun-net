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
  lifeStage?: string;
  clinicalTarget?: string;
}

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
