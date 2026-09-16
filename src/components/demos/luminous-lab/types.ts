export interface Product {
  id: string;
  rank?: number;
  rankBadge?: string;
  name: string;
  subTitle?: string;
  price: number;
  originalPrice: number;
  discountRate: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  imageAlt: string;
  badges: string[];
  clinicalHighlight?: {
    label: string;
    value: string;
    percent: number;
  };
  category: string;
  skinType: string[];
  skinConcern: string[];
  certifications: string[];
  description?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  quantity: number;
  imageUrl: string;
  optionText: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  avatarText: string;
  skinProfile: string;
  verifiedBadge: string;
  rating: number;
  comment: string;
  purchasedOption: string;
}

export interface SkinDiagnosisResult {
  skinType: string;
  primaryConcern: string;
  recommendedRoutine: string[];
  explanation: string;
  recommendedProductIds: string[];
}

export interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'cart';
}
