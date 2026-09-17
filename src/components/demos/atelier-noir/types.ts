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
  /** 카테고리 안의 세부분류 — 필터 HUD 2단(세부분류) 목록을 이 값으로 만든다 */
  subCategory: string;
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
  /** 실측표가 없는 품목(가방·슈즈 등)의 사이즈 선택지 */
  sizeOptions?: string[];
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
    /** 상세보기가 열 상품 — 이름 매칭은 엉뚱한 상품을 열어서 id 로 잇는다 */
    productId: number;
    name: string;
    price: number;
    tag: string;
  }[];
}

export interface LookPiece {
  id: string;
  pieceNumber: string;
  /** 핀 팝오버의 VIEW SPEC 이 열 상품 */
  productId: number;
  name: string;
  brandDetails: string;
  price: number;
  discountRate: string;
  position: { top: string; left: string };
  image: string;
}
