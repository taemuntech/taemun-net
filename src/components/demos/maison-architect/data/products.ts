import { Product, FloorplanPreset } from '../types';

export const BRAND_LOGO_URL = '/demo-media/maison-architect/maison-architect-10.png';

export const ROOM_HERO_IMAGE = '/demo-media/maison-architect/maison-architect-04.jpg';

export const SHOWROOM_IMAGE = '/demo-media/maison-architect/maison-architect-09.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'sofa',
    name: '아틀리에 라운드 부클레 4인 모듈 소파',
    subtitle: '아틀리에 부클레 4인 소파',
    category: 'sofa',
    categoryLabel: '모듈 소파',
    materialTags: ['boucle', 'oak'],
    price: 2850000,
    formattedPrice: '₩2,850,000',
    badges: [
      { text: '수도권 무료설치', type: 'dark' },
      { text: '베스트셀러', type: 'terracotta' }
    ],
    dimensions: 'W2900 x D1050 x H720',
    highlight: '발수 이지클린',
    deliveryBadge: '희망일 지정배송',
    colors: [
      { name: '바닐라 크림', hex: '#EADCC9' },
      { name: '오트밀 그레이', hex: '#8C847E' },
      { name: '차콜 앤트러사이트', hex: '#262322' }
    ],
    image: '/demo-media/maison-architect/maison-architect-07.jpg',
    detailImage: '/demo-media/maison-architect/maison-architect-03.jpg',
    description: '유려한 반원형 라운드 실루엣과 오염에 강한 벨기에산 이지클린 부클레 텍스타일. 38kg/m³ 고탄성 HR폼과 E0 친환경 자작나무 골조로 오랜 시간 변함없는 안락함을 선사합니다.'
  },
  {
    id: 'dining-table',
    name: '노르딕 솔리드 오크 6인 다이닝 테이블',
    subtitle: '노르딕 솔리드 오크 테이블',
    category: 'dining',
    categoryLabel: '다이닝 테이블',
    materialTags: ['oak'],
    price: 1480000,
    formattedPrice: '₩1,480,000',
    badges: [
      { text: 'FSC 인증 원목', type: 'dark' },
      { text: '친환경 오일 피니시', type: 'neutral' }
    ],
    dimensions: 'W2000 x D900 x H740',
    highlight: '북미산 FAS 오크',
    deliveryBadge: '2인 무료설치',
    colors: [
      { name: '화이트 오크', hex: '#D4C3A3' },
      { name: '스모크드 월넛', hex: '#654321' }
    ],
    image: '/demo-media/maison-architect/maison-architect-08.jpg',
    description: '32mm 두께 북미산 화이트 오크 솔리드 상판과 부드러운 R20 라운드 엣지 가공. 자연스러운 나뭇결과 덴마크산 친환경 오일 피니시로 마감된 마스터피스.'
  },
  {
    id: 'table',
    name: '트래버틴 로우 오가닉 커피 테이블',
    subtitle: '트래버틴 로우 오가닉 테이블',
    category: 'sofa',
    categoryLabel: '모듈 소파',
    materialTags: ['travertine'],
    price: 980000,
    formattedPrice: '₩980,000',
    badges: [
      { text: '이탈리아 천연석', type: 'dark' },
      { text: '수작업 혼드 마감', type: 'neutral' }
    ],
    dimensions: 'W1200 x D800 x H320',
    highlight: '석재 전용 안전포장',
    deliveryBadge: '전문 기사 배송',
    colors: [
      { name: '로마노 트래버틴', hex: '#E2DACB' },
      { name: '노체 트래버틴', hex: '#CFC3B0' }
    ],
    image: '/demo-media/maison-architect/maison-architect-06.jpg',
    detailImage: '/demo-media/maison-architect/maison-architect-01.jpg',
    description: '이탈리아 티볼리 채석장에서 채취한 천연 트래버틴의 고유한 기공과 질감을 간직한 비정형 로우 테이블. 숙련된 석재 장인의 혼드 마감으로 오가닉한 온기를 담았습니다.'
  },
  {
    id: 'lamp',
    name: '바우하우스 황동 아크 플로어 스탠드',
    subtitle: '황동 오가닉 페탈 펜던트 램프',
    category: 'lighting',
    categoryLabel: '조명 컬렉션',
    materialTags: ['brass'],
    price: 620000,
    formattedPrice: '₩620,000',
    badges: [
      { text: '3단계 조광 디머', type: 'dark' },
      { text: '3000K 웜라이트', type: 'terracotta' }
    ],
    dimensions: 'H1850 x 반경 1200',
    highlight: '솔리드 황동 헤드',
    deliveryBadge: '당일 발송 가능',
    colors: [
      { name: '새틴 솔리드 브라스', hex: '#C5A059' },
      { name: '앤틱 매트 블랙', hex: '#1F1B17' }
    ],
    image: '/demo-media/maison-architect/maison-architect-05.jpg',
    detailImage: '/demo-media/maison-architect/maison-architect-02.jpg',
    description: '스핀 폴리싱된 원목 베이스와 유려한 황동 아치 프레임의 간접 무드 램프. 3000K의 부드러운 온백색 빛으로 거실 구석구석을 감싸 안습니다.'
  }
];

export const FLOORPLAN_PRESETS: Record<number, FloorplanPreset> = {
  25: {
    pyeong: 25,
    badge: '25PY APARTMENT COMPACT LIVING',
    title: '25평형 (84㎡) 공간 최적화 배치',
    roomSize: '3,800 x 3,600 mm',
    note: '25평형의 경우 4인 모듈 중 카우치 방향을 창가 쪽으로 배치하면 시각적 차단 없이 거실이 1.5배 넓어 보이는 효과를 줍니다.',
    sofaWidthText: '아틀리에 3~4인 컴팩트 (2,500mm)',
    sofaBlockWidth: '75%',
    walkwayClearance: '후면 여유 동선: 650mm 확보',
    statRatio: '76%',
    statWalkway: '650mm',
    statInstallation: '2인 1조'
  },
  34: {
    pyeong: 34,
    badge: '34PY APARTMENT STANDARD LIVING',
    title: '34평형 확장형 거실 배치 가이드',
    roomSize: '4,500 x 4,200 mm',
    note: '34평형 확장형 거실은 2900mm 모듈 소파 배치 시 양측으로 각각 800mm 이상의 자유로운 생활 동선이 완벽하게 확보됩니다.',
    sofaWidthText: '아틀리에 4인 소파 (2,900mm)',
    sofaBlockWidth: '62%',
    walkwayClearance: '후면 여유 동선: 950mm 확보',
    statRatio: '64%',
    statWalkway: '800mm+',
    statInstallation: '2인 1조'
  },
  45: {
    pyeong: 45,
    badge: '45PY+ PENTHOUSE / VILLA SUITE',
    title: '45평형 이상 대형 평형 라운지형 배치',
    roomSize: '5,800 x 5,200 mm',
    note: '45평형 이상의 넓은 거실에서는 벽면에 붙이지 않고 중앙에 아일랜드형으로 배치하여 갤러리 같은 호텔식 라운지 분위기를 연출할 수 있습니다.',
    sofaWidthText: '아틀리에 풀모듈 세트 (3,400mm)',
    sofaBlockWidth: '50%',
    walkwayClearance: '후면 여유 동선: 1,400mm 확보',
    statRatio: '50%',
    statWalkway: '1,400mm',
    statInstallation: '2인 1조'
  }
};

export const BUNDLE_DISCOUNT = 534000;
export const BUNDLE_ORIGINAL_PRICE = 4450000;
export const BUNDLE_SALE_PRICE = 3916000;
