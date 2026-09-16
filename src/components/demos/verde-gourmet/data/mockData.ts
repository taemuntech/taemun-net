// 가상 브랜드 샘플의 표시용 데이터.
// 이력번호·인증번호·생산자·도축장 이름은 전부 자리표시다 — 실존 번호·실존 업체 이름을 적으면
// 없는 회사가 그 업체의 물건을 파는 것처럼 읽힌다(실측: 노르웨이 연어 가공사·국내 공판장 이름이 박혀 있었다).
import { Product, RecipeIngredient, TelemetryStep } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-hanwoo-1',
    name: '[베르데 단독] 횡성 1++ No.9 마블링 한우 채끝등심 300g',
    origin: '강원 횡성 산지직송 · 당일소포장',
    tag: '스킨진공포장으로 육즙 보존, 구이/스테이크 겸용',
    badge: '베르데 온리',
    tempBadge: '❄️ 냉장 0~2℃',
    price: 34900,
    originalPrice: 46500,
    discountPercent: 25,
    unitPrice: '100g당 11,630원',
    rating: 4.9,
    reviewCount: 2841,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL-ywWI951CCrrpBYRilyHe7kA5zNSPA_qU0aVlPzCV5UAqyZWMGeiBLS9QGeWgxvTqgm6YOsTRQ-RwT-YpXj95iTBpYkGIUgh_kaIn5Aho6H4dhSCp0tprhcRN6wc2BGYF-NJhzhzmtYDCUEW4Rol5mlD5Cj2QSZXVhAIp6n61q4e9nsudxUINpTJ1Echn7Z8G9lCL5jZ3LRiKTt8BtsHEVPqsDLbOLPgvQyjM1mngAZFRY-ogLck',
    category: 'meat',
    description: '최고 등급인 1++ No.9의 촘촘한 마블링과 깊은 육향. 당일 도축 후 3중 진공 스킨팩으로 밀봉하여 수확 직후의 신선도를 그대로 유지합니다.',
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
    tempBadge: '🌱 유기농 인증',
    price: 8900,
    originalPrice: 11200,
    discountPercent: 20,
    unitPrice: '100g당 890원',
    rating: 4.8,
    reviewCount: 1920,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu53rOiCNj7ee8Io-g6A0RtpDeAjjJsDQQCZNLRxSOn8QjJSQlBf44M3TWApYBuPRQYlwwW9tgvDR3giWVbgYuY5UNlw9NZeuFpGUpEPngdIUK9HOxY617GmkESBWNk-wZkJFG17LmBPpYCc9Rh69A7t3XEmcBRSi6vWYZyuMg9SLAmb-bQNGlF1p2JrVnQnQhX-CugZqW053Pd8gqhoXsbPXknB8wIMnuGn4efhXWviM6p30DRs4q',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoi3zVPPlkio8aWNyP-WmTbWY9xSXD3Skr9mAL0xULxhnQvmOq-gE5l0EfozGQxeU25re3ix6w7NC9Mp8N8_p5dpPBtRp2nOt7kHhuHBL7RmOYR5bXtiqWblhwlxPJFHQQMly0AvKHYeT_dq9-6R8JTp-lSr9eH5OTeickrkHPtAfNwWHXlqLUY8UYRu7HfJrZhrGkOwSPBHygX1y-jAgKmcXWuAvhHYxK5zwdH3BDqc27nbI7HAIo',
    category: 'seafood',
    description: '노르웨이 청정 피오르드에서 어획 즉시 항공편으로 48시간 이내 도착한 슈페리어 등급의 생연어. 탄력 넘치는 식감과 풍부한 오메가-3.',
    traceabilityNumber: 'NOR-0000-0000 (예시)',
    producer: 'N사 피오르드 슈페리어 (예시)',
    storageType: '냉장보관 (0~2℃)',
    packaging: '무빙 빙장 에어실링 포장'
  },
  {
    id: 'prod-sourdough-4',
    name: '르방 천연발효 깜파뉴 사워도우 & AOP 발효버터 500g',
    origin: '성수동 브레드 랩 단독 · 천연발효종',
    tag: '72시간 저온숙성으로 소화가 편한 식사빵',
    badge: '성수 아티장',
    tempBadge: '☀️ 당일 구움',
    price: 12500,
    unitPrice: '100g당 2,500원',
    rating: 4.9,
    reviewCount: 890,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYVQtr9ChF8qKviVSHVVFU61X4pol12as4c9WHskYzxuJpFGCouWBJQeaSW7ReMeIUcJj36FDzz1iGIGUa8BWtyE2mKiIKbMGUYK4j-Yf8XgVrN3y3CrgJ74PsCcGyVzvIjwDDTCQ0yRueWhS5ImSTXTSgl4WwJFShuPqQsfcPV-b9LLA_ehs8B2T1om55Opla8Aijl_NACCfsht6ueoYOQ8Qv80eHqGwE-i8LHLMfYs_j7Ix4J7tl',
    category: 'bakery',
    description: '프랑스 전통 르방 스타터를 사용해 72시간 저온 자연발효한 깜파뉴. 겉은 바삭하고 속은 촉촉하며, 프랑스 AOP 발효버터가 동봉됩니다.',
    traceabilityNumber: 'ARTISAN-0000 (예시)',
    producer: '아티장 브레드 랩 (예시)',
    storageType: '상온 보관 (개봉 후 냉동 보관 권장)',
    packaging: '밀랍 코팅 페이퍼백'
  }
];

export const RECIPE_INGREDIENTS: RecipeIngredient[] = [
  {
    id: 'rec-ing-1',
    name: '횡성 1++ No.9 한우 채끝 300g (냉장)',
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
    location: '영동고속도로 운송구간',
    time: '2026.09.15 20:15',
    status: 'completed',
    description: '차량 내부 GPS 온도 트래커 연동'
  },
  {
    step: 'STEP 03',
    title: '곤지암 물류허브',
    temp: '1.0℃',
    location: '곤지암 메가 콜드센터',
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

export const CATEGORIES = [
  { id: 'all', name: '전체 베스트' },
  { id: 'meat', name: '신선 정육/달걀' },
  { id: 'seafood', name: '산지 수산' },
  { id: 'vegetable', name: '친환경 채소' },
  { id: 'bakery', name: '베이커리/샤퀴테리' }
];

export const QUICK_PILLS = [
  { name: '신선정육 (1++)', icon: 'restaurant', active: true, categoryId: 'meat' },
  { name: '산지수산 직송', icon: 'set_meal', active: false, categoryId: 'seafood' },
  { name: '친환경 유기농 채소', icon: 'eco', active: false, categoryId: 'vegetable' },
  { name: '당도보증 프리미엄 과일', icon: 'nutrition', active: false, categoryId: 'vegetable' },
  { name: '아티장 베이커리 & 델리', icon: 'bakery_dining', active: false, categoryId: 'bakery' },
  { name: '치즈 & 샤퀴테리', icon: 'lunch_dining', active: false, categoryId: 'bakery' },
  { name: '소믈리에 셀렉션 와인', icon: 'wine_bar', active: false, categoryId: 'all' },
  { name: '레스토랑 간편식(RMR)', icon: 'soup_kitchen', active: false, categoryId: 'meat' }
];
