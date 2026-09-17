import { ProjectItem, MaterialSpecimen } from '../types';

export const BRAND_LOGO_URL =
  '/demo-media/haus-space/haus-space-12.png';

export const HERO_IMAGE_URL =
  '/demo-media/haus-space/haus-space-13.jpg';

export const BEFORE_AFTER_DATA = {
  afterImage:
    '/demo-media/haus-space/haus-space-02.png',
  beforeImage:
    '/demo-media/haus-space/haus-space-04.jpg',
  title: '도심 하이엔드 펜트하우스(예시) 주거 공간 아카이브',
  badge: '주거공간 • 2025 완공',
  client: '하이엔드 프라이빗 인테리어 랩',
  duration: '제작 및 시공 기간: 8개월 (디지털 아카이브 구축: 2주)',
  deliverables: [
    {
      title: 'Before & After 시공 전후 비교 슬라이더',
      desc: '설계 인허가 단계 3D 렌더링 대비 오차범위 0.1% 미만의 완벽한 현장 구현',
    },
    {
      title: '수입 주방가구 및 조명 스펙 핀 마킹',
      desc: 'Boffi 주방, Flos & Viabizzuno 정밀 연색성 98Ra 조명 설계 적용',
    },
    {
      title: '공간별 파노라마 360 가상 투어 연동',
      desc: '마스터 베드룸, 드레스룸, 테라스 조경 360 파노라마 실감형 뷰어 제공',
    },
  ],
  pins: [
    {
      id: '01',
      xPercent: 25,
      yPercent: 78,
      category: 'Custom Millwork',
      name: 'North American Walnut Shelving',
      detail: '북미산 천연 월넛 오더메이드 빌트인 서가 및 마그네틱 레일 조명 매립',
    },
    {
      id: '02',
      xPercent: 68,
      yPercent: 35,
      category: 'Stonework Spec',
      name: 'Italian Navona Travertine',
      detail: '이탈리아 직수입 나보나 트래버틴 대리석 벽난로 아트월 및 챔퍼 엣지 가공',
    },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'hannam-penthouse',
    title: '도심 하이엔드 펜트하우스(예시) 105평',
    category: 'Luxury Residential',
    koreanCategory: '주거 • 105평',
    area: '105평 (347㎡)',
    completionYear: '2025 완공',
    location: 'Hannam-dong, Seoul',
    subtitle: 'Private Penthouse',
    description:
      '트래버틴 대리석과 월넛 원목을 맞춤 시공하여 시간이 흐를수록 깊이를 더하는 주거 공간. 개방형 중정과 연계된 이중 층고 구조.',
    materialsUsed: 'Travertine, Walnut, Rimadesio Sliding',
    image:
      '/demo-media/haus-space/haus-space-10.jpg',
    features: [
      '6m 보이드 천장과 연계된 360도 남향 채광 유입',
      '이탈리아 리마데시오(Rimadesio) 슬라이딩 도어 전면 시공',
      '지하 와인 셀러 및 전용 사우나 큐레이션',
    ],
    specs: [
      { label: '위치', value: '서울시 용산구 한남동' },
      { label: '규모', value: '지상 복층형 펜트하우스 347㎡' },
      { label: '주요 자재', value: '이탈리아 나보나 트래버틴, 훈증 월넛, 라미나 세라믹' },
      { label: '공사 기간', value: '약 8개월 (2024.06 ~ 2025.02)' },
    ],
  },
  {
    id: 'cheongdam-wellness',
    title: '청담동 프라이빗 에스테틱 & 웰니스 라운지',
    category: 'Commercial Lounge',
    koreanCategory: '상업 • 85평',
    area: '85평 (280㎡)',
    completionYear: '2024 완공',
    location: 'Cheongdam-dong, Seoul',
    subtitle: 'Wellness Lounge',
    description:
      '곡면 미학과 유럽산 미장 마감재를 활용하여 도심 속 온전한 몰입과 치유를 선사하는 VIP 전용 메디컬 스파 공간.',
    materialsUsed: 'Microcement, Fluted Glass, Acoustic Plaster',
    image:
      '/demo-media/haus-space/haus-space-05.jpg',
    features: [
      '유기적 곡면 파티션으로 동선의 프라이버시 극대화',
      '음향 흡음 미장재를 통한 잔향 시간 0.4초 제어',
      '색온도 2200K~3000K 바이오리듬 연동 조명 시스템',
    ],
    specs: [
      { label: '위치', value: '서울시 강남구 청담동 명품거리' },
      { label: '규모', value: '상업시설 2개 층 280㎡' },
      { label: '주요 자재', value: '스페인 마이크로시멘트, 플루티드 글라스, 라임플라스터' },
      { label: '공사 기간', value: '약 4개월' },
    ],
  },
  {
    id: 'seongsu-tech-hq',
    title: '성수동 크리에이티브 테크 오피스 사옥',
    category: 'Workspace',
    koreanCategory: '오피스 사옥 • 210평',
    area: '210평 (694㎡)',
    completionYear: '2024 완공',
    location: 'Seongsu-dong, Seoul',
    subtitle: 'Creative HQ',
    description:
      '성수의 붉은 벽돌 질감과 현대적 미니멀리즘의 조화. 유연한 협업 공간과 프라이빗 포커스 룸을 유기적으로 배치.',
    materialsUsed: 'Architectural Concrete, White Oak, Steel Glazing',
    image:
      '/demo-media/haus-space/haus-space-11.jpg',
    features: [
      '오픈형 워크스테이션과 8개의 독립 방음 미팅 부스',
      '인더스트리얼 노출 콘크리트와 따뜻한 화이트 오크의 대조',
      '중앙 타운홀 계단식 라운지 및 커스텀 바리스타 바',
    ],
    specs: [
      { label: '위치', value: '서울시 성동구 성수동2가' },
      { label: '규모', value: '지상 3개 층 사옥 694㎡' },
      { label: '주요 자재', value: '노출 콘크리트 코팅, 북미산 화이트 오크, 스틸 글레이징' },
      { label: '공사 기간', value: '약 6개월' },
    ],
  },
  {
    id: 'pyeongchang-residence',
    title: '평창동 단독주택 리노베이션',
    category: 'Luxury Residential',
    koreanCategory: '단독주택 • 160평',
    area: '160평 (528㎡)',
    completionYear: '2023 완공',
    location: 'Pyeongchang-dong, Seoul',
    subtitle: 'Single Residence',
    description:
      '북악산의 사계절을 품은 마당 정원 파노라마 뷰와 현대식 중정을 설계하여 자연과 건축이 호흡하는 독립 주거.',
    materialsUsed: 'Reynaers Aluminium, Smoked Oak, Granite Patio',
    image:
      '/demo-media/haus-space/haus-space-09.jpg',
    features: [
      '북악산 풍경을 프레임하는 벨기에 레이너스 3중 시스템 창호',
      '자연 화강석 파티오와 연결된 일본식 이끼 중정 정원',
      '마스터 스위트룸 전용 히노끼 탕 및 독립 테라스',
    ],
    specs: [
      { label: '위치', value: '서울시 종로구 평창동' },
      { label: '규모', value: '지하 1층 ~ 지상 2층 단독주택 528㎡' },
      { label: '주요 자재', value: '스모크드 오크 광폭 원목, 레이너스 시스템창호, 마천석 화강석' },
      { label: '공사 기간', value: '약 9개월' },
    ],
  },
];

