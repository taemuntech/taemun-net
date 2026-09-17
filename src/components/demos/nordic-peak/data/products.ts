import { CategoryKey, Product } from '../types';

// 가상 브랜드 「노르딕 피크」의 예시 상품 자료.
// 실존 부품 상표(폴대·원단 브랜드)는 쓰지 않는다 — 지어낸 브랜드가 실존 제조사의 상표를 달면
// 제휴·정품 공급처럼 읽힌다. 소재는 합금 번호·데니어 같은 일반 규격으로만 적는다.
// 수치는 전부 예시이고, 「인증」·「보증」·「완벽」 같은 단정은 쓰지 않는다.

/** 화면에 실제로 상품이 있는 분류만 둔다(메뉴·필터가 이 표를 같이 쓴다) */
export const CATEGORIES: { key: CategoryKey; label: string; shortLabel: string }[] = [
  { key: 'shelter', label: '텐트/쉘터', shortLabel: '지오데식 돔 텐트' },
  { key: 'tarp', label: '타프/익스텐션', shortLabel: '옥타 쉘터 시스템' },
  { key: 'furniture', label: '퍼니처/체어', shortLabel: '퍼니처/체어' },
  { key: 'cookware', label: '쿡웨어/스토브', shortLabel: '쿡웨어/스토브' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'varg-42-dome',
    sku: 'NP-V42-OLV',
    title: '바르그 4.2 지오데식 돔 텐트',
    category: 'shelter',
    subCategoryTitle: '지오데식 돔 텐트',
    categoryTag: '올리브 드랩 / 다이아몬드 구조',
    price: 1380000,
    originalPrice: 1725000,
    weightTag: '4.8kg ULTRA-DOME',
    badge: '플래그십 라인',
    badgeTone: 'accent',
    specHighlight: '압축 체적 18L',
    imageUrl: '/demo-media/nordic-peak/nordic-peak-04.jpg',
    imageAlt: '바르그 4.2 지오데식 돔 텐트',
    specs: [
      { label: '원단 내수압:', value: '5,000mm H₂O (예시)' },
      { label: '폴대 규격:', value: '경량 알루미늄 11mm (5라인)' },
      { label: '수용 정원:', value: '4인 (야전침대 4EA 기준)' },
      { label: '패킹 크기:', value: '500ml 생수병 12개 체적', highlight: true },
    ],
    season: 'winter',
    capacity: '4',
    pole: 'alloy',
    fabric: '70d',
    description:
      '히말라야·북유럽 동계 원정을 상정해 설계한 5라인 다이아몬드 지오데식 프레임워크입니다. 눈보라 하중을 여러 폴대로 나누고, 영하 35℃ 급 돌풍 조건을 상정해 내부 온기와 기압 손실을 줄이도록 구성했습니다. (예시 설명)',
  },
  {
    id: 'aegir-sil-tarp-50',
    sku: 'NP-TRP-50-KHK',
    title: '에기르 헥사 옥타 실타프 5.0',
    category: 'tarp',
    subCategoryTitle: '옥타 쉘터 시스템',
    categoryTag: '웨더드 카키 / 고강도 실타프',
    price: 420000,
    originalPrice: 480000,
    weightTag: '1.4kg FEATHER-TARP',
    badge: 'SIL/PU 차광',
    badgeTone: 'neutral',
    imageUrl: '/demo-media/nordic-peak/nordic-peak-03.jpg',
    imageAlt: '에기르 헥사 옥타 실타프 5.0',
    specs: [
      { label: '원단 내수압:', value: '4,000mm 양면 실리콘 (예시)' },
      { label: '차광 기능:', value: '피그먼트 블랙 UV 차단' },
      { label: '면적 크기:', value: '500cm × 440cm' },
      { label: '중량/재질:', value: '1.4kg / 40D 고강도 나일론', highlight: true },
    ],
    season: 'all',
    capacity: '4',
    pole: '7001',
    fabric: '40d',
    description:
      '40D 고강도 립스탑 나일론에 양면 실리콘 코팅을 올려 강풍 인장과 차광을 함께 노린 헥사 옥타 윙 타프입니다. (예시 설명)',
  },
  {
    id: 'valhalla-chair-7075',
    sku: 'NP-CHR-7075-BLK',
    title: '발할라 택티컬 하이백 체어',
    category: 'furniture',
    subCategoryTitle: '퍼니처/체어',
    categoryTag: '매트 블랙 / 항공알루미늄',
    price: 210000,
    originalPrice: 240000,
    weightTag: '1,020g ULTRA-CHAIR',
    badge: '허리 지지 인체공학',
    badgeTone: 'neutral',
    imageUrl: '/demo-media/nordic-peak/nordic-peak-05.jpg',
    imageAlt: '발할라 택티컬 하이백 체어',
    specs: [
      { label: '최대 지지하중:', value: '150 kg 자체 시험 기준 (예시)' },
      { label: '프레임 구조:', value: '듀랄루민 7075 T6' },
      { label: '시트 원단:', value: '1000D 고강도 나일론' },
      { label: '수납 규격:', value: '42cm × 12cm 초소형', highlight: true },
    ],
    season: 'all',
    capacity: '1-2',
    pole: '7001',
    fabric: '40d',
    description:
      '듀랄루민 7075 T6 프레임과 1000D 고강도 나일론 시트로 마감한 캠핑 체어입니다. 자체 시험 기준 150kg 하중까지 상정해 설계했습니다. (예시 설명)',
  },
  {
    id: 'midgard-titanium-1200',
    sku: 'NP-CK-1200-TI',
    title: '미드가르드 티타늄 1,200ml 콤보',
    category: 'cookware',
    subCategoryTitle: '쿡웨어/스토브',
    categoryTag: '순수 티타늄 1호 / 고내열',
    price: 168000,
    originalPrice: 195000,
    weightTag: '230g GRADE-1 TITANIUM',
    badge: '초경량 순수 티타늄',
    badgeTone: 'primary',
    imageUrl: '/demo-media/nordic-peak/nordic-peak-01.jpg',
    imageAlt: '미드가르드 티타늄 1,200ml 콤보',
    specs: [
      { label: '소재 등급:', value: 'Grade 1 순수 티타늄' },
      { label: '용량/규격:', value: '1,200ml + 전용 리드' },
      { label: '전체 중량:', value: '230g (포트+버너)' },
      { label: '수납 특성:', value: '이소가스 230g 네스팅 수납', highlight: true },
    ],
    season: 'all',
    capacity: '1-2',
    pole: 'alloy',
    fabric: '70d',
    description:
      'Grade 1 순수 티타늄으로 만들어 부식에 강하고, 포트와 버너를 합쳐 230g 으로 꾸린 초경량 쿡 세트입니다. (예시 설명)',
  },
];

export const BRAND_LOGO_URL = '/demo-media/nordic-peak/nordic-peak-06.png';

export const HERO_BG_IMAGE = '/demo-media/nordic-peak/nordic-peak-02.jpg';

/** 히어로가 소개하는 대표 상품 — 「즉시 주문」·「비교」가 같은 상품을 가리키게 한 곳에서 고른다 */
export const FLAGSHIP_PRODUCT = PRODUCTS[0];
