import { Project } from '../types';

export const HERO_IMAGES = {
  main: {
    url: '/demo-media/atelier-vaucluse/atelier-vaucluse-02.jpg',
    alt: 'Sunlit minimal living room interior designed by Atelier Vaucluse with travertine stone low coffee table, textured limewash plaster beige walls, minimalist custom white oak joinery, natural woven linen curtains',
    label: 'Residence Private Sanctuary — Hannam',
    description: '빛과 여백이 공존하는 한남 프라이빗 레지던스 메인 리빙룸',
  },
  detail1: {
    url: '/demo-media/atelier-vaucluse/atelier-vaucluse-04.jpg',
    alt: 'Architectural detail shot of honed warm beige travertine stone counter touching tactile hand-applied lime plaster wall',
    label: 'Material Composition 01',
    description: '베이지 트래버틴과 천연 미장 회벽의 맞춤 조인트 디테일',
  },
  detail2: {
    url: '/demo-media/atelier-vaucluse/atelier-vaucluse-03.jpg',
    alt: 'Minimalist high-end dining area with large monolithic pale oak dining table, sculptural bronze pendant lighting suspended in calm negative space',
    label: 'Spatial Perspective 02',
    description: '단단한 참나무 테이블과 조형적 펜던트 조명이 만드는 다이닝 여백',
  },
};

