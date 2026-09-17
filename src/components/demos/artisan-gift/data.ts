import { BojagiLookbookItem, Product, Review } from './types';

export const LOGO_URL =
  '/demo-media/artisan-gift/artisan-gift-10.png';

export const MASTER_ARTISAN_HERO_IMAGE =
  '/demo-media/artisan-gift/artisan-gift-02.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'product-1',
    name: '베지터블 레더 비스포크 아코디언 카드지갑',
    category: '가죽공예',
    badge: '무료 불도장 각인',
    badgeColor: 'bg-[#3e1c06] text-white',
    rating: 4.9,
    reviewCount: 840,
    description: '이탈리아 뷰테로 레더와 황동 솔트레지가 어우러진 손바느질 포켓 카드지갑.',
    price: 89000,
    shippingText: '무료 배송',
    image:
      '/demo-media/artisan-gift/artisan-gift-06.jpg',
    packagingOptions: [
      { id: 'pack-1-1', name: '기본 단자 포장 (무료)', price: 0 },
      { id: 'pack-1-2', name: '연꽃 실크 보자기 (+₩5,000)', price: 5000 },
      { id: 'pack-1-3', name: '궁중 옥색 보자기 & 나비 노리개 (+₩10,000)', price: 10000 },
    ],
  },
  {
    id: 'product-2',
    name: '문경 도자기 명장 백자 달항아리 다기 2인 세트',
    category: '도예/세라믹',
    badge: '전통 오동나무 상자',
    badgeColor: 'bg-[#545f73] text-white',
    rating: 4.9,
    reviewCount: 312,
    description: '장작가마에서 3일간 구워낸 단아한 곡선미의 전통 백자 숙우와 잔 세트.',
    price: 145000,
    shippingText: '안심 특송',
    image:
      '/demo-media/artisan-gift/artisan-gift-08.jpg',
    packagingOptions: [
      { id: 'pack-2-1', name: '오동나무 상자 기본 포장 (무료)', price: 0 },
      { id: 'pack-2-2', name: '수국 비단 보자기 매듭 (+₩5,000)', price: 5000 },
      { id: 'pack-2-3', name: '궁중 옥색 보자기 & 나비 노리개 (+₩10,000)', price: 10000 },
    ],
  },
  {
    id: 'product-3',
    name: '황동 솔리드 롤러볼 펜 & 호두나무 펜트레이 세트',
    category: '금속/목공',
    badge: '레이저 정밀 각인',
    badgeColor: 'bg-[#3e1c06] text-white',
    rating: 5.0,
    reviewCount: 520,
    description: '시간의 흐름에 따라 은은하게 에이징되는 통황동 펜과 월넛 트레이.',
    price: 118000,
    shippingText: '무료 각인',
    image:
      '/demo-media/artisan-gift/artisan-gift-03.jpg',
    packagingOptions: [
      { id: 'pack-3-1', name: '한지 지함 포장 (무료)', price: 0 },
      { id: 'pack-3-2', name: '단아한 마 보자기 매듭 (+₩5,000)', price: 5000 },
      { id: 'pack-3-3', name: '궁중 옥색 보자기 & 나비 노리개 (+₩10,000)', price: 10000 },
    ],
  },
  {
    id: 'product-4',
    name: '비단 보자기 매듭 & 천연 소이 캔들 오브제',
    category: '전통 패브릭',
    badge: '명주실 노리개 포함',
    badgeColor: 'bg-[#C84B31] text-white',
    rating: 4.8,
    reviewCount: 194,
    description: '소나무와 백단향의 깊은 향기를 담은 옹기 소이 캔들과 전통 실크 매듭.',
    price: 54000,
    shippingText: '당일 발송',
    image:
      '/demo-media/artisan-gift/artisan-gift-01.jpg',
    packagingOptions: [
      { id: 'pack-4-1', name: '은은한 옥색 비단 (기본 포함)', price: 0 },
      { id: 'pack-4-2', name: '단아한 연분홍 명주 비단 (+₩3,000)', price: 3000 },
      { id: 'pack-4-3', name: '묵직한 쑥빛 모시 보자기 (+₩5,000)', price: 5000 },
    ],
  },
];

