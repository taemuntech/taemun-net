// 가상 브랜드 「메종 드 럭스」 샘플 데이터.
//
// 메종 이름(CORVILLE·VALDANE·LUCENNE·ORVESSE)은 전부 지어낸 것이다. 실존 명품 하우스 이름을 쓰지 않는 이유:
// 이 샘플은 「감정 · 정품 확인 · 보증서 발급」을 파는 화면이라, 실존 브랜드 이름이 상품명·필터 탭·감정위원
// 약력에 들어가면 그 하우스의 공인 감정처럼 읽힌다. 파는 물건에 제조사를 적는 것과는 무게가 다르다.
//
// 수치·시리얼·로트번호도 전부 예시다. 화면에도 「예시」라고 적는다.
//
// ⚠️ **로트 번호는 한 체계(MDL-2025-089xx)만 쓴다.** 예전에는 상품 카드가 `Lot № 2025-CV-0089` 같은
//    다른 체계를 썼는데, 이 데모의 간판 기능인 「로트 번호로 찾는 검수 이력 조회」에 그 번호를 넣으면
//    전부 「조회된 기록이 없습니다」가 떴다 — 파는 물건이 자기 간판 기능에 하나도 안 걸렸다.
//    상품을 늘릴 때는 LEDGER_ENTRIES·VERIFICATION_RECORDS 에도 같은 번호로 행을 하나씩 만든다.

import { LuxuryItem, LedgerEntry, CartItem, MaisonKey, VerificationResult } from '../types';

export const HERO_ITEM = {
  id: 'corville-grained-tophandle-25',
  lotNumber: 'LOT № MDL-2025-08992 (예시)',
  brand: 'CORVILLE',
  name: '코르빌 그레인 카프 톱핸들 25 · 카멜 팔라듐',
  grade: 'PRISTINE / GRADE 1 (예시 등급)',
  price: 15800000,
  image: '/demo-media/maison-de-luxe/maison-de-luxe-06.jpg',
  alt: '메종 드 럭스 아카이브 전시 — 카멜색 그레인 카프 톱핸들 백이 대리석 좌대 위에 놓인 부티크 살롱 전경',
};

export const LUXURY_ITEMS: LuxuryItem[] = [
  {
    id: 'corville-signature-flap',
    brand: 'CORVILLE',
    brandKo: '코르빌',
    name: '시그니처 퀼팅 플랩 미디엄 · 블랙 골드',
    lotNumber: 'LOT № MDL-2025-08991 (예시) · 풀세트',
    condition: '미사용 · 풀세트',
    originalPrice: 16400000,
    salePrice: 15800000,
    locationTag: '파리 아카이브 입고 (예시)',
    customFeature: '보안 포장 당일 출고',
    image: '/demo-media/maison-de-luxe/maison-de-luxe-04.jpg',
    imageAlt: '다이아몬드 퀼팅 처리된 블랙 램스킨 숄더백이 대리석 좌대 위에 놓인 부티크 진열 사진',
    category: 'corville',
  },
  {
    id: 'valdane-diver-41',
    brand: 'VALDANE GENÈVE',
    brandKo: '발단 제네브',
    name: '다이버 41 세라믹 베젤 · 블랙 다이얼',
    lotNumber: 'LOT № MDL-2025-08993 (예시) · 미사용',
    condition: '미사용 신품',
    originalPrice: 21800000,
    salePrice: 19900000,
    locationTag: '스위스 직수입 (예시)',
    customFeature: '구동 오차 측정표 동봉',
    image: '/demo-media/maison-de-luxe/maison-de-luxe-07.jpg',
    imageAlt: '세라믹 베젤 다이버 워치가 워치 트레이의 벨벳 쿠션 위에 놓인 접사 사진',
    category: 'valdane',
  },
  {
    id: 'lucenne-quilted-top-handle',
    brand: 'LUCENNE',
    brandKo: '뤼센',
    name: '퀼팅 톱핸들 스몰 · 클라우드 그레이 램스킨',
    lotNumber: 'LOT № MDL-2025-08994 (예시) · 참 세트 포함',
    condition: '그레이 · 샴페인 골드 하드웨어',
    originalPrice: 8900000,
    salePrice: 7950000,
    locationTag: '밀라노 아카이브 (예시)',
    customFeature: '이니셜 참 커스텀',
    image: '/demo-media/maison-de-luxe/maison-de-luxe-03.jpg',
    imageAlt: '클라우드 그레이 램스킨에 다이아몬드 퀼팅을 넣은 소형 톱핸들 백이 조명 진열장 안에 놓인 사진',
    category: 'lucenne',
  },
  {
    id: 'orvesse-bangle-18k',
    brand: 'ORVESSE JOAILLERIE',
    brandKo: '오르베스',
    name: '스크루 뱅글 클래식 · 18K 옐로우 골드',
    lotNumber: 'LOT № MDL-2025-08995 (예시) · 17호 풀박스',
    condition: '사이즈 17호 · 풀박스',
    originalPrice: 10600000,
    salePrice: 9800000,
    locationTag: '파리 아카이브 입고 (예시)',
    customFeature: '전용 드라이버 동봉',
    image: '/demo-media/maison-de-luxe/maison-de-luxe-02.jpg',
    imageAlt: '스크루 모티프가 새겨진 18K 옐로우 골드 뱅글과 전용 드라이버가 나무 트레이 위에 놓인 접사 사진',
    category: 'orvesse',
  },
];

