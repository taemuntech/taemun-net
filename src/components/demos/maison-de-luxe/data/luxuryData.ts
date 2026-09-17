import { LuxuryItem, LedgerEntry, CartItem } from '../types';

export const HERO_ITEM = {
  lotNumber: 'PRIVATE LOT № 24-CHANEL-9902',
  brand: 'CHANEL',
  name: '샤넬 타임리스 클래식 미디엄 플랩 캐비어 블랙 금장',
  grade: 'PRISTINE / GRADE 1',
  price: 15800000,
  image: '/demo-media/maison-de-luxe/maison-de-luxe-04.jpg',
  alt: 'MAISON DE LUXE Archival Exhibition - Chanel Classic Flap Caviar Black Gold'
};

export const LUXURY_ITEMS: LuxuryItem[] = [
  {
    id: 'hermes-birkin-25',
    brand: 'HERMÈS',
    name: '버킨 25 토고 골드 은장 (새제품 풀세트)',
    lotNumber: 'Lot № 2025-H-0089 · 각인 W (2024)',
    condition: '새제품 풀세트',
    originalPrice: 39500000,
    salePrice: 37200000,
    locationTag: '파리 본점 입고',
    customFeature: '특수 보안 당일발송',
    image: '/demo-media/maison-de-luxe/maison-de-luxe-06.jpg',
    imageAlt: 'An ultra-luxurious authentic Hermès Birkin 25 handbag in rich gold togo leather with palladium hardware',
    category: 'hermes'
  },
  {
    id: 'rolex-submariner-41',
    brand: 'ROLEX',
    name: '서브마리너 데이트 41mm 126610LN 블랙',
    lotNumber: 'Lot № 2025-R-4412 · 미사용 신품',
    condition: '미사용 신품',
    originalPrice: 21800000,
    salePrice: 19900000,
    locationTag: '스위스 직수입',
    customFeature: '오리지널 보증서',
    image: '/demo-media/maison-de-luxe/maison-de-luxe-07.jpg',
    imageAlt: 'Close-up macro editorial shot of a pristine Rolex Submariner Date ceramic bezel luxury timepiece',
    category: 'rolex'
  },
  {
    id: 'dior-lady-dior-abc',
    brand: 'DIOR',
    name: '레이디 디올 마이 ABC 스몰 까나쥬 램스킨',
    lotNumber: 'Lot № 2025-D-7781 · 그레이 샴페인골드',
    condition: '그레이 샴페인골드',
    originalPrice: 8900000,
    salePrice: 7950000,
    locationTag: '밀라노 부티크',
    customFeature: '시그니처 참 커스텀',
    image: '/demo-media/maison-de-luxe/maison-de-luxe-03.jpg',
    imageAlt: 'An elegant Lady Dior My ABC bag in cloud-gray lambskin leather with cannage quilting',
    category: 'dior'
  },
  {
    id: 'cartier-love-bracelet',
    brand: 'CARTIER',
    name: '러브 브레이슬릿 클래식 18K 옐로우 골드',
    lotNumber: 'Lot № 2025-C-1904 · 사이즈 17호 풀박스',
    condition: '사이즈 17호 풀박스',
    originalPrice: 10600000,
    salePrice: 9800000,
    locationTag: '파리 플래그십',
    customFeature: '국제 보증서 동봉',
    image: '/demo-media/maison-de-luxe/maison-de-luxe-02.jpg',
    imageAlt: 'A museum-grade macro photograph of a Cartier Love Bracelet in solid 18k yellow gold',
    category: 'all'
  }
];

export const INITIAL_CART_ITEM: CartItem = {
  id: 'chanel-classic-flap-initial',
  brand: 'CHANEL',
  name: '타임리스 클래식 미디엄 캐비어',
  price: 15800000,
  taxNote: '관·부가세 전액 포함',
  image: '/demo-media/maison-de-luxe/maison-de-luxe-04.jpg',
  quantity: 1
};

export const LEDGER_ENTRIES: LedgerEntry[] = [
  {
    lotId: 'MDL-2025-08991',
    item: '샤넬 클래식 플랩 미디엄 캐비어',
    status: 'AI 스캔 & 실물 2차 검수 완료',
    grade: 'GRADE 1+ (NEW)'
  },
  {
    lotId: 'MDL-2025-08992',
    item: '에르메스 콘스탄스 19 엡송 블랙',
    status: '파리 본점 인보이스 매칭 통과',
    grade: 'PRISTINE'
  },
  {
    lotId: 'MDL-2025-08993',
    item: '롤렉스 데이토나 코스모그래프 세라믹',
    status: '무브먼트 오차율 측정 완결',
    grade: 'CHRONOMETER'
  }
];

export const BRAND_LOGO_URL = '/demo-media/maison-de-luxe/maison-de-luxe-08.png';

export const PACKAGING_IMAGES = {
  waxSeal: '/demo-media/maison-de-luxe/maison-de-luxe-01.jpg',
  valetDelivery: '/demo-media/maison-de-luxe/maison-de-luxe-05.jpg'
};

export function formatPrice(amount: number): string {
  return '₩ ' + amount.toLocaleString('ko-KR');
}
