// 가상 브랜드 샘플의 표시용 데이터.
// 이력번호·인증번호·생산자·도축장 이름은 전부 자리표시다 — 실존 번호·실존 업체 이름을 적으면
// 없는 회사가 그 업체의 물건을 파는 것처럼 읽힌다(실측: 노르웨이 연어 가공사·국내 공판장 이름이 박혀 있었다).
import { Product, RecipeIngredient, TelemetryStep } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-hanwoo-1',
    name: '횡성 마블링 한우 채끝등심 300g',
    origin: '강원 횡성 산지직송 · 당일소포장',
    tag: '스킨진공포장으로 육즙 보존, 구이/스테이크 겸용',
    badge: '베르데 추천',
    // 「1++ No.9」 는 축산물품질평가원이 매기는 실제 공인 등급이다 — 가상 브랜드가 그 등급을
    // 받은 것처럼 읽히지 않게 아래 당근과 같은 방식으로 「표기 (예시)」 로 낮춘다.
    tempBadge: '❄️ 냉장 0~2℃ · 1++ 등급 표기 (예시)',
    price: 34900,
    originalPrice: 46500,
    discountPercent: 25,
    unitPrice: '100g당 11,630원',
    rating: 4.9,
    reviewCount: 2841,
    image: '/demo-media/verde-gourmet/verde-gourmet-03.jpg',
    category: 'meat',
    description: '촘촘한 마블링과 깊은 육향이 살아 있는 채끝등심. 당일 도축 후 3중 진공 스킨팩으로 밀봉하여 수확 직후의 신선도를 그대로 유지합니다. (등급 표기는 예시입니다)',
    traceabilityNumber: '000000000000 (예시)',
    producer: '○○축산물공판장 엄선 한우 명가 (예시)',
    storageType: '냉장보관 (-2℃~2℃)',
    packaging: '초신선 3중 스킨 진공밀봉'
  },
  {
    id: 'prod-carrot-2',
    name: '제주 송당리 유기농 흙당근 & 햇비트 1kg',
    origin: '제주 구좌읍 산지직송 · 무세척 흙당근',
    tag: '화산회토에서 자라 향과 당도가 뛰어난 햇채소',
    badge: '당일수확',
    // 「유기농 인증」은 실제 제도(친환경농산물 인증)의 이름이다 — 가상 브랜드가 인증을 받은 것처럼
    // 읽히지 않게 「표기 (예시)」로 낮춘다.
    tempBadge: '🌱 유기농 표기 (예시)',
    price: 8900,
    originalPrice: 11200,
    discountPercent: 20,
    unitPrice: '100g당 890원',
    rating: 4.8,
    reviewCount: 1920,
    image: '/demo-media/verde-gourmet/verde-gourmet-06.jpg',
    category: 'vegetable',
    description: '제주 동쪽 송당리의 미네랄 풍부한 화산회토에서 자란 유기농 흙당근. 세척하지 않아 신선도가 2주 이상 지속되며 달콤한 즙이 가득합니다.',
    traceabilityNumber: 'ECO-0000-0000 (예시)',
    producer: '제주 친환경 농업공동체 (예시)',
    storageType: '냉장보관 (신문지에 싸서 채소칸 보관)',
    packaging: '친환경 통기성 크라프트백'
  },
  {
    id: 'prod-salmon-3',
    name: '노르웨이 항공직송 슈페리어 생연어 필렛 400g',
    origin: '오슬로 직항 입고 · 회/스테이크용',
    tag: '어획 후 48시간 내 도착, 단 한 번도 얼리지 않은 냉장',
    badge: '항공 직송',
    tempBadge: '❄️ 0~1℃ 빙장',
    price: 19800,
    originalPrice: 23500,
    discountPercent: 15,
    unitPrice: '100g당 4,950원',
    rating: 4.9,
    reviewCount: 3410,
    image: '/demo-media/verde-gourmet/verde-gourmet-04.jpg',
    category: 'seafood',
    description: '노르웨이 청정 피오르드에서 어획 즉시 항공편으로 48시간 이내 도착한 슈페리어 등급의 생연어. 탄력 넘치는 식감과 풍부한 오메가-3.',
    traceabilityNumber: 'NOR-0000-0000 (예시)',
    producer: 'N사 피오르드 슈페리어 (예시)',
    storageType: '냉장보관 (0~2℃)',
    packaging: '무빙 빙장 에어실링 포장'
  },
  {
    id: 'prod-sourdough-4',
    // AOP 는 EU 가 실제로 부여하는 원산지 보호 표시다 — 가상 브랜드가 그 등급의 버터를 파는 것처럼
    // 읽히지 않게 「프랑스식」으로 바꾼다.
    name: '르방 천연발효 깜파뉴 사워도우 & 프랑스식 발효버터 500g',
    origin: '성수동 브레드 랩 단독 · 천연발효종',
    tag: '72시간 저온숙성으로 소화가 편한 식사빵',
    badge: '성수 아티장',
    tempBadge: '☀️ 당일 구움',
    price: 12500,
    unitPrice: '100g당 2,500원',
    rating: 4.9,
    reviewCount: 890,
    image: '/demo-media/verde-gourmet/verde-gourmet-07.jpg',
    category: 'bakery',
    description: '프랑스 전통 르방 스타터를 사용해 72시간 저온 자연발효한 깜파뉴. 겉은 바삭하고 속은 촉촉하며, 프랑스식 발효버터가 동봉됩니다.',
    traceabilityNumber: 'ARTISAN-0000 (예시)',
    producer: '아티장 브레드 랩 (예시)',
    storageType: '상온 보관 (개봉 후 냉동 보관 권장)',
    packaging: '밀랍 코팅 페이퍼백'
  }
];