export const PROJECTS: Project[] = [
  {
    id: 'hannam-terrace-villa',
    index: '01 / 12',
    title: '한남동 테라스 빌라 리노베이션',
    subtitle: '미니멀 오가닉 · 천연 트래버틴 · 제작 화이트오크 가구',
    category: 'renovation',
    location: 'HANNAM-DONG, SEOUL',
    year: '2024',
    area: '72평',
    imageUrl:
      '/demo-media/atelier-vaucluse/atelier-vaucluse-06.jpg',
    imageAlt:
      'Editorial photograph of Hannam Villa Residence interior, master bathroom and bedroom with micro-cement walls, freestanding fluted stone bathtub, warm indirect LED linear lighting',
    description:
      '도심 속 휴양지를 표방하며, 기존의 복잡했던 평면을 개방형 마스터 스위트로 재구성했습니다. 매끄러운 마이크로 시멘트 바닥과 결이 살아있는 트래버틴 욕조, 절제된 간접 조명이 깊은 휴식을 선사합니다.',
    materials: ['이탈리아 나보나 트래버틴', '벨기에 마이크로시멘트', '제작 화이트오크 무늬목', '황동 수전류'],
    keyFeatures: ['오픈 컨셉 마스터 바스룸', '자연 채광을 끌어들인 테라스 연계', '선과 면이 일치하는 무몰딩 마감'],
    clientReview: '공간에 들어서는 순간 일상의 번잡함이 사라지고 고요한 안식을 느낍니다. 세심한 시공 감리에 감사드립니다.',
    galleryImages: [
      '/demo-media/atelier-vaucluse/atelier-vaucluse-06.jpg',
      HERO_IMAGES.main.url,
      HERO_IMAGES.detail1.url,
    ],
  },
  {
    id: 'seongsu-cultural-showroom',
    index: '02 / 12',
    title: '성수동 복합 문화 쇼룸',
    subtitle: '브루탈리즘 & 우드 · 노출 콘크리트 · 맞춤 오브제 디스플레이',
    category: 'commercial',
    location: 'SEONGSU-DONG, SEOUL',
    year: '2024',
    area: '110평',
    imageUrl:
      '/demo-media/atelier-vaucluse/atelier-vaucluse-07.jpg',
    imageAlt:
      'Editorial photograph of Seongsu Flagship Showroom interior with architectural brutalist raw concrete pillars paired with dark smoked timber displays, museum-grade spotlights',
    description:
      '성수동의 인더스트리얼 유산을 존중하면서도, 훈증 오크와 정밀 가공된 메탈 페데스탈을 조합하여 갤러리 수준의 정갈한 디스플레이 환경을 조성했습니다.',
    materials: ['노출 콘크리트 미장 코팅', '다크 스모크 오크', '헤어라인 블랙 스틸', '박물관급 CRI 97 조명'],
    keyFeatures: ['조형적 보이드 동선 계획', '모듈형 전시 집기 설계', '음향 반사를 제어한 패브릭 흡음 천장'],
    clientReview: '작품과 브랜드의 정체성이 공간을 통해 명확하게 전달되어 방문 고객들의 찬사가 이어지고 있습니다.',
    galleryImages: [
      '/demo-media/atelier-vaucluse/atelier-vaucluse-07.jpg',
      HERO_IMAGES.detail2.url,
      HERO_IMAGES.detail1.url,
    ],
  },
  {
    id: 'pyeongchang-private-house',
    index: '03 / 12',
    title: '평창동 단독주택 인테리어',
    subtitle: '내추럴 스톤 & 라이팅 · 프라이빗 중정 연계 · 조형적 보이드',
    category: 'residential',
    location: 'PYEONGCHANG-DONG, SEOUL',
    year: '2023',
    area: '95평',
    imageUrl:
      '/demo-media/atelier-vaucluse/atelier-vaucluse-05.jpg',
    imageAlt:
      'Editorial photograph of Pyeongchang House spacious living lounge with double-height ceiling, large charcoal granite fireplace feature wall, floor-to-ceiling glass framing snowy pine trees',
    description:
      '북악산 자락의 계절 변화를 실내로 끌어들이기 위해 전면 통창과 2개 층 높이의 웅장한 화강석 벽난로를 중심축으로 삼았습니다. 스칸디나비안과 한국적 고요함이 만난 프로젝트입니다.',
    materials: ['천연 챠콜 화강석', '스위스 산 광폭 원목마루', '수제 라임 플라스터', '초슬림 알루미늄 시스템 창호'],
    keyFeatures: ['더블 하이트 오픈 천장', '사계절 중정 뷰 포인트 설계', '통합 스마트 홈 사운드 & 조도 제어'],
    clientReview: '집 전체가 마치 미술관 같으면서도 가족들의 일상이 따뜻하게 감싸지는 최고의 주거 공간이 완성되었습니다.',
    galleryImages: [
      '/demo-media/atelier-vaucluse/atelier-vaucluse-05.jpg',
      HERO_IMAGES.main.url,
      HERO_IMAGES.detail2.url,
    ],
  },
  {
    id: 'hannam-private-sanctuary',
    index: '04 / 12',
    title: '한남 프라이빗 생추어리 펜트하우스',
    subtitle: '파노라믹 한강 뷰 · 텍스처드 라임워시 · 슬랩 트래버틴',
    category: 'residential',
    location: 'HANNAM-DONG, SEOUL',
    year: '2024',
    area: '88평',
    imageUrl: HERO_IMAGES.main.url,
    imageAlt: HERO_IMAGES.main.alt,
    description:
      '자연스러운 석재의 거친 표면과 건조된 참나무의 고요한 온기를 바탕으로 한강 조망과 채광 축을 정밀하게 연계한 하이엔드 주거 프로젝트입니다.',
    materials: ['이탈리아 천연 트래버틴 슬랩', '천연 규조토 및 라임플라스터', '맞춤 리넨 패브릭', '독일 명품 하드웨어'],
    keyFeatures: ['히든 도어 및 1mm 단차 조인트', '마이크로 동선 최적화', '전통 차실과 결합된 서재'],
    clientReview: '자재의 질감 하나하나가 손끝에서 품격을 전달합니다. 기대 이상의 완성도입니다.',
    galleryImages: [HERO_IMAGES.main.url, HERO_IMAGES.detail1.url, HERO_IMAGES.detail2.url],
  },
  {
    id: 'cheongdam-atelier-suite',
    index: '05 / 12',
    title: '청담 디자이너 아틀리에 & 다이닝 라운지',
    subtitle: '조형적 다이닝 · 브론즈 펜던트 · 노르딕 솔리드 오크',
    category: 'commercial',
    location: 'CHEONGDAM-DONG, SEOUL',
    year: '2024',
    area: '65평',
    imageUrl: HERO_IMAGES.detail2.url,
    imageAlt: HERO_IMAGES.detail2.alt,
    description:
      'VIP 클라이언트를 위한 프라이빗 살롱 겸 미식 다이닝 공간으로, 거대한 솔리드 오크 테이블과 절제된 브론즈 오브제가 침묵 속의 대화를 이끌어냅니다.',
    materials: ['유럽산 단단한 솔리드 참나무', '수작업 브론즈 조명', '웜 베이지 텍스처 벽체', '숨겨진 와인 셀러'],
    keyFeatures: ['단일 원목 대형 슬랩 테이블', '음향 분산 설계', '간접 조도 프리셋 씬'],
    clientReview: '초대하는 게스트마다 감탄을 금치 못하는 우아한 공간입니다.',
    galleryImages: [HERO_IMAGES.detail2.url, HERO_IMAGES.detail1.url, HERO_IMAGES.main.url],
  },
  {
    id: 'seongbuk-heritage-renovation',
    index: '06 / 12',
    title: '성북동 헤리티지 레지던스 리노베이션',
    subtitle: '전통 석재와 현대적 비례미의 조화 · 듀얼 코트야드',
    category: 'renovation',
    location: 'SEONGBUK-DONG, SEOUL',
    year: '2023',
    area: '120평',
    imageUrl: HERO_IMAGES.detail1.url,
    imageAlt: HERO_IMAGES.detail1.alt,
    description:
      '30년 된 구옥의 구조미를 살리면서도 단열과 설비를 완전히 갱신하고, 장인의 미장 기법으로 따뜻한 베이지 톤의 시간을 불어넣은 대규모 리노베이션입니다.',
    materials: ['손미장 라임플라스터', '연마 베이지 석재', '고재 참나무 대들보 보존', '저반사 코팅 글라스'],
    keyFeatures: ['전통 가옥 구조 현대적 재해석', '이중 단열 및 에너지 세이빙', '프라이빗 석조 중정'],
    clientReview: '오래된 집이 지닌 시간의 품격을 그대로 간직한 채 가장 안락한 보금자리로 재탄생했습니다.',
    galleryImages: [HERO_IMAGES.detail1.url, HERO_IMAGES.main.url, HERO_IMAGES.detail2.url],
  },
];