/** 컬렉션 필터 탭 = 지어낸 메종. 헤더 내비(모바일 칩)도 같은 축을 쓴다 */
export const MAISON_FILTERS: Array<{ key: MaisonKey; label: string }> = [
  { key: 'all', label: '전체 보기' },
  { key: 'corville', label: '코르빌 (CORVILLE)' },
  { key: 'valdane', label: '발단 (VALDANE)' },
  { key: 'lucenne', label: '뤼센 (LUCENNE)' },
  { key: 'orvesse', label: '오르베스 (ORVESSE)' },
];

/** 페이지 안에 실제로 존재하는 구역 — 헤더 내비·푸터 링크가 이 목록으로만 이동한다(빈 앵커 금지) */
export const SECTION_LINKS: Array<{ id: string; label: string }> = [
  { id: 'collection', label: 'Collection' },
  { id: 'inspection', label: 'Authentication' },
  { id: 'packaging', label: 'Packaging' },
  { id: 'ledger', label: 'Archive Ledger' },
];

export const INITIAL_CART_ITEM: CartItem = {
  id: HERO_ITEM.id,
  brand: HERO_ITEM.brand,
  name: HERO_ITEM.name,
  price: HERO_ITEM.price,
  taxNote: '관·부가세 포함 표시가 (예시)',
  image: HERO_ITEM.image,
  quantity: 1,
};

export const LEDGER_ENTRIES: LedgerEntry[] = [
  {
    lotId: 'MDL-2025-08991',
    item: '코르빌 시그니처 퀼팅 플랩 미디엄',
    status: '광학 스캔 · 실물 2차 검수 완료',
    grade: 'GRADE 1+ (예시)',
  },
  {
    lotId: 'MDL-2025-08992',
    item: '코르빌 그레인 카프 톱핸들 25',
    status: '매입 인보이스 대조 통과',
    grade: 'PRISTINE (예시)',
  },
  {
    lotId: 'MDL-2025-08993',
    item: '발단 다이버 41 세라믹 베젤',
    status: '구동 오차 측정 완료',
    grade: 'CHRONO (예시)',
  },
  {
    lotId: 'MDL-2025-08994',
    item: '뤼센 퀼팅 톱핸들 스몰',
    status: '램스킨 표면 광학 스캔 완료',
    grade: 'GRADE 1 (예시)',
  },
  {
    lotId: 'MDL-2025-08995',
    item: '오르베스 스크루 뱅글 클래식',
    status: '금성분 비파괴 측정 · 각인 대조 통과',
    grade: 'GRADE 1+ (예시)',
  },
];

