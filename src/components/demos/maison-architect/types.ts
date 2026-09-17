export interface ProductColor {
  name: string;
  hex: string;
  inStock?: boolean;
}

export interface ProductBadge {
  text: string;
  type: 'dark' | 'terracotta' | 'neutral';
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'sofa' | 'dining' | 'lounge' | 'storage' | 'lighting';
  categoryLabel: string;
  materialTags: string[];
  price: number;
  formattedPrice: string;
  badges: ProductBadge[];
  dimensions: string;
  highlight: string;
  deliveryBadge: string;
  colors: ProductColor[];
  image: string;
  detailImage?: string;
  description: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: string;
  quantity: number;
}

export interface FloorplanPreset {
  pyeong: 25 | 34 | 45;
  badge: string;
  title: string;
  roomSize: string;
  note: string;
  sofaWidthText: string;
  sofaBlockWidth: string;
  walkwayClearance: string;
  statRatio: string;
  statWalkway: string;
  statInstallation: string;
}
