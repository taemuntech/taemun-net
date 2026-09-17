// 가상 브랜드 샘플의 타입. 화면에 나오는 메종·상품·시리얼·가격은 전부 지어낸 예시다.
// 실존 명품 하우스 이름은 쓰지 않는다 — 이 샘플은 「감정·정품 확인」을 다루는 화면이라
// 실존 브랜드 이름이 들어가면 그 하우스의 공인 감정·공식 입점처럼 읽힌다(그런 제휴는 없다).

/** 컬렉션 필터 축 = 지어낸 메종 이름. 'all' 은 전체 보기 */
export type MaisonKey = 'all' | 'corville' | 'valdane' | 'lucenne' | 'orvesse';

export interface LuxuryItem {
  id: string;
  brand: string;
  /** 한글 표기 — 화면에는 안 쓰고 검색어 대조에만 쓴다(「코르빌」로 찾아도 걸리게) */
  brandKo: string;
  name: string;
  lotNumber: string;
  condition: string;
  originalPrice: number;
  salePrice: number;
  locationTag: string;
  customFeature: string;
  image: string;
  imageAlt: string;
  category: MaisonKey;
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

/** 시리얼 조회 결과 — 없는 코드는 null 을 돌려준다(아무 코드나 「정품 승인」으로 찍지 않는다) */
export interface VerificationResult {
  lotId: string;
  lotName: string;
  status: string;
  inspector: string;
  coverage: string;
  tagHash: string;
  releasedAt: string;
}

/** 패키징 옵션 — 체크 상태가 주문서 요약에 그대로 반영된다 */
export interface PackagingOptions {
  boutiquePackage: boolean;
  valetDelivery: boolean;
}