/**
 * 시리얼 조회용 예시 대장. **아무 코드나 「정품 승인」으로 찍지 않는다** — 여기 없는 코드는 null 이고
 * 화면은 「조회된 기록이 없습니다」를 보여 준다. 예전에는 무엇을 넣어도 「정품 인증 승인됨(AUTHENTIC)」이 떴다.
 */
const VERIFICATION_RECORDS: VerificationResult[] = [
  {
    lotId: 'MDL-2025-08991',
    lotName: '코르빌 시그니처 퀼팅 플랩 미디엄 · 블랙 골드',
    status: '검수 이력 확인됨',
    inspector: '메종 드 럭스 자체 감정팀 2인 교차 검수 (예시)',
    coverage: '수령 후 7일 이내 검수 반품 (예시 정책)',
    tagHash: '0x7f4e89b12a884c90',
    releasedAt: '2025. 01. 14 출고 (예시)',
  },
  {
    lotId: 'MDL-2025-08992',
    lotName: '코르빌 그레인 카프 톱핸들 25 · 카멜 팔라듐',
    status: '검수 이력 확인됨',
    inspector: '메종 드 럭스 자체 감정팀 2인 교차 검수 (예시)',
    coverage: '수령 후 7일 이내 검수 반품 (예시 정책)',
    tagHash: '0x51c0d9a73be14f28',
    releasedAt: '2025. 02. 02 출고 (예시)',
  },
  {
    lotId: 'MDL-2025-08993',
    lotName: '발단 다이버 41 세라믹 베젤 · 블랙 다이얼',
    status: '검수 이력 확인됨 · 구동 오차 측정표 포함',
    inspector: '메종 드 럭스 자체 워치 검수팀 (예시)',
    coverage: '수령 후 7일 이내 검수 반품 (예시 정책)',
    tagHash: '0x2b77e4f018ca5d63',
    releasedAt: '2025. 02. 19 출고 (예시)',
  },
  {
    lotId: 'MDL-2025-08994',
    lotName: '뤼센 퀼팅 톱핸들 스몰 · 클라우드 그레이 램스킨',
    status: '검수 이력 확인됨 · 참 세트 동봉 확인',
    inspector: '메종 드 럭스 자체 감정팀 2인 교차 검수 (예시)',
    coverage: '수령 후 7일 이내 검수 반품 (예시 정책)',
    tagHash: '0x9d3a16bc47e02f85',
    releasedAt: '2025. 03. 06 출고 (예시)',
  },
  {
    lotId: 'MDL-2025-08995',
    lotName: '오르베스 스크루 뱅글 클래식 · 18K 옐로우 골드',
    status: '검수 이력 확인됨 · 각인 대조 통과',
    inspector: '메종 드 럭스 자체 주얼리 검수팀 (예시)',
    coverage: '수령 후 7일 이내 검수 반품 (예시 정책)',
    tagHash: '0x6e58c2091fa7b34d',
    releasedAt: '2025. 03. 21 출고 (예시)',
  },
];

export const DEFAULT_SERIAL_CODE = VERIFICATION_RECORDS[0].lotId;

/** 예시 대장에서 찾는다(로트 번호 또는 태그 해시). 없으면 null */
export function lookupVerification(code: string): VerificationResult | null {
  const key = code.replace(/\s/g, '').toUpperCase();
  if (!key) return null;
  return (
    VERIFICATION_RECORDS.find((r) => r.lotId.toUpperCase() === key || r.tagHash.toUpperCase() === key) ?? null
  );
}

export const BRAND_LOGO_URL = '/demo-media/maison-de-luxe/maison-de-luxe-08.png';

export const PACKAGING_IMAGES = {
  waxSeal: '/demo-media/maison-de-luxe/maison-de-luxe-01.jpg',
  valetDelivery: '/demo-media/maison-de-luxe/maison-de-luxe-05.jpg',
};

export function formatPrice(amount: number): string {
  return '₩ ' + amount.toLocaleString('ko-KR');
}
