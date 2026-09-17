import { LuxuryItem, LedgerEntry, CartItem } from '../types';

export const HERO_ITEM = {
  lotNumber: 'PRIVATE LOT № 24-CHANEL-9902',
  brand: 'CHANEL',
  name: '샤넬 타임리스 클래식 미디엄 플랩 캐비어 블랙 금장',
  grade: 'PRISTINE / GRADE 1',
  price: 15800000,
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD3cck8Vy_erhHZFEaTmOqnaah2BSB1oX_qDe_Wa8kFbmxKHl19Wsc8PFp97A7VFqccZYXdEiazw3a6ftfD3643e1A-cflQz0JIDR7Z_QQ4mXUqBVDn0wWDucJi-myD25hRp2zsh9rkC2wjSvsuCz958E5E_i_s0-cM30S2QNQ5L4buCRxJHrxpEf-Y0q0_sE0yJDRWdNjHn_xJyqB-y2mvb8ncLlqsJHocGa6U_b5rE7-4NapEEQU',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs2gdxmwg4YA5kwEMjc4X5qysHB0HyWA_S3li_A8nhjJnVD3yhQOUyjfFkEYhabtqXWe5VadkhGhihCCIRH1O4vrs4gAkSYX8bjJUBKK0TpRJ6PU_UpA2eOEO-DHnKS43v6vAPgrTSJSLcTpNbVpSgg67Slou2E2L5wjcRcKiC3zYZ8kFJ6UIdWDhD7d1W3jd1rCskzibr-yZD1GOj9i7BcEfW_t6bBXeqsf2HT0SW8cLp4WwCYSI4',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIGTO4GTxtj8F-AYCHrEIM5gqVhIT5ZjImkzTnKqSrod-1j3_DmFZmgDbHGeiUrv4hCjxFxTZTO8tP3pqcMTc4U0-VqqWDMn3aZh29yHZGR7b235Yo8m4PLuJZhZtkJTESPrOr0rbmB3RUt5CRrdnSf4TL-4igLbxg-5MiEU1058Dqst3YigUzZdyvfhubVDM56_0gitOCESJpCMbJ0YeurckzEHFQRr2Lw3X3Ai89ivpjbMpgdW0K',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7-2o4o5-kbVa2euPXPJV2_iDTdk4X-2nWxpqnYtZ6QzhzNJJHzNqkCmysb2_qsi7VJmrXEVEqNFOHR_Ul0hvA7LyaNHIj5lYXxIUly3QdAd7uxC-oPCPlDoEPN4yKajUI9t_T7wsxaKzCu5WUAsfYORe7EylPeDX79Y11hUmJpaLso5NNq160zrDc21GGSWkWp1u7DQPxiczjWBC0SVdCotX7PWmKYbTnYaCTndBRUkSuGVC0JIgH',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_Mj62ysksAqimcbBW_NOArN3szH9H25NEeXlkPZZrkbNXIvTkJrlKKIMLggX5Tw4mBu7_zVsb8MRPPjNj8gDqzfHekugxO7-FNubwovZPLMFChkvUUCg3kTblLwrIcGtM69W8olSMrW3wNdYQM3Txj2vsli78xKrFOceF15USsqpfeyFJkJGsEP77jUYQ-2elndtXDpHecn5BH8YLb4VyC3W12BuIgcJv6qA7hK4Hc6S0WW7w3E2A',
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
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD3cck8Vy_erhHZFEaTmOqnaah2BSB1oX_qDe_Wa8kFbmxKHl19Wsc8PFp97A7VFqccZYXdEiazw3a6ftfD3643e1A-cflQz0JIDR7Z_QQ4mXUqBVDn0wWDucJi-myD25hRp2zsh9rkC2wjSvsuCz958E5E_i_s0-cM30S2QNQ5L4buCRxJHrxpEf-Y0q0_sE0yJDRWdNjHn_xJyqB-y2mvb8ncLlqsJHocGa6U_b5rE7-4NapEEQU',
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

export const BRAND_LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1UASWMSvW97HTJgbD50mFbMd9xquDoEqw2AubwTwpN4bk23r-0J1w4ak4yL1iWGmCv-bBf5ksBEL9oaVi2GpAY4_Ou6_Hg6lsWYAW-viFpn7LcT7D9IBHaMma6HFQ1QZygkm3CbVpZ_P4cSn_t9UrfPA5waQtk4sN0gt3dCudfYeZ20EW9Izd7aD8GTk2rbcQ5J2O3qw2yFh0x_cDyIfEwtCSIEcJNViKdczgLwIrTtZwEkZAXHNHlP4hQ';

export const PACKAGING_IMAGES = {
  waxSeal: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANYHMqVYYThYbqUZw_S1h-veGL-4_BRYtKCyE-MWtZc1du1rBNxptszVcCBbNHmq-OL0a158aDJTB7Q8N9dncrK9hvCRtUMWFBazYZ50jXAtFweYllcdxd7ashOLS738HaTd6l4DFWitKT1tzatwKWJa9yTsJlXptNqJB604CfE_0BIQAqu1uj6uWAXJ2NgpobCLxo7Znmvh3o6N1zgbTOvZVydRYVILr-osmUMHbrYy-S6r3_rkYx',
  valetDelivery: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkVDPS3jtvGlrUIYrvcFApZHeiMAFON3F5CC7vbv_57xPvyMLD0rjnv1s8IpnJ7kZTZ77dbcG6f8157Mvxs33ihcGaiP6uM6OayGuex5sH5vmYCwLbK2iPZtHj1I6__E13GzatW14225Uk6shDoaGoCwHpEUTm5VGx_JwToiWkncF12PuTdiBZpOTBAFtTkVEfdcSR8r9Q4oPqyreFrSHSi7wHFpubP_QyL8PAF31A7viql7prkqg8'
};

export function formatPrice(amount: number): string {
  return '₩ ' + amount.toLocaleString('ko-KR');
}