export const MATERIALS: MaterialSpecimen[] = [
  {
    id: 'smoked-oak',
    tag: 'Natural Timber',
    title: '유러피안 스모크드 오크 원목 마루',
    description:
      '독일 친환경 천연 오일로 마감된 240mm 초광폭 원목. 습도 변화에 강하며 발끝에 닿는 온화한 질감을 선사합니다.',
    origin: 'Bavaria, Germany',
    image:
      '/demo-media/haus-space/haus-space-03.jpg',
    specsDetails: {
      grade: 'Select & Better Grade',
      finish: 'Natural Matte Hardwax Oil',
      thickness: '20mm (상판 단판 6mm 오크)',
      application: '펜트하우스 거실, 마스터 침실',
    },
  },
  {
    id: 'navona-travertine',
    tag: 'Quarried Stone',
    title: '이탈리아 나보나 트래버틴 대리석',
    description:
      '로마 고전 건축의 품격을 담은 혼드 마감. 특유의 기공과 자연스러운 층상 구조가 실내에 안락한 조형미를 부여합니다.',
    origin: 'Tivoli, Italy',
    image:
      '/demo-media/haus-space/haus-space-08.jpg',
    specsDetails: {
      grade: 'Extra Prima Navona Vein Cut',
      finish: 'Honed & Filled (수작업 기공 메움)',
      thickness: '20mm / 30mm 북매칭 슬랩',
      application: '벽난로 아트월, 메인 아일랜드 상판, 욕실 바닥',
    },
  },
  {
    id: 'slim-glazing',
    tag: 'Architectural Glazing',
    title: '미니멀 알루미늄 슬림 시스템 창호',
    description:
      '프레임 두께 25mm의 극한 슬림 라인. 외부 풍경을 완벽한 한 폭의 회화처럼 내부로 끌어들이는 최고급 시스템 창호.',
    origin: 'Belgium / Switzerland',
    image:
      '/demo-media/haus-space/haus-space-07.jpg',
    specsDetails: {
      grade: 'Hi-Finity Triple Low-E Glass',
      finish: 'Deep Bronze Anodized Hard Anodizing',
      thickness: '52mm 단열 3중 복층유리 (Ug: 0.6W/m²K)',
      application: '테라스 전면창, 거실 파노라마 창',
    },
  },
  {
    id: 'optical-lighting',
    tag: 'Architectural Lighting',
    title: '하이엔드 조명 라이브러리 & 광학 렌즈',
    description:
      '눈부심이 없는 다크 라이트 기술과 연색성 Ra 98 이상의 고감도 LED. 밤의 공간을 갤러리처럼 연출하는 프리미엄 조명.',
    origin: 'Specs: Viabizzuno & Occhio',
    image:
      '/demo-media/haus-space/haus-space-06.jpg',
    specsDetails: {
      grade: 'Museum Optical Grade CRI 98+',
      finish: 'Burnished Brass & Knurled Metal',
      thickness: 'Optical Zoom Lens (15°~60° 수동 조절)',
      application: '작품 스포트라이트, 식탁 펜던트, 무드 간접등',
    },
  },
];

