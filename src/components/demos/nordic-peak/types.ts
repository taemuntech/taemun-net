export interface Product {
  id: string;
  sku: string;
  title: string;
  category: 'shelter' | 'tarp' | 'furniture' | 'cookware' | 'sleeping' | 'lighting' | 'backpacking';
  subCategoryTitle: string;
  categoryTag: string;
  price: number;
  originalPrice?: number;
  weightTag: string;
  badge?: string;
  specHighlight?: string;
  imageUrl: string;
  imageAlt: string;
  specs: {
    label: string;
    value: string;
    highlight?: boolean;
  }[];
  season: 'all' | 'winter' | 'summer';
  capacity: '1-2' | '4' | '6-8';
  pole: 'dac' | '7001' | 'carbon';
  fabric: '70d' | '40d' | 'tc';
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  season: string;
  capacity: string;
  pole: string;
  fabric: string;
}
