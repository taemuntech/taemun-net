export interface Product {
  id: number;
  rank?: string;
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
  discountRate: string;
  badge?: string;
  badgeType?: 'primary' | 'outline' | 'exclusive';
  image: string;
  altText: string;
  colors: string[];
  category: string;
  fit: string;
  fabric: string;
  isWishlisted?: boolean;
  modelSpec?: string;
  measurements?: {
    size: string;
    shoulder: string;
    chest: string;
    sleeve: string;
    length: string;
    isModelSize?: boolean;
    stock: string;
  }[];
  thumbnails?: string[];
}

export interface CartItem {
  id: string; // unique cart line id
  productId: number;
  brand: string;
  name: string;
  selectedColor: string;
  selectedSize: string;
  price: number;
  image: string;
  quantity: number;
}

export interface StreetSnap {
  id: number;
  location: string;
  title: string;
  curator: string;
  bodySpec: string;
  taggedCount: number;
  image: string;
  altText: string;
  taggedProducts: {
    name: string;
    price: number;
    tag: string;
  }[];
}

export interface LookPiece {
  id: string;
  pieceNumber: string;
  name: string;
  brandDetails: string;
  price: number;
  discountRate: string;
  position: { top: string; left: string };
  image: string;
}