export const PROCESS_PHASES = [
  {
    number: '01',
    phase: 'Phase 01 • Discovery',
    title: '공간 철학 심층 인터뷰 및 라이프스타일 분석 (Consultation & Lifestyle Profiling)',
    description:
      '고객의 기상 시간부터 수면 패턴, 컬렉션하는 미술품, 요리와 휴식의 리듬까지 세밀하게 기록합니다. 단순한 평면 구성이 아닌 거주자의 삶에 맞춘 공간 동선과 조도 프로그램을 기획합니다.',
    tags: ['라이프스타일 문진표', '대지 및 일조 분석', '스페이스 아이덴티티 수립'],
  },
  {
    number: '02',
    phase: 'Phase 02 • Visualization',
    title: '8K 포토리얼리스틱 3D 비주얼라이제이션 & 공간 기획 (Design & 3D Rendering)',
    description:
      '가상 시공에 가까운 8K 고해상도 3D 모델링을 통해 가구 배치, 천연 석재의 마블 패턴 매칭, 시간대별 인공 조명 시뮬레이션을 착공 전 완벽하게 사전 검증합니다.',
    tags: ['8K 광학 렌더링', '석재 북매칭 시뮬레이션', '360 VR 공간 시연'],
  },
  {
    number: '03',
    phase: 'Phase 03 • Execution',
    title: '오더메이드 가구 제작 및 직영 마스터 빌더 정밀 시공 (Bespoke Construction)',
    description:
      '현장 오차 제로를 추구하는 밀리미터 단위 정밀 시공. 목공 직영 아틀리에에서 제작되는 빌트인 시스템 가구와 이탈리아 직수입 자재를 숙련된 마스터 빌더들이 직접 체결합니다.',
    tags: ['자체 제작 아틀리에', '매일 일일 공정 보고서', '0.1mm 레이저 정밀 레벨링'],
  },
  {
    number: '04',
    phase: 'Phase 04 • Legacy',
    title: '홈스타일링, 아트 피스 큐레이션 및 3년 사후 보증 (Styling & Provenance Warranty)',
    description:
      '준공 후 전문 큐레이터가 공간의 스케일에 맞는 빈티지 마스터피스 조명과 아트워크를 스타일링합니다. 3년 무상 사후 품질 점검 표기 자리(예시)입니다.',
    tags: ['오리지널 빈티지 큐레이션', '3년 무상 품질 점검(예시)', '정기 공간 컨디션 진단'],
  },
];

export const PRESS_ACCOLADES = [
  {
    press: '글로벌 인테리어 매거진 (예시)',
    description: '2024년 주목할 대한민국 공간 디자인 랩 선정',
  },
  {
    press: '해외 건축 매거진 (예시)',
    description: '서울 도심 펜트하우스(예시) 트래버틴 미학 심층 커버',
  },
  {
    press: '공간 디자인 어워드 (예시)',
    description: '공간 건축 부문 골든 프라이즈 수상',
  },
  {
    press: 'LUXURY RESIDENCE',
    description: '마스터 빌더 직영 시공 신뢰도 평가 표기 (예시)',
  },
];
