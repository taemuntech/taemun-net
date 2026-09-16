export interface Product {
  id: string;
  name: string;
  origin: string;
  tag: string;
  badge?: string;
  tempBadge: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  unitPrice: string;
  rating: number;
  reviewCount: number;
  image: string;
  category: 'all' | 'meat' | 'seafood' | 'vegetable' | 'bakery';
  description: string;
  traceabilityNumber?: string;
  producer?: string;
  storageType?: string;
  packaging?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  subtext: string;
  price: number;
  checked: boolean;
  image?: string;
}

export interface TelemetryStep {
  step: string;
  title: string;
  temp: string;
  location: string;
  time: string;
  status: 'completed' | 'in-transit' | 'ready';
  description: string;
}