export const BOJAGI_LOOKBOOK: BojagiLookbookItem[] = [
  {
    id: 'style-01',
    styleNum: 'STYLE 01',
    title: '수국 매듭 (Hydrangea Knot)',
    koreanName: '수국 매듭',
    englishName: 'Hydrangea Knot',
    description:
      '피어나는 수국 꽃잎의 형상을 본뜬 입체적인 매듭. 감사의 마음과 풍성한 축복을 상징하며 은사님, 부모님 예단 선물로 가장 사랑받습니다.',
    recommendedUse: '명절 & 예단',
    priceTag: '선택 옵션 (+₩5,000)',
    isPremium: false,
    image:
      '/demo-media/artisan-gift/artisan-gift-05.jpg',
  },
  {
    id: 'style-02',
    styleNum: 'STYLE 02',
    title: '연꽃 매듭 (Lotus Knot)',
    koreanName: '연꽃 매듭',
    englishName: 'Lotus Knot',
    description:
      '진흙 속에서도 맑게 피어나는 연꽃의 청초함을 담은 단정한 매듭. 도자기나 목공 다기 세트에 최적화된 고풍스러운 실루엣을 선사합니다.',
    recommendedUse: '다기 & 서화',
    priceTag: '선택 옵션 (+₩5,000)',
    isPremium: false,
    image:
      '/demo-media/artisan-gift/artisan-gift-09.jpg',
  },
  {
    id: 'style-03',
    styleNum: 'STYLE 03',
    title: '나비 노리개 포장',
    koreanName: '나비 노리개 포장',
    englishName: 'Butterfly Norigae Wrap',
    description:
      '화사한 실크 보자기 위에 장수와 부부 화합을 기원하는 전통 명주실 나비 노리개를 엮어 선물 자체의 품격과 보관 가치를 극대화합니다.',
    recommendedUse: '결혼 & 집들이',
    priceTag: '프리미엄 (+₩10,000)',
    isPremium: true,
    image:
      '/demo-media/artisan-gift/artisan-gift-04.jpg',
  },
  {
    id: 'style-04',
    styleNum: 'STYLE 04',
    title: '궁중 옥색 보자기',
    koreanName: '궁중 옥색 보자기',
    englishName: 'Royal Celadon Bojagi',
    description:
      '조선 왕실 의궤의 색채를 복원한 고귀한 옥색(玉色) 명주 원단에 금사 태슬과 황동 비녀 장식을 곁들인 최고급 VIP 헌정 패키지입니다.',
    recommendedUse: '기업 의전 & VIP',
    priceTag: '프리미엄 (+₩10,000)',
    isPremium: true,
    image:
      '/demo-media/artisan-gift/artisan-gift-07.jpg',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorInitial: '정',
    author: '정민우 님 (지갑 선물)',
    productName: '베지터블 레더 비스포크 아코디언 카드지갑',
    options: '24K 골드 각인 / 수국 매듭 포장',
    rating: 5,
    content:
      '아버지 환갑 선물로 베지터블 레더 지갑을 주문했습니다. 가죽의 묵직한 촉감과 불도장으로 선명하게 새겨진 성함 덕분에 아버지가 눈시울을 붉히셨어요. 보자기 매듭을 푸는 순간부터 진정한 예술품을 마주하는 기분이었습니다.',
    date: '2025.02.14',
  },
  {
    id: 'rev-2',
    authorInitial: '김',
    author: '김세은 님 (다기 세트)',
    productName: '문경 도자기 명장 백자 달항아리 다기 2인 세트',
    options: '달항아리 2인 세트 / 오동나무 포장',
    rating: 5,
    content:
      '외국인 교수님 귀국 기념 선물로 준비했는데 품격의 극치였습니다. 오동나무 향기와 정갈한 한지 서신 카드까지 완벽하게 준비되어 있어서 따로 손댈 필요가 전혀 없었어요. 한국의 아름다움을 가장 우아하게 전했습니다.',
    date: '2025.02.10',
  },
  {
    id: 'rev-3',
    authorInitial: '이',
    author: '이지후 님 (황동 펜)',
    productName: '황동 솔리드 롤러볼 펜 & 호두나무 펜트레이 세트',
    options: '레이저 한글 각인 / 옥색 보자기',
    rating: 5,
    content:
      '변호사 합격한 친구에게 선물했습니다. 호두나무 펜트레이에 놓인 황동 펜의 무게감이 정말 훌륭합니다. 실시간 시뮬레이터로 각인 서체를 직접 확인하고 주문할 수 있어서 오차 없이 만족스러운 선물이 되었어요.',
    date: '2025.02.08',
  },
];