export const PHILOSOPHY_PILLARS = [
  {
    num: '01',
    category: 'MATERIALITY',
    titleKr: '본질적인 소재',
    titleEn: 'Authentic Materials',
    description:
      '가공되지 않은 자연 그대로의 원목, 천연 석재, 미장 회벽(Lime Plaster) 등 시간이 흐를수록 고유의 파티나와 질감이 깊어지는 지속 가능한 자연 소재만을 큐레이션합니다.',
    badge: '수입 원목 & 천연 슬랩 라이브러리 보유',
  },
  {
    num: '02',
    category: 'SPATIAL GEOMETRY',
    titleKr: '빛과 공간의 여백',
    titleEn: 'Spatial Harmony & Light',
    description:
      '벽을 세우기보다 시선과 자연광이 머무는 축을 계획합니다. 시시각각 변화하는 조도의 흐름과 자연스러운 동선 유도를 통해 고요한 심리적 안식을 제공합니다.',
    badge: '채광 시뮬레이션 및 마이크로 동선 설계',
  },
  {
    num: '03',
    category: 'PRECISION',
    titleKr: '정밀한 시공 디테일',
    titleEn: 'Bespoke Execution',
    description:
      '아뜰리에 보클루즈 직영 현장 소장의 1:1 전담 감리 시스템을 통해 선과 면의 1mm 오차 없는 완벽한 조인트, 히든 도어, 무몰딩 마감을 실현합니다.',
    badge: '자체 숙련 장인팀 직접 시공 & 2년 품질 보증',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    titleKr: '심층 인터뷰 & 실측',
    titleEn: 'Discovery & Site Analysis',
    desc: '클라이언트의 취향, 수납 라이프스타일, 가족 구성원의 동선을 면밀히 분석하고 3D 레이저 장비로 현장 오차를 사전 점검합니다.',
    duration: '소요 기간: 약 1~2주',
  },
  {
    step: '02',
    titleKr: '3D 시뮬레이션',
    titleEn: 'Spatial Concept & Sampling',
    desc: '실제 조도와 재질 질감을 반영한 초정밀 3D 렌더링 및 스튜디오 쇼룸에서 직접 만져보는 실물 마감재 무드보드를 제안합니다.',
    duration: '소요 기간: 약 2~3주',
  },
  {
    step: '03',
    titleKr: '직영 정밀 시공',
    titleEn: 'Bespoke Construction',
    desc: '하청 없는 전담 현장 소장이 일일 공정 사진 보고 및 안전/품질 감리를 총괄하며 무몰딩, 단차 없는 미장 공정을 정밀 완성합니다.',
    duration: '소요 기간: 프로젝트별 상이',
  },
  {
    step: '04',
    titleKr: '스타일링 & 케어',
    titleEn: 'Styling & 2-Year Warranty',
    desc: '조명 세팅, 아트피스 및 맞춤 패브릭 최종 스타일링을 마치고, 2년간 보증하는 전담 AS 시스템으로 공간의 가치를 유지합니다.',
    duration: '보증 기간: 준공 후 24개월',
  },
];
