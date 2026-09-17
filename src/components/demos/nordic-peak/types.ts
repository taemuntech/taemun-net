/** 상품 분류 — 실제로 상품이 있는 분류만 둔다.
 *  상품 없는 분류를 메뉴에 남겨 두면 눌렀을 때 빈 화면이 나와 「준비 중」 처럼 읽힌다. */
export type CategoryKey = 'shelter' | 'tarp' | 'furniture' | 'cookware';

/** 시즌·수용인원·폴대·원단 — 필터가 실제로 이 값으로 걸러진다(FilterState 와 짝) */
export type SeasonKey = 'winter' | 'summer' | 'all';
export type CapacityKey = '1-2' | '4' | '6-8';
export type PoleKey = 'alloy' | '7001' | 'carbon';
export type FabricKey = '70d' | '40d' | 'tc';

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: CategoryKey;
  subCategoryTitle: string;
  categoryTag: string;
  price: number;
  originalPrice?: number;
  weightTag: string;
  badge?: string;
  /** 배지 색 — 예전에는 배지 글자("BEST SELLER")로 색을 골라, 글자를 고치면 색이 조용히 바뀌었다 */
  badgeTone?: 'accent' | 'primary' | 'neutral';
  specHighlight?: string;
  imageUrl: string;
  imageAlt: string;
  specs: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  season: SeasonKey;
  capacity: CapacityKey;
  pole: PoleKey;
  fabric: FabricKey;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  /** 'all' 또는 CategoryKey */
  category: string;
  /** 'all' 또는 winter/summer */
  season: string;
  /** 'all' 또는 CapacityKey */
  capacity: string;
  /** 'all' 또는 PoleKey */
  pole: string;
  /** 'all' 또는 FabricKey */
  fabric: string;
}
