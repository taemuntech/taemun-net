export interface LuxuryItem {
  id: string;
  brand: string;
  name: string;
  lotNumber: string;
  condition: string;
  originalPrice: number;
  salePrice: number;
  locationTag: string;
  customFeature: string;
  image: string;
  imageAlt: string;
  category: 'all' | 'chanel' | 'hermes' | 'rolex' | 'dior';
}

export interface CartItem {
  id: string;
  brand: string;
  name: string;
  price: number;
  lotNumber?: string;
  taxNote: string;
  image: string;
  quantity: number;
}

export interface LedgerEntry {
  lotId: string;
  item: string;
  status: string;
  grade: string;
}

export interface VerificationResult {
  serial: string;
  status: string;
  inspectors: string;
  warranty: string;
  nfcHash: string;
  customsDate: string;
  lotName: string;
}