export const RECIPE_INGREDIENTS: RecipeIngredient[] = [
  {
    id: 'rec-ing-1',
    name: '횡성 마블링 한우 채끝 300g (냉장)',
    subtext: '도축 3일차 최적 숙성육',
    price: 34900,
    checked: true
  },
  {
    id: 'rec-ing-2',
    name: '스페인산 엑스트라버진 피쿠알 올리브오일 250ml',
    subtext: '산도 0.1% 이하 냉압착',
    price: 14800,
    checked: true
  },
  {
    id: 'rec-ing-3',
    name: '이탈리아 경성 숙성치즈 24개월 100g',
    subtext: '깊은 감칠맛의 장기 숙성 치즈 (예시)',
    price: 7200,
    checked: true
  },
  {
    id: 'rec-ing-4',
    name: '친환경 유기농 생바질 30g',
    subtext: '당일 아침 스마트팜 수확',
    price: 2500,
    checked: true
  }
];

export const TELEMETRY_STEPS: TelemetryStep[] = [
  {
    step: 'STEP 01',
    title: '산지 출하시설',
    temp: '0.8℃',
    location: '강원 횡성 가공센터',
    time: '2026.09.15 16:40',
    status: 'completed',
    description: '진공 스킨팩 직후 저온 챔버 입고'
  },
  {
    step: 'STEP 02',
    title: '냉장 탑차 이동',
    temp: '1.2℃',
    location: '수도권 방향 고속도로 운송구간 (예시)',
    time: '2026.09.15 20:15',
    status: 'completed',
    description: '차량 내부 GPS 온도 트래커 연동'
  },
  {
    step: 'STEP 03',
    // 「곤지암 메가 콜드센터」는 실존 물류사의 특정 시설을 가리키는 이름으로 읽힌다 — 지역명으로 낮춘다.
    title: '수도권 물류허브',
    temp: '1.0℃',
    location: '○○ 저온 물류센터 (예시)',
    time: '2026.09.16 01:20',
    status: 'completed',
    description: '풀콜드 실내 피킹 & 포장 구역'
  },
  {
    step: 'STEP 04',
    title: '고객 문 앞 도착',
    temp: '0.5℃ 유지',
    location: '서울 용산구 한남동',
    time: '2026.09.16 06:45',
    status: 'ready',
    description: '새벽 07:00 전 보냉백 인도 완료'
  }
];

export const CATEGORIES: ReadonlyArray<{ id: Product['category']; name: string }> = [
  { id: 'all', name: '전체 베스트' },
  { id: 'meat', name: '신선 정육/달걀' },
  { id: 'seafood', name: '산지 수산' },
  { id: 'vegetable', name: '친환경 채소' },
  { id: 'bakery', name: '베이커리/샤퀴테리' }
];

/**
 * 상단 빠른 선택 칩 — **누르면 실제로 상품 검색어가 걸린다**(카테고리와 별개).
 *
 * 왜 이렇게 두나: 예전에는 「소믈리에 셀렉션 와인」·「레스토랑 간편식(RMR)」·「당도보증 프리미엄 과일」처럼
 * 이 샘플에 **상품이 하나도 없는** 칩이 있었고, 눌러도 엉뚱한 분류가 열려 파는 물건과 칩이 따로 놀았다.
 * 지금은 `query` 가 전부 PRODUCTS 의 글자와 실제로 맞물린다 — 칩을 늘릴 때도 **결과가 0건이 아닌지**
 * 먼저 확인할 것(0건 칩은 「준비 중」과 같은 말이 된다).
 */
export const QUICK_PILLS: ReadonlyArray<{ name: string; icon: string; query: string }> = [
  { name: '신선정육 마블링 한우', icon: 'restaurant', query: '한우' },
  { name: '산지수산 생연어 직송', icon: 'set_meal', query: '생연어' },
  { name: '친환경 유기농 채소', icon: 'eco', query: '유기농' },
  { name: '제주 무세척 흙당근', icon: 'nutrition', query: '흙당근' },
  { name: '아티장 천연발효 사워도우', icon: 'bakery_dining', query: '사워도우' },
  { name: '프랑스식 발효버터 동봉', icon: 'lunch_dining', query: '발효버터' },
  { name: '구이 · 스테이크용', icon: 'outdoor_grill', query: '스테이크' },
  { name: '진공 스킨팩 포장', icon: 'inventory_2', query: '진공' }
];

/** 검색·칩이 같이 쓰는 한 곳짜리 판정 — 카드/칩마다 다른 규칙을 쓰면 칩이 조용히 0건을 낸다. */
export function matchesQuery(product: Product, rawQuery: string): boolean {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;
  const categoryName = CATEGORIES.find((c) => c.id === product.category)?.name ?? '';
  const haystack = [
    product.name,
    product.origin,
    product.tag,
    product.badge ?? '',
    product.tempBadge,
    product.description,
    product.unitPrice,
    categoryName
  ]
    .join(' ')
    .toLowerCase();
  return query.split(/\s+/).every((token) => haystack.includes(token));
}
